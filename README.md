
# serv00 站点服务

[中文文档](./README.md) | [English](./README_en.md)

在 [serv00.com](https://www.serv00.com/) 网站上部署服务

> 通过 pm2 启动的服务，并进行进程管理<br>
> 需要通过 ssh 登录进行保活，可查看 [SSH_KeepAlive.md](./SSH_KeepAlive.md)

## 步骤

## 注册及登录

1. 自行 [注册 serv00 账号](https://www.serv00.com/offer/create_new_account)
2. 根据注册成功的邮件中的内容，登录 DevilWEB 面板

### DevilWEB 面板配置

1. 点击左侧 **WWW Websites** ，复制（记住）域名列表中的站点域名后，删除 **Website List** 中默认的站点
2. 点击 **Add new website**，填写域名（注：经测试只能是自己注册账号生成的域名，填写其他都会提示被占用）
   1. Domain：填写上一步复制的域名
   2. Website type：选择 **Node.js**
   3. Node.js binary：选择较新的版本（例如20或者22的版本，选择其他也不影响）
   4. Environment：选择 **Production**
   5. DNS support: 勾选
3. 点击左侧 **Port reservation**，点击 **Add port**（需要配置自定义端口号，部分端口号已被占用了）
   1. Port：填写 **3080**（若修改为其他端口，同步修改文件 [.env](./.env) 中的配置
   2. Port type：选 **tcp**
   3. Description： 随便填
4. 点击左侧 **Additional services**（必须要启动，否则自己的用户目录下的所有文件都无法添加可执行权限），点击 **Run your own applications**，然后点击 **Enable** 按钮（最后看到的结果就是 Status 为 **Enabled**）

## 服务器设置

> 下方 `<xxx>` 部分的内容自行替换

1. 通过注册邮件中的 SSH 登录信息，登录到服务器
  ```sh
  ssh <用户名>@<服务器地址>
  ```
  > 用户名为注册邮件中的 **Login** 内容，即注册时自己填写的账户名称<br>
  > 服务器地址为注册邮件中的 **SSH/SFTP server address** 内容，例如 `s15.serv00.com`
2. 进入到目录 `node_public`
   ```sh
   cd /domains/<用户名>.serv00.net/public_nodejs
   ```
3. 将仓库克隆到当前目录
   ```sh
   git clone https://github.com/luoweihua7/serv00.git
   ```
4. 安装依赖并启动服务
   ```sh
   npm install
   npm run pm2:start

   # 查看服务状态(按 `q` 键退出)
   npm run pm2:monit
   ```
5. 通过页面访问。访问 **http://<用户名>.serv00.net** 和 **http://<用户名>.serv00.net/ariang** 地址


## 配置NPM

修改 npm 的 prefix 路径，并添加到 `.bashrc` 脚本中

```sh
mkdir ~/.npm-global
npm config set prefix '~/.npm-global' 

echo "
alias l='ls -lAh'
alias ll='ls -lh'
alias gp='git push'
alias gpr='git pull -r'
alias reload='source \$HOME/.bash_profile'
alias path='echo -e \${PATH//:/\\\\n}'

export PATH=~/.npm-global/bin:~/bin:\$PATH 
" >> $HOME/.bash_profile
source $HOME/.bash_profile

npm install -g pm2
```