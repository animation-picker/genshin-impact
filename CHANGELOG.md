## 更新日志
### v0.1.2

更新至5.0上半卡池(感谢 @6DDUU6 #71 #75 )


### v0.1.1

> Tips:重构版本被标记为pre-release，可以通过[这里](https://github.com/cyanial/genshin-impact-picker/releases/tag/v0.2.0-beta)自行下载测试

1.更新至4.6上半卡池(感谢 @6DDUU6 #69 )

2.添加4.5下半卡池(感谢 @6DDUU6 #69 )

### v0.1.0-1

**本release后，项目将进行重构，旧版本将移至Old-main分支**

几乎和上个release相同，没有改变 ~~(要说有也只是CI的改动而已)~~

1.CI添加自动构建docker镜像

### v0.1.0

1.添加关闭按钮/切换历史卡池(感谢 @6DDUU6 #17 )

2.添加自定义星数(格式为 3/4/5 名字 如:5 张三)(感谢 @6DDUU6 #17)

3.修复了动画不对应星级的问题(感谢 @ShawnNotFound #40)

4.添加Tauri打包，尝试支持Win7以上系统(理论能正常使用,如**无法运行**请提issue)

4.更新至4.5上半卡池(感谢 @6DDUU6 #31 )

## 文件说明
- Windows：请使用后缀为exe/msi或者文件带windows的zip文件

- Linux:通用：后缀为appimage或文件名带Linux的zip文件

- debian系(ubuntu):deb文件

- Macos(x64): 后缀dmg或者文件名带Macos的zip文件

**Win7以上系统的用户请使用exe/msi文件**

## 使用提示

Zip文件基于Electron打包的应用程序(win10以下的系统不能使用) 解压后运行应用程序即可

其余均为Tauri打包(可直接双击运行)