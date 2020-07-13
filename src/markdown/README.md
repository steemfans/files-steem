# Steem Data Server

Hi there, this is [@ety001](https://steemit.com/@ety001)'s steem data server. This server will supply latest data files of witness node and fullnode.

## How to use

* You could visit [https://files.steem.fans](https://files.steem.fans) to explore and download all files I supply.

* And you also could use `rsync` to get files. The path is `rsync://files.steem.fans/data. For example, you can get `README.html` like this `rsync rsync://files.steem.fans/data/README.html ./`.

## Plugin References

### 1. witness node
```
file:  steem_witness.tar.lz4

plugin = witness
```

### 2. fullnode
```
file:  steem_api.tar.lz4

plugin = webserver p2p json_rpc account_by_key reputation market_history
plugin = database_api account_by_key_api network_broadcast_api reputation_api market_history_api condenser_api block_api rc_api
```

### 3.ahnode
```
file:  steem_ah.tar.lz4

plugin = webserver p2p json_rpc condenser_api account_history_rocksdb account_history_api
```

## Other

If you have any issue, please email me. My email is [work#akawa.ink] (replace # to @).

PS: I'm also a witness. It's pleasure to get your vote. => [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001)



# Steem 数据服务器

这里是 [@ety001](https://steemit.com/@ety001) 的Steem 数据服务器。这个服务器提供最新的见证人和全节点的数据备份。

## 如何使用

* 你可以直接访问 [https://auth.steem.fans](https://auth.steem.fans) 获取到你要下载的数据文件
* 你也可以使用 `rsync` 工具下载，地址是 `rsync://auth.steem.fans/steem`。举例：你可以通过下面的命令 `rsync   rsync://auth.steem.fans/steem/README.html   ./` 下载到根目录下面的 `README.html` 文件。

## 插件配置参考

### 1. witness node
```
file:  steem_witness.tar.lz4

plugin = witness
```

### 2. fullnode
```
file:  steem_api.tar.lz4

plugin = webserver p2p json_rpc account_by_key reputation market_history
plugin = database_api account_by_key_api network_broadcast_api reputation_api market_history_api condenser_api block_api rc_api
```

### 3.ahnode
```
file:  steem_ah.tar.lz4

plugin = webserver p2p json_rpc condenser_api account_history_rocksdb account_history_api
```

## 其他

如果有什么问题，可以直接给我发邮件，地址是 [work#akawa.ink] (把 # 换成 @)。

PS: 我是Steem见证人，欢迎给我投票。 =》 [Vote ME!](https://auth.steem.fans/sign/account_witness_vote?approve=1&witness=ety001) 