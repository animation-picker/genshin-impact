
#
# 构建前端
#

FROM node:lts-bullseye AS builder
ARG BASE_PATH='/root/genish-picker'
WORKDIR "${BASE_PATH}/Genshin-Impact-Wish-Simulator"

# 编译前端
COPY /Genshin-Impact-Wish-Simulator ./
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder "/root/genish-picker/Genshin-Impact-Wish-Simulator/.vercel/output/static" "/usr/share/nginx/html"
COPY default.conf /etc/nginx/conf.d/default.conf
LABEL org.opencontainers.image.source=https://github.com/animation-picker/genshin-impact
LABEL org.opencontainers.image.description="A genshin-impact style of picker"
LABEL org.opencontainers.image.licenses=OTHER

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]