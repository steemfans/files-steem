# Read Me First !!

Hi there, this is [@ety001](https://steemit.com/@ety001)'s steem data server. This server will supply latest data files of witness node and fullnode.

**If you want to get latest backup information, please follow here: [https://t.me/steem_fans](https://t.me/steem_fans) .**

## I. How to download data

* **HTTP/HTTPS**: You could visit [https://files.steem.fans](https://files.steem.fans) to get file name and `wget -c https://files.steem.fans/hetzner/<filename>`(Replace `<filename>` by backup data file name).
* **Rsync**: `rsync -avzhP -e 'ssh -p23' u319306-sub1@u319306-sub1.your-storagebox.de:/home/<filename> /<your_local_path>`. Replace `<filename>` by backup data file name and replace `<your_local_path>` by your local path. The password is `gQlkbh3DryaWMQWt`.
* **FTP**: Host: `u319306-sub1.your-storagebox.de`, Username: `u319306-sub1`, Password: `gQlkbh3DryaWMQWt`. Example command: `lftp -e "pget -n 10 -c ftp://u319306-sub1:gQlkbh3DryaWMQWt@u319306-sub1.your-storagebox.de/steem_witness_20241021.tar.lz4; exit"`.
* **WebDAV**: Host: `https://u319306-sub1.your-storagebox.de`, Username: `u319306-sub1`, Password: `gQlkbh3DryaWMQWt`.
* **SMB / CIFS**: `mount -t cifs //u319306-sub1.your-storagebox.de/u319306-sub1 /<your_local_path> -o username=u319306-sub1,password=gQlkbh3DryaWMQWt`. Replace `<your_local_path>` by your local path.

## II. Plugin and other config References

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

```
file: hivemind.sql.tar.lz4
```

* 1) make a folder named hivemind
* 2) cd hivemind
* 3) create a docker-compose.yml file with below content:

```
version: '3'
services:
  db:
    image: postgres:12
    container_name: hivemind_db
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
    ports:
      - "5432:5432"
    volumes:
      - ./data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
      - /tmp:/tmp
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
      STEEMD_URL: http://172.20.0.114:8091 # This is the fullnode api
      REDIS_URL: redis://redis:6379
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    ports:
      - "8080:8080"
    links:
      - db:db
      - redis:redis
    restart: always
```

* 4) create the postgre config file *my-postgres.conf* with below content:

```
listen_addresses = '*'
effective_cache_size = 12GB # 50-75% of avail memory
maintenance_work_mem = 2GB
random_page_cost = 2.0      # assuming SSD storage
shared_buffers = 4GB        # 25% of memory
work_mem = 512MB
synchronous_commit = off
checkpoint_completion_target = 0.9
checkpoint_timeout = 30min
max_wal_size = 4GB
```

* 5) change the configurations of postgres in `my-postgres.conf` to fit your system
* 6) unarchive the `hivemind.sql.tar.lz4` file: `tar --use-compress-program=lz4 -xvf hivemind.sql.tar.lz4 -C /tmp`
* 7) run `docker-compose -f docker-compose.yml up db -d` to start up Postgres
* 8) run `docker-compose exec -it db /bin/bash` to get in Postgres DB container and then
   run `psql -f /tmp/hivemind.sql -d hivedb -h localhost -p 5432 -U steem` to import DB 
* 9) run `docker-compose -f docker-compose.yml up hive -d` to start up Hivemind

## III. Other

If you have any issue, please email me. My email is [work#akawa.ink] (replace # to @).

You can also join our Discord Server => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: I'm also a witness. It's pleasure to get your vote. => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)



# 请先仔细阅读说明！！

这里是 [@ety001](https://steemit.com/@ety001) 的Steem 数据服务器。这个服务器提供最新的见证人和全节点的数据备份。

**如果想获取最新的备份信息，请关注这里: [https://t.me/steem_fans](https://t.me/steem_fans) .**

## 一. 如何下载数据

* **HTTP/HTTPS**: 你可以直接访问 [https://files.steem.fans](https://files.steem.fans) 获取文件名，然后执行 `wget -c https://files.steem.fans/hetzner/<filename>`(使用你获取到的备份文件名替换掉命令中的 `<filename>`).
* **Rsync**: `rsync -avzhP 'ssh -p23' u319306-sub1@u319306-sub1.your-storagebox.de:/home/<filename> /<your_local_path>`. 使用你获取到的备份文件名替换掉命令中的 `<filename>`。用你本地的存储路径替换掉 `<your_local_path>`。 密码: `gQlkbh3DryaWMQWt`.
* **FTP**: 主机地址: `u319306-sub1.your-storagebox.de`, 用户名: `u319306-sub1`, 密码: `gQlkbh3DryaWMQWt`. 示例命令: `lftp -e "pget -n 10 -c ftp://u319306-sub1:gQlkbh3DryaWMQWt@u319306-sub1.your-storagebox.de/steem_witness_20241021.tar.lz4; exit"`.
* **WebDAV**: 主机地址: `https://u319306-sub1.your-storagebox.de`, 用户名: `u319306-sub1`, 密码: `gQlkbh3DryaWMQWt`.
* **SMB / CIFS**: `mount -t cifs //u319306-sub1.your-storagebox.de/u319306-sub1 /<your_local_path> -o username=u319306-sub1,password=gQlkbh3DryaWMQWt`. 使用你本地目录地址替换掉 `<your_local_path>`.

## 二. 插件配置和其他配置参考

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
```
file: hivemind.sql.tar.lz4
```

* 1) 创建hivemind目录
* 2) cd hivemind
* 3) 创建 docker-compose.yml，内容如下:

```
version: '3'
services:
  db:
    image: postgres:12
    container_name: hivemind_db
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
    ports:
      - "5432:5432"
    volumes:
      - ./data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
      - /tmp:/tmp
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
      STEEMD_URL: http://172.20.0.114:8091 # This is the fullnode api
      REDIS_URL: redis://redis:6379
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    ports:
      - "8080:8080"
    links:
      - db:db
      - redis:redis
    restart: always
```

* 4) 创建 postgre 配置文件 ***my-postgres.conf***，内容如下:

```
listen_addresses = '*'
effective_cache_size = 12GB # 50-75% of avail memory
maintenance_work_mem = 2GB
random_page_cost = 2.0      # assuming SSD storage
shared_buffers = 4GB        # 25% of memory
work_mem = 512MB
synchronous_commit = off
checkpoint_completion_target = 0.9
checkpoint_timeout = 30min
max_wal_size = 4GB
```

* 5) 根据你的系统情况调整 `my-postgres.conf` 文件中的 postgres 参数
* 6) 解压缩 *hivemind.sql.tar.lz4* 到 `/tmp` 目录, `tar --use-compress-program=lz4 -xvf hivemind.sql.tar.lz4 -C /tmp`
* 7) 运行 `docker-compose -f docker-compose.yml up db -d` 启动 Postgres 数据库
* 8) 运行 `docker-compose exec -it db /bin/bash` 进入 Postgres DB 容器，
   然后执行 `psql -f /tmp/hivemind.sql -d hivedb -h localhost -p 5432 -U steem` 导入数据库
* 9) 运行 `docker-compose -f docker-compose.yml up hive -d` 启动 Hivemind

## 三. 其他

如果有什么问题，可以直接给我发邮件，地址是 [work#akawa.ink] (把 # 换成 @)。

你也可以加入我们的 Discord 服务器 => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: 我是Steem见证人，欢迎给我投票。 => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)
