# 保活

通过 SSH 登录进行保活

## 保活

通过另外一台服务器，定期自动通过 ssh 登录服务器

### 生成密钥对

> 这里不使用自己常用的密钥对，而是生成新的

#### 在 serv00 服务器上操作

在 serv00 服务器上执行（在哪都行），一路回车往下执行

```sh
ssh-keygen -t rsa
```

执行完成后会生成 `~/.ssh/id_rsa` 私钥文件 和 `~/.ssh/id_rsa.pub` 公钥文件

将公钥文件写入到 `authorized_keys` (注意这里是在 serv00 上生成的，可以直接 cat 后写入。本地生成的需手动编辑写入)

```sh
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

查看并复制私钥内容

```sh
# 执行后，复制输出的私钥内容
cat ~/.ssh/id_rsa
```

#### 在其他服务器上操作

```sh
touch ~/.ssh/id_serv00
chmod 400 ~/.ssh/id_serv00
vi ~/.ssh/id_serv00
```

并将上一步复制的私钥文件写入（不会的自行搜索）

写入完成后建议手动登录一次（首次登录需要确认公钥，输入 `yes` 后继续）

```sh
ssh -i ~/.ssh/id_serv00 用户名@服务器地址
```

#### 添加自动登录脚本

编辑自动登录脚本（简单处理）

```sh
touch ~/auto_login_serv00.sh
chmod +x ~/auto_login_serv00.sh
vi ~/auto_login_serv00.sh
```

写入以下内容

```sh
echo "[`date -u '+%Y-%m-%d %H:%M:%S'`] Auto login to serv00 via ssh"
timeout -k 10 15 ssh -i /path/to/id_serv00 用户名@服务器地址
```

> 务必注意替换 **用户名** 和 **服务器地址**

#### 添加定时任务

```sh
crontab -l | { cat; echo "0 */12 * * * \"`pwd`/auto_login_serv00.sh\" >> /var/log/serv00.log 2>&1"; } | crontab -
```

> 定时登录，具体的时间配置 `0 */12 * * *`，可自行通过 [crontab.guru](https://crontab.guru/) 调整并回填修改<br>
> 自动登录信息，可查看 `/var/log/serv00.log` 日志文件
