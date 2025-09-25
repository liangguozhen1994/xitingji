# 溪亭记摄影网站

一个现代化的摄影作品展示网站，支持图片上传和分类浏览功能。

## 功能特性

- 🖼️ 响应式图片展示画廊
- 📱 移动端适配设计
- ⬆️ 图片上传功能（支持拖放）
- 🏷️ 图片分类筛选
- 🎨 现代化UI设计
- 🌙 优雅的动画效果

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **构建工具**: Vite
- **部署平台**: Vercel
- **图片处理**: Serverless Functions

## 快速开始

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/liangguozhen1994/xitingji.git
cd xitingji
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 访问 http://localhost:3000

### 部署到Vercel

#### 方法一：通过GitHub部署（推荐）

1. Fork 此仓库到您的GitHub账号
2. 访问 [Vercel](https://vercel.com)
3. 使用GitHub账号登录
4. 点击 "Import Project"
5. 选择您fork的仓库
6. 点击 "Deploy"

#### 方法二：通过Vercel CLI部署

1. 安装Vercel CLI
```bash
npm i -g vercel
```

2. 在项目目录中部署
```bash
vercel
```

3. 按照提示完成部署

## 项目结构

```
xitingji/
├── src/
│   ├── style.css          # 样式文件
│   └── main.js           # 主JavaScript文件
├── api/
│   └── upload.js         # 图片上传API
├── images/               # 图片资源目录
├── index.html           # 主页面
├── package.json         # 项目配置
├── vercel.json          # Vercel配置
└── README.md           # 项目说明
```

## 使用说明

### 图片上传

1. 点击导航栏的"上传作品"
2. 拖放图片到上传区域，或点击选择文件
3. 支持多文件同时上传（最大10MB/文件）
4. 上传完成后图片将显示在作品集中

### 图片浏览

1. 在"作品集"页面浏览所有图片
2. 使用分类筛选按钮查看特定类型的作品
3. 点击图片可查看大图预览
4. 使用键盘ESC键或点击外部关闭预览

### 自定义配置

#### 修改联系方式

编辑 `index.html` 文件中的联系信息部分：
```html
<p><i class="fas fa-phone"></i> 手机：18038952112</p>
<p><i class="fas fa-envelope"></i> 邮箱：297220226@qq.com</p>
```

#### 添加默认图片

在 `src/main.js` 文件的 `loadGalleryData` 函数中添加图片数据：
```javascript
{
    id: 7,
    src: '图片URL',
    title: '图片标题',
    category: 'nature', // nature, portrait, street, city
    description: '图片描述'
}
```

## 环境变量

如需配置环境变量，在Vercel项目设置中添加：

- `NODE_ENV`: 环境类型（production/development）

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 联系方式

- 手机：18038952112
- 邮箱：297220226@qq.com
- GitHub: [liangguozhen1994/xitingji](https://github.com/liangguozhen1994/xitingji)

## 许可证

MIT License

## 更新日志

### v1.0.0 (2024-09-25)
- 初始版本发布
- 基础图片展示功能
- 图片上传功能
- 响应式设计