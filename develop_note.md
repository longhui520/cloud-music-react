# 本项目开发笔记
## 初始化项目
1. 创建项目
 ```shell
 create-react-app cloud-music-react
 ```
2. 添加styled-component 库
```
npm install styled-components --save
```
3. 修改src目录如下
```text
├─App.js
├─index.js
├─serviceWorker.js
├─style.js
├─store
├─routes
├─components
├─baseUI
├─assets
|   ├─iconfont
|   |    ├─iconfont.css
|   |    ├─iconfont.eot
|   |    ├─iconfont.js
|   |    ├─iconfont.svg
|   |    ├─iconfont.ttf
|   |    ├─iconfont.woff
|   |    └iconfont.woff2
├─application
├─api
```
> 目录结构图为`treer`包生成
4. 修改 App.js并引入style.js和字体js