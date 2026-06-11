# Read Me First !!

Hi there, this is [@ety001](https://steemit.com/@ety001)'s steem data server. This server will supply latest data files of witness node and fullnode.

**If you want to get latest backup information, please follow here: [https://t.me/steem_fans](https://t.me/steem_fans) .**

## How to download data

* **HTTP/HTTPS**: You could visit [https://files.steem.fans](https://files.steem.fans) to get file name and `wget -c https://files.steem.fans/hetzner/<filename>`(Replace `<filename>` by backup data file name).
* **Rsync**: `rsync -avzhP 'ssh -p23' u319306-sub1@u319306-sub1.your-storagebox.de:/home/<filename> /<your_local_path>`. Replace `<filename>` by backup data file name and replace `<your_local_path>` by your local path. The password is `gQlkbh3DryaWMQWt`.
* **FTP**: Host: `u319306-sub1.your-storagebox.de`, Username: `u319306-sub1`, Password: `gQlkbh3DryaWMQWt`.
* **WebDAV**: Host: `https://u319306-sub1.your-storagebox.de`, Username: `u319306-sub1`, Password: `gQlkbh3DryaWMQWt`.
* **SMB / CIFS**: `mount -t cifs //u319306-sub1.your-storagebox.de/u319306-sub1 /<your_local_path> -o username=u319306-sub1,password=gQlkbh3DryaWMQWt`. Replace `<your_local_path>` by your local path.

## Plugin and other config References

> **NOTICE**: Please comment `shared-file-dir = /shm/` first.

### 1. witness node
```
docker image:
ety001/steem-mira:0.23.1

file:
steem_witness.tar.lz4

plugin settings in config.ini:
plugin = witness
```
> Build a witness node: [How to deploy a Steem Witness node by Docker?](https://steemit.com/witness/@ety001/how-to-deploy-a-steem-witness-node-by-docker)

### 2. fullnode
```
docker image:
ety001/steem-full-mira:0.23.1

file:
steem_api.tar.lz4

plugin settings in config.ini:
shared-file-full-threshold = 9900
plugin = webserver p2p json_rpc account_by_key reputation market_history
plugin = database_api account_by_key_api network_broadcast_api reputation_api market_history_api condenser_api block_api rc_api
```

### 3.ahnode

> Build an ahnode node: [How to deploy an Ahnode with official docker image?](https://steemit.com/witness/@ety001/how-to-deploy-an-ahnode-with-official-docker-image)

### 4.hivemind

**Backup format changed since 2025-06.** The new backup file is a PostgreSQL custom-format dump (`*.dump`) created with `pg_dump -Fc -Z6`. If you are using the old `.sql.tar.lz4` backup, see the legacy instructions below.

#### New format (*.dump) — pg_restore

```
file: hivemind_YYYYMMDD.dump (PostgreSQL custom format, ~112GB compressed)
```

1) Make a folder named hivemind
2) cd hivemind
3) Download the dump file and place it in this folder
4) Create a `docker-compose.yml` file with below content:

```yaml
version: '3'
services:
  db:
    image: postgres:15
    container_name: hivemind_db
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
      PGDATA: /var/lib/postgresql/data/pgdata
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
      - ./hivemind_YYYYMMDD.dump:/tmp/hivemind.dump
    restart: always
  redis:
    image: redis
    container_name: hivemind_redis
    volumes:
      - ./redis_data:/data
    restart: always
  hive:
    depends_on:
      - db
      - redis
    image: steemit/hivemind:latest
    container_name: hivemind_hive
    environment:
      DATABASE_URL: postgresql://steem:steem123@db:5432/hivedb
      LOG_LEVEL: INFO
      STEEMD_URL: https://api.steemit.com  # Replace with your fullnode URL
      REDIS_URL: redis://redis:6379
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    links:
      - db:db
      - redis:redis
    restart: always
```

5) Create the PostgreSQL config file `my-postgres.conf` with below content (adjust to fit your system):

```
listen_addresses = '*'
effective_cache_size = 12GB
maintenance_work_mem = 2GB
random_page_cost = 1.0
shared_buffers = 4GB
work_mem = 512MB
synchronous_commit = off
checkpoint_completion_target = 0.9
checkpoint_timeout = 30min
max_wal_size = 4GB
```

6) Start PostgreSQL: `docker compose up db -d`

7) Restore the database:
```
cat hivemind_YYYYMMDD.dump | docker exec -i hivemind_db pg_restore -U steem -d hivedb --no-owner --no-privileges --no-comments --if-exists --clean
```
Or if the dump file is mounted inside the container (as shown in docker-compose.yml above):
```
docker exec hivemind_db pg_restore -U steem -d hivedb --no-owner --no-privileges --no-comments --if-exists --clean /tmp/hivemind.dump
```

8) Start Hivemind: `docker compose up hive -d`

#### Legacy format (*.sql.tar.lz4) — psql

If you are restoring from the old `.sql.tar.lz4` backup:

1) Decompress: `tar --use-compress-program=lz4 -xvf hivemind.sql.tar.lz4 -C /tmp`
2) Start PostgreSQL: `docker compose up db -d`
3) Import: `docker exec -it hivemind_db psql -f /tmp/hivemind.sql -d hivedb -U steem`
4) Start Hivemind: `docker compose up hive -d`

## Other

If you have any issue, please email me. My email is [work#akawa.ink] (replace # to @).

You can also join our Discord Server => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: I'm also a witness. It's pleasure to get your vote. => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)



# 请先仔细阅读说明！！

