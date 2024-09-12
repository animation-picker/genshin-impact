import { defineConfig } from 'vitepress'

export default defineConfig({
	lang: 'zh-CN',
	base: '/genshin-impact/',
	title: '原神点名器文档',
	description: '原神点名器文档',
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
	themeConfig: {
		//logo: 'logo.png',
		footer: {
			copyright: 'Copyright © 2024 animation-picker'
		},
		nav: [
			{
				text: '用户文档',
				link: '/users/bu-shu-jiao-cheng'
			},
			{
				text: '开发文档',
				link: '/develop/begin'
			}
		],
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/animation-picker/genshin-impact'
			}
		],
		sidebar: [
			{
				text: '用户文档',
				items: [
					{
						text: '使用教程',
						link: '/users/bu-shu-jiao-cheng'
					},
					{
						text: '配置教程',
						link: '/users/configure'
					},
					{
						text: '从源代码部署',
						link: '/users/cong-yuan-dai-ma-bu-shu'
					},
					{
						text: '在本地设备使用软件包',
						link: '/users/zai-ben-di-she-bei-shi-yong-ruan-jian-bao'
					},
					{
						text: '使用docker部署',
						link: '/users/shi-yong-docker-bu-shu'
					},
					{
						text: '使用docker composer部署自动更新',
						link: '/users/shi-yong-docker-composer-bu-shu-zhi-chi-zi-dong-geng-xin'
					},
					{
						text: '使用无服务器部署方式',
						link: '/users/shi-yong-wu-fu-wu-qi-bu-shu-fang-shi'
					},
					{
						text: '公共站点',
						link: '/users/public'
					},

				]
			},
			{
				text: '开发文档',
				items: [
					{
						text: '开始',
						link: '/develop/begin'
					},
					{
						text: '前端页面开发',
						link: '/develop/frontend'
					},
					{
						text: '应用程序开发',
						link: '/develop/app'
					}
			
				]
			}]

	}
})
