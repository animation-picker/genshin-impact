---
description: 本文主要教学使用docker下载源码
---

# 使用docker部署



### 使用dokcer部署

```shell
docker run -d --name ysdm \
  -p 8000:80 \
  maizig/ysdm:latest
```

> 运行成功后，访问宿主机地址 `http://localhost:8000`。使用 Nginx 或 Apache 进行反向代理是一个不错的选择，同时也可以配置 SSL。