这里是 [@ety001](https://steemit.com/@ety001) 的Steem 数据服务器。这个服务器提供最新的见证人和全节点的数据备份。

**如果想获取最新的备份信息，请关注这里: [https://t.me/steem_fans](https://t.me/steem_fans) .**

## 如何下载数据

* **HTTP/HTTPS**: 你可以直接访问 [https://files.steem.fans](https://files.steem.fans) 获取文件名，然后执行 `wget -c https://files.steem.fans/hetzner/<filename>`(使用你获取到的备份文件名替换掉命令中的 `<filename>`).
* **Rsync**: `rsync -avzhP 'ssh -p23' u319306-sub1@u319306-sub1.your-storagebox.de:/home/<filename> /<your_local_path>`. 使用你获取到的备份文件名替换掉命令中的 `<filename>`。用你本地的存储路径替换掉 `<your_local_path>`。 密码: `gQlkbh3DryaWMQWt`.
* **FTP**: 主机地址: `u319306-sub1.your-storagebox.de`, 用户名: `u319306-sub1`, 密码: `gQlkbh3DryaWMQWt`.
* **WebDAV**: 主机地址: `https://u319306-sub1.your-storagebox.de`, 用户名: `u319306-sub1`, 密码: `gQlkbh3DryaWMQWt`.
* **SMB / CIFS**: `mount -t cifs //u319306-sub1.your-storagebox.de/u319306-sub1 /<your_local_path> -o username=u319306-sub1,password=gQlkbh3DryaWMQWt`. 使用你本地目录地址替换掉 `<your_local_path>`.

## 插件配置和其他配置参考

> **注意**: 请先注释掉 `shared-file-dir = /shm/`。

### 1. witness node
```
docker image:
ety001/steem-mira:0.23.1

file:
steem_witness.tar.lz4

plugin settings in config.ini:
plugin = witness
```
> 搭建见证人节点: [How to deploy a Steem Witness node by Docker?](https://steemit.com/witness/@ety001/how-to-deploy-a-steem-witness-node-by-docker)

### 2. fullnode
```
docker image:
ety001/steem-full-mira:0.23.1

file:
steem_api.tar.lz4

plugin settings in config.ini:
shared-file-full-threshold = 9900
plugin = webserver p2p json_rpc account_by_key reputation market_history
plugin = database_api account_by_key_api network_broadcast_api reputation_api market_history_api condenser_api block_api rc_api
```

### 3.ahnode

> 搭建 ahnode 节点: [How to deploy an Ahnode with official docker image?](https://steemit.com/witness/@ety001/how-to-deploy-an-ahnode-with-official-docker-image)

### 4.hivemind

**备份格式自 2025-06 起已变更。** 新备份文件为 PostgreSQL 自定义格式 dump (`*.dump`)，由 `pg_dump -Fc -Z6` 生成。如果你使用的是旧的 `.sql.tar.lz4` 备份，请参阅下方的旧版说明。

#### 新格式 (*.dump) — pg_restore

```
file: hivemind_YYYYMMDD.dump (PostgreSQL 自定义格式, 压缩后约 112GB)
```

1) 创建 hivemind 目录
2) cd hivemind
3) 下载 dump 文件并放在此目录下
4) 创建 `docker-compose.yml`，内容如下:

```yaml
version: '3'
services:
  db:
    image: postgres:15
    container_name: hivemind_db
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
      PGDATA: /var/lib/postgresql/data/pgdata
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
      - ./hivemind_YYYYMMDD.dump:/tmp/hivemind.dump
    restart: always
  redis:
    image: redis
    container_name: hivemind_redis
    volumes:
      - ./redis_data:/data
    restart: always
  hive:
    depends_on:
      - db
      - redis
    image: steemit/hivemind:latest
    container_name: hivemind_hive
    environment:
      DATABASE_URL: postgresql://steem:steem123@db:5432/hivedb
      LOG_LEVEL: INFO
      STEEMD_URL: https://api.steemit.com  # 替换为你的 fullnode 地址
      REDIS_URL: redis://redis:6379
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    links:
      - db:db
      - redis:redis
    restart: always
```

5) 创建 PostgreSQL 配置文件 `my-postgres.conf`，内容如下（请根据你的系统调整参数）:

```
listen_addresses = '*'
effective_cache_size = 12GB
maintenance_work_mem = 2GB
random_page_cost = 1.0
shared_buffers = 4GB
work_mem = 512MB
synchronous_commit = off
checkpoint_completion_target = 0.9
checkpoint_timeout = 30min
max_wal_size = 4GB
```

6) 启动 PostgreSQL: `docker compose up db -d`

7) 恢复数据库:
```
cat hivemind_YYYYMMDD.dump | docker exec -i hivemind_db pg_restore -U steem -d hivedb --no-owner --no-privileges --no-comments --if-exists --clean
```
或者如果 dump 文件已经挂载到容器内（如上面 docker-compose.yml 所示）:
```
docker exec hivemind_db pg_restore -U steem -d hivedb --no-owner --no-privileges --no-comments --if-exists --clean /tmp/hivemind.dump
```

8) 启动 Hivemind: `docker compose up hive -d`

#### 旧格式 (*.sql.tar.lz4) — psql

如果你使用的是旧的 `.sql.tar.lz4` 备份:

1) 解压缩: `tar --use-compress-program=lz4 -xvf hivemind.sql.tar.lz4 -C /tmp`
2) 启动 PostgreSQL: `docker compose up db -d`
3) 导入: `docker exec -it hivemind_db psql -f /tmp/hivemind.sql -d hivedb -U steem`
4) 启动 Hivemind: `docker compose up hive -d`

## 其他

如果有什么问题，可以直接给我发邮件，地址是 [work#akawa.ink] (把 # 换成 @)。

你也可以加入我们的 Discord 服务器 => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: 我是Steem见证人，欢迎给我投票。 => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)
