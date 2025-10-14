#!/bin/bash

echo "COSCO SHIPPING LOGISTICS Website Docker Deployment"
echo "=================================================="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装。请先安装 Docker。"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "错误: Docker Compose 未安装。请先安装 Docker Compose。"
    exit 1
fi

# 停止并移除现有容器
echo "停止现有容器..."
docker-compose down

# 构建镜像
echo "构建 Docker 镜像..."
docker-compose build

# 启动服务
echo "启动服务..."
docker-compose up -d

# 检查服务状态
echo "检查服务状态..."
sleep 5
docker-compose ps

# 获取容器IP
echo ""
echo "网站已成功部署！"
echo "访问地址: http://localhost:8080"
echo ""
echo "管理命令:"
echo "  查看日志: docker-compose logs -f"
echo "  停止服务: docker-compose down"
echo "  重启服务: docker-compose restart"
echo ""
echo "按 Ctrl+C 退出"