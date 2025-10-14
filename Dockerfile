FROM nginx:alpine

# 安装必要的工具
RUN apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制网站文件
COPY . /usr/share/nginx/html/

# 创建nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]