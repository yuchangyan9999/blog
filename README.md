# 个人博客

这是一个使用 Eleventy (11ty) 构建的个人博客网站。

## 功能特点

- 响应式设计，适配各种设备
- 博客文章支持 Markdown 格式
- 文章归档页面
- 标签分类
- 简洁美观的界面

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

这将启动一个本地开发服务器，通常在 http://localhost:8080 访问。

### 构建网站

```bash
npm run build
```

构建后的静态文件将生成在 `_site` 目录中。

## 添加新文章

在 `src/posts` 目录下创建新的 Markdown 文件，文件开头需要包含以下 front matter：

```yaml
---
layout: post.njk
title: 文章标题
description: 文章描述
date: YYYY-MM-DD
tags: 
  - post
  - 标签1
  - 标签2
---

文章内容...
```

## 部署

该博客可以部署到任何支持静态网站的平台，如 Netlify、Vercel、GitHub Pages 等。

## 自定义

- 修改 `src/_includes/base.njk` 更改网站的整体布局
- 修改 `css/style.css` 自定义网站样式
- 更新 `src/about.njk` 添加你的个人信息
