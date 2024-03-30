FROM nginx:alpine
COPY /Genshin-Impact-Wish-Simulator/.vercel/output/static /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
