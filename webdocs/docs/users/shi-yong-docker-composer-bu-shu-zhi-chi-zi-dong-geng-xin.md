---
description: 自动更新部署方式
---

# 使用docker composer部署（支持自动更新）

1. 创建一个 `docker-compose.yml` 文件

```yaml
version: '3'



services:
  picker:
    image: maizig/ysdm:latest
    ports:
      - "8066:80"
    restart: always
    environment:
      - WATCHTOWER_CLEANUP=true
      
      
      
      
  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: 
      --cleanup 
      --interval 300 
      picker

```

2.进入`docker-compose.yml`目录执行命令

```bash
docker-compose up -d # 启动容器
```
