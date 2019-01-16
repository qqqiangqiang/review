## 静态资源服务器

### 初始化package.json
- npm init -y
### main
- npm install supervisor -g (监听文件变化，重启服务)
### 命令行
1、修改 ``package.json``，增加``bin``
```javascript
// 全局安装的话，会将其设置成全局的path，在任何地方都可以执行
"bin": {
  "dzq-server": "bin/www"
}
```
2、在``package.json``所在的目录下下执行``npm link``, 在任意目录下可执行``dzq-server``命令
``npm link``命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包。
```javascript
/**
 * npm WARN static@1.0.0 No repository field.

up to date in 9.345s
/Users/dongzhiqiang/git/nvm/versions/node/v8.1.0/bin/dzq-server -> /Users/dongzhiqiang/git/nvm/versions/node/v8.1.0/lib/node_modules/static/bin/www
/Users/dongzhiqiang/git/nvm/versions/node/v8.1.0/lib/node_modules/static -> /Users/dongzhiqiang/workplace/zhufeng/node/static
 */
```

3、发布
``npm login``
``npm publish``
ps：npm login 无响应的情况，请升级node版本，安装最新的npm 