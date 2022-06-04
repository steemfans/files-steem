# Read Me First !!

Hi there, this is [@ety001](https://steemit.com/@ety001)'s steem data server. This server will supply latest data files of witness node and fullnode.

## How to use

* You could visit [https://files.steem.fans](https://files.steem.fans) to explore and download all files I supply.

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
> Build a witness node: [A simple tuturial for a dockerize steem witness deployment](https://steemit.com/steem/@ety001/a-simple-tuturial-for-a-dockerize-steem-witness-deployment)

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
```
docker image:
ety001/steem-ah-mira:0.23.0

file:
steem_ah.tar.lz4

plugin settings in config.ini:
plugin = webserver p2p json_rpc condenser_api account_history_rocksdb account_history_api
```

### 4.hivemind
```
file: hivemind.tar.lz4

1) make a folder named hivemind
2) cd hivemind
3) create a docker-compose.yml file with below content:

version: '3'
services:
  db:
    image: postgres:12
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
    volumes:
      - ./data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
    restart: always
  hive:
    depends_on:
      - db
    image: steemit/hivemind:latest
    environment:
      DATABASE_URL: postgresql://steem:steem123@db:5432/hivedb
      LOG_LEVEL: INFO
      STEEMD_URL: http://172.20.0.114:8091 # This is the fullnode api
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    links:
      - db:db
    restart: always

4) create the postgre config file **my-postgres.conf** with below content:

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

5) change the params of postgres to fit your system
6) unarchive the hivemind.tar.lz4 file to the hivemind folder
7) docker-compose run -d
```

## Other

If you have any issue, please email me. My email is [work#akawa.ink] (replace # to @).

You can also join our Discord Server => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: I'm also a witness. It's pleasure to get your vote. => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)



# 请先仔细阅读说明！！

这里是 [@ety001](https://steemit.com/@ety001) 的Steem 数据服务器。这个服务器提供最新的见证人和全节点的数据备份。

## 如何使用

* 你可以直接访问 [https://files.steem.fans](https://files.steem.fans) 获取到你要下载的数据文件

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
> 搭建见证人节点: [A simple tuturial for a dockerize steem witness deployment](https://steemit.com/steem/@ety001/a-simple-tuturial-for-a-dockerize-steem-witness-deployment)

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
```
docker image:
ety001/steem-ah-mira:0.23.0

file:
steem_ah.tar.lz4

plugin settings in config.ini:
plugin = webserver p2p json_rpc condenser_api account_history_rocksdb account_history_api
```

### 4.hivemind
```
file: hivemind.tar.lz4

1) 创建hivemind目录
2) cd hivemind
3) 创建 docker-compose.yml，内容如下:

version: '3'
services:
  db:
    image: postgres:12
    environment:
      POSTGRES_USER: steem
      POSTGRES_PASSWORD: steem123
      POSTGRES_DB: hivedb
    volumes:
      - ./data:/var/lib/postgresql/data
      - ./my-postgres.conf:/etc/postgresql/postgresql.conf
    restart: always
  hive:
    depends_on:
      - db
    image: steemit/hivemind:latest
    environment:
      DATABASE_URL: postgresql://steem:steem123@db:5432/hivedb
      LOG_LEVEL: INFO
      STEEMD_URL: http://172.20.0.114:8091 # 换成你的fullnode地址或其他可用的api地址
      SYNC_SERVICE: 1
      MAX_BATCH: 50
      MAX_WORKERS: 2
    links:
      - db:db
    restart: always

4) 创建 postgre 配置文件 **my-postgres.conf**，内容如下:

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

5) 根据你的系统情况调整 postgres 参数
6) 解压缩 hivemind.tar.lz4 到 hivemind 目录
7) docker-compose run -d
```

## 其他

如果有什么问题，可以直接给我发邮件，地址是 [work#akawa.ink] (把 # 换成 @)。

你也可以加入我们的 Discord 服务器 => [https://discord.gg/QTuZr5F](https://discord.gg/QTuZr5F) .

PS: 我是Steem见证人，欢迎给我投票。 =》 [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)
