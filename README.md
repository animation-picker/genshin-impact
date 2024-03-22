# 原神抽卡模拟器

![原神点名器](https://stats.deeptrain.net/repo/cyanial/genshin-impact-picker/?theme=light)

[![发布状态](https://github.com/cyanial/genshin-impact-picker/actions/workflows/release.yml/badge.svg)](https://github.com/cyanial/genshin-impact-picker/actions/workflows/release.yml) [![页面状态](https://github.com/cyanial/genshin-impact-picker/actions/workflows/page.yml/badge.svg)](https://github.com/cyanial/genshin-impact-picker/actions/workflows/page.yml) [![应用构建状态](https://github.com/cyanial/genshin-impact-picker/actions/workflows/app.yml/badge.svg)](https://github.com/cyanial/genshin-impact-picker/actions/workflows/app.yml)

## 注意

> 感谢 [Genshin-Impact-Wish-Simulator](https://github.com/Mantan21/Genshin-Impact-Wish-Simulator) 作者的[批准](https://github.com/Mantan21/Genshin-Impact-Wish-Simulator/issues/95)。

### 公共站点

欢迎大家在不影响正常使用的情况下，分享自己部署的点名器站点，以供大家共同使用：

1. [dm.mznet.pro](https://dm.mznet.pro)
  > 本站点使用Cloudflare减速器，可能会有一定的访问延迟，请保持耐心。我将尽力保持长期运营。
2. [genshin.jerryz.com.cn](https://genshin.jerryz.com.cn/)
3. [demo-picker.shawn404.top](https://demo-picker.shawn404.top)

### 使用说明
#### 从源代码部署（两种下载方法）
##### 直接clone本仓库使用仓库中的编译好的代码文件夹
> 将网站运行目录设置为 `genshin-impact-picker-main/electron-static/static` 文件夹。
##### 从action中的app下载编译好的文件包
#### 如何上传名单以及名单文件格式
- 支持自定义角色，格式为“星级 空格 角色名”（例如：5 张三，每行一个）。
- 可以通过页面左上角的问号提交名单（txt格式）。
- P.S.星级请设置3-5之间的整数，超过5或小于3会导致不显示点名结果

### Docker 部署

```shell
docker run -d --name ysdm \
  -p 8000:80 \
  maizig/ysdm:1.1.0
```

> 运行成功后，访问宿主机地址 `http://localhost:8000`。使用 Nginx 或 Apache 进行反向代理是一个不错的选择，同时也可以配置 SSL。

### 前端开发

前端代码位于 `Genshin-Impact-Wish-Simulator` 目录，基于 `Svelte` 框架开发。

#### 二次开发

```bash
$ npm install
$ npm run dev
```

### 打包为可执行文件

#### Electron 打包

在 `Genshin-Impact-Wish-Simulator` 目录下执行：

```bash
$ npm run build
```

将生成的静态文件 `.vercel/static` 拷贝到 `electron-static/static` 目录中，覆盖原有文件。

然后进入 `electron-static` 目录执行：

```bash
$ npm install
$ npm run build # 生成当前系统的可执行文件
$ npm run build-win # 生成 Windows x64 的可执行文件
```

#### Tauri 打包

使用 Tauri 打包体积更小，因为它调用系统的 webview，打包体积可减少 200-300MB（Tauri 打包为 127MB，Electron 打包为 418MB）。

> 注意：Tauri 调用系统 webview，不支持 Windows 10 以下的系统。但可以通过配置文件内置 webview 解决，详见：https://tauri.app/zh-cn/v1/guides/building/windows 的 `Supporting Windows 7` 部分。

在 `Genshin-Impact-Wish-Simulator` 目录下执行：

```bash
$ npm run tauri build
```

### Netlify 一键部署

通过下方按钮可直接一键部署至 Netlify（本仓库已内置配置文件，适合懒人使用）。

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cyanial/genshin-impact-picker&base=Genshin-Impact-Wish-Simulator)

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/cyanial/genshin-impact-picker)

部署成功后，进入 `Settings-General`，将 `Build & Development Settings` 下的 `Root Directory` 设置为 `Genshin-Impact-Wish-Simulator`。回到 `Deployments` 页面，点击当前部署右侧的三个点，选择 `Redeploy`。等待部署完成后，访问 Vercel 提供的域名即可。

## 许可证

本项目采用 `CC BY-NC-SA 4.0` 许可证，不得用于商业用途。

### 原仓库许可证：WishSimulator（MIT 许可证）

```
MIT License

Copyright (c) 2022 WishSimulator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
