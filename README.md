# COSCO SHIPPING LOGISTICS (JAPAN) Website

## 项目概述

这是 COSCO SHIPPING LOGISTICS (JAPAN) 的网站重构项目，基于现代化设计理念，提供专业的物流服务展示和交互功能。

## 功能特性

### 🚢 核心功能
- **船期查询** - 实时运航スケジュール検索
- **货物追踪** - コンテナ追跡機能
- **港口信息** - 全球主要港口状态
- **在线询价** - 运賃見積もり依頼

### 🎨 设计特色
- **响应式设计** - 完美适配桌面、平板、手机
- **现代化UI** - 基于Tailwind CSS的专业设计
- **流畅动画** - 使用Anime.js实现平滑过渡效果
- **多语言支持** - 日/中/英三语切换
- **深色模式** - 支持明暗主题切换

### 🔧 技术特性
- **静态网站** - 高性能，易于部署
- **SEO友好** - 语义化HTML结构
- **无障碍访问** - 符合WCAG 2.1标准
- **交互丰富** - 轮播图、模态框、表单验证

## 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **JavaScript ES6+** - 交互功能
- **Tailwind CSS** - 样式框架
- **Anime.js** - 动画库
- **ECharts.js** - 数据可视化

## 快速开始

### 方法1: Docker部署（推荐）

1. 确保已安装 Docker 和 Docker Compose
2. 克隆项目到本地
3. 运行启动脚本：

```bash
./start.sh
```

或者手动执行：

```bash
docker-compose up -d
```

4. 访问网站: http://localhost:8080

### 方法2: 本地运行

1. 使用Python HTTP服务器：

```bash
python -m http.server 8000
```

2. 访问网站: http://localhost:8000

### 方法3: Nginx部署

1. 安装Nginx
2. 将文件复制到Nginx的web目录
3. 配置nginx.conf
4. 重启Nginx服务

## 项目结构

```
/
├── index.html          # 主页
├── company.html        # 公司信息
├── services.html       # 服务介绍
├── schedule.html       # 船期查询
├── news.html          # 新闻资讯
├── contact.html       # 联系我们
├── recruitment.html   # 招聘信息
├── main.js           # 主要JavaScript文件
├── Dockerfile        # Docker配置文件
├── docker-compose.yml # Docker Compose配置
├── nginx.conf        # Nginx配置
├── start.sh          # 启动脚本
└── README.md         # 项目说明
```

## 页面说明

### 主页 (index.html)
- 企业概览和核心价值展示
- 服务快速入口
- 最新新闻轮播
- 合作伙伴展示
- 统计数据可视化

### 船期查询 (schedule.html)
- **船期搜索** - 按港口、船名、日期筛选
- **货物追踪** - 集装箱实时追踪
- **港口信息** - 全球主要港口状态
- **导出功能** - 搜索结果导出

### 服务介绍 (services.html)
- 海上货物运输详情
- 特种运输服务说明
- 在线询价功能
- 服务优势展示

### 公司信息 (company.html)
- 企业简介和发展历程
- 营业网点信息
- 资质证书展示
- 组织架构

### 联系我们 (contact.html)
- 联系表单
- 营业网点地图
- 联系方式汇总
- 在线客服入口

## 交互功能

### 🌐 多语言切换
- 右上角语言选择器
- 支持日语、中文、英语
- 本地存储语言偏好

### 🌙 主题切换
- 明暗主题切换
- 本地存储主题偏好
- 平滑过渡动画

### 📱 响应式导航
- 移动端汉堡菜单
- 平滑滚动导航
- 当前页面高亮

### 🎯 表单交互
- 实时表单验证
- 加载状态指示
- 成功/错误提示
- 模态框确认

### 🎪 视觉效果
- 滚动触发动画
- 悬停交互效果
- 轮播图自动播放
- 页面切换过渡

## 部署说明

### Docker部署

1. **构建镜像**
```bash
docker build -t cosco-website .
```

2. **运行容器**
```bash
docker run -d -p 8080:80 --name cosco-web cosco-website
```

3. **使用Docker Compose**
```bash
docker-compose up -d
```

### 生产环境部署

1. **Nginx配置优化**
   - 启用Gzip压缩
   - 设置缓存策略
   - 配置SSL证书
   - 优化安全头

2. **性能优化**
   - 图片压缩和懒加载
   - CSS/JS文件压缩
   - 启用HTTP/2
   - CDN加速

3. **监控和维护**
   - 日志分析
   - 性能监控
   - 定期备份
   - 安全更新

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 移动端浏览器

## 开发说明

### 本地开发

1. 使用Live Server插件实现热重载
2. 使用浏览器开发者工具调试
3. 响应式设计测试
4. 性能优化检查

### 代码规范

- 使用ES6+现代JavaScript语法
- 语义化HTML5标记
- 模块化的CSS结构
- 注释完善的代码

## 许可证

© 2025 COSCO SHIPPING LOGISTICS (JAPAN) CO., LTD. All rights reserved.

## 联系方式

- **电话**: 03-1234-5678
- **邮箱**: info@cosco-logistics.jp
- **地址**: 東京都港区港南2-7-1 東京ポートシティ竹芝オフィスタワー
- **营业时间**: 平日 9:00-18:00

---

*本项目展示了现代化的物流企业网站开发实践，结合了优秀的用户体验设计和丰富的交互功能。*