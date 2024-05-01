---
description: 从github仓库里的网站代码目录直接部署
---

# 从源代码部署

### 前置准备

准备一台服务器（需要至少安装好nginx，使用宝塔面板是一个不错的选择）

### 开始部署

1. 进入你设置的网站目录

```bash
cd /www/wwwroot/example.com //使用宝塔面板创建网站的默认目录格式
```

2. 克隆本仓库

```bash
git clone https://github.com/animation-picker/genshin-impact.git
```

3. 返回网站设置，将网站运行目录设置为 `genshin-impact-picker-main/electron-static/static` 文件夹。
4. 记得添加ssl等其他设置
