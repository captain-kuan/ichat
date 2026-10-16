# ichat 项目简介

## 一、项目概述
这是一个仿微信 Web 端聊天系统的项目，采用 monorepo 结构，前端和后端分离，整体上是一个用于实时聊天、消息推送与用户协作的 Web 应用。

## 二、技术栈
- 前端：Vue 3 + Vite
- 后端：NestJS
- 实时通信：Socket.IO
- 数据层：TypeORM / Mongoose
- 数据库：MySQL / MongoDB（根据后端模块配置）
- 缓存：Redis
- 认证：JWT / Passport
- 包管理：pnpm workspace

## 三、项目结构
- `apps/bf`：后端服务，提供接口、鉴权、消息处理和 Socket 事件
- `apps/web`：前端应用，负责聊天页面与交互体验
- `packages/components`：通用组件
- `packages/models`：数据模型
- `packages/types`：类型定义
- `packages/utils`：工具函数

## 四、功能定位
该项目的核心目标是模拟微信 Web 端聊天的能力，典型功能包括：
- 用户登录与鉴权
- 实时消息收发
- 会话列表
- 聊天记录管理
- 音频/媒体处理支持
- WebSocket 推送

## 五、启动方式
安装依赖：

```bash
pnpm install
```

启动项目：

```bash
npm run start
```

或直接运行：

```bash
pnpm run start
```

## 六、说明
本项目属于典型的全栈前后端分离聊天系统，适合用于学习：
- NestJS 后端开发
- Vue 3 前端开发
- WebSocket 实时通信
- pnpm monorepo 工程组织方式
- 聊天应用业务建模
