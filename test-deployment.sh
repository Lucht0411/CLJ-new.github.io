#!/bin/bash

echo "COSCO SHIPPING LOGISTICS Website Deployment Test"
echo "==============================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_step() {
    local step_name=$1
    local command=$2
    
    echo -n "测试 $step_name... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ 通过${NC}"
        return 0
    else
        echo -e "${RED}✗ 失败${NC}"
        return 1
    fi
}

# 检查Docker
test_step "Docker 安装" "docker --version"
DOCKER_AVAILABLE=$?

# 检查Docker Compose
test_step "Docker Compose 安装" "docker-compose --version"
COMPOSE_AVAILABLE=$?

# 检查文件
echo ""
echo "检查项目文件..."
test_step "Dockerfile 存在" "test -f Dockerfile"
test_step "Nginx 配置存在" "test -f nginx.conf"
test_step "主页文件存在" "test -f index.html"
test_step "船期页面存在" "test -f schedule.html"

# 检查HTML文件完整性
echo ""
echo "检查HTML文件完整性..."
for file in *.html; do
    if [ -f "$file" ]; then
        test_step "$file 语法检查" "grep -q '</html>' $file && grep -q '<head>' $file && grep -q '<body>' $file"
    fi
done

# 检查JavaScript文件
test_step "JavaScript 文件存在" "test -f main.js"

# 显示结果
echo ""
echo "测试结果汇总:"
echo "=============="

if [ $DOCKER_AVAILABLE -eq 0 ] && [ $COMPOSE_AVAILABLE -eq 0 ]; then
    echo -e "${GREEN}✓ 环境检查通过，可以部署${NC}"
    echo ""
    echo "部署命令:"
    echo "  ./start.sh          # 使用启动脚本"
    echo "  docker-compose up -d # 手动启动"
    echo ""
    echo "访问地址: http://localhost:8080"
else
    echo -e "${RED}✗ 环境检查失败${NC}"
    echo ""
    if [ $DOCKER_AVAILABLE -ne 0 ]; then
        echo -e "${YELLOW}请安装 Docker${NC}"
    fi
    if [ $COMPOSE_AVAILABLE -ne 0 ]; then
        echo -e "${YELLOW}请安装 Docker Compose${NC}"
    fi
fi

echo ""
echo "按任意键继续..."
read -n 1 -s