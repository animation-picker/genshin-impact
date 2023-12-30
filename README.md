# Genshin-impact-picker

## Note

Thanks for [approve](https://github.com/Mantan21/Genshin-Impact-Wish-Simulator/issues/95) from author of [Genshin-Impact-Wish-Simulator](!https://github.com/Mantan21/Genshin-Impact-Wish-Simulator) 

### 前端开发

前端代码在目录 `Genshin-Impact-Wish-Simulator` . 基于 `Svelte` 框架.

#### 二次开发

```bash
$ npm run install
$ npm run dev
```

### 打包exe

在 `Genshin-Impact-Wish-Simulator` 中执行

```bash
$ npm run build
```

将生成的静态文件 `.vercel/static` 拷贝到 `electron-static/static` 目录中, 覆盖掉.

进入 `electron-static` 目录执行

```bash
$ npm install
$ npm run build (生成当前系统可执行文件)
$ npm run build-win (生成win32-x64)
```



