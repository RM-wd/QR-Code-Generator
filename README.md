# 网页二维码 Chrome 扩展（QR Code Generator）

一个轻量级的 Chrome 扩展，为当前网页生成带站点图标的二维码，方便在手机或其他设备快速打开页面。

## 功能特性
- 一键生成当前页面二维码，尺寸为 `256x256`
- 在二维码中心叠加站点 `favicon`
- 右下角显示圆形站点图标按钮，点击可显示/隐藏二维码
- 纯前端实现，无需构建或安装依赖

## 目录结构
```
网页二维码/
├─ manifest.json     # 扩展清单（Manifest V2）
├─ popup.html        # 扩展弹窗页面
├─ popup.js          # 弹窗逻辑：向活动标签页注入脚本
├─ styles.css        # 弹窗样式
└─ content.js        # 内容脚本：在网页右下角生成二维码
```

## 安装与使用
- 打开 Chrome，访问 `chrome://extensions`
- 开启右上角的 `开发者模式`
- 点击 `加载已解压的扩展程序`，选择本项目文件夹
- 在工具栏点击扩展图标，弹窗中点击 `Generate QR Code`
- 页面右下角会出现站点图标按钮；点击按钮显示/隐藏二维码

## 工作机制
- 扩展清单配置
  - `manifest.json:2` 使用 `manifest_version: 2`
  - `manifest.json:10-12` 配置弹窗为 `popup.html`
  - `manifest.json:13-18` 在所有页面注入 `content.js`
  - `manifest.json:6-9` 权限包含 `activeTab` 与外部主机 `https://api.qrserver.com/`
- 弹窗交互
  - `popup.html:10` 提供生成按钮
  - `popup.js:1-4` 查询活动标签页并执行 `content.js`
- 页面二维码生成
  - `content.js:42-61` 构造二维码容器与中心图标，绑定点击切换
  - `content.js:45` 设置二维码尺寸 `qrSize = 256`
  - `content.js:46` 通过 `https://api.qrserver.com/v1/create-qr-code/` 生成图片
  - `content.js:63-76` 控制容器显示/隐藏（右下角站点图标与二维码区域均可切换）
  - `content.js:79-83` 读取页面 `url/title/favicon` 并初始化生成

## 权限说明
- `activeTab`: 允许扩展与当前活动标签页交互
- `https://api.qrserver.com/`: 外部主机权限，用于生成二维码图片

## 配置与自定义
- 修改二维码尺寸：编辑 `content.js:45` 的 `qrSize`
- 修改显示位置与样式：调整 `createLogoButton` 与 `createQRCodeContainer` 内的内联样式（如 `bottom/right/z-index` 等）
- 站点图标来源：`content.js:81-83` 会优先读取页面 `link[rel*="icon"]`，否则回退到 `/favicon.ico`

## 常见问题
- 多次点击弹窗可能重复注入脚本，导致页面出现多个按钮/容器。若需避免，可在注入前判断是否已存在 `#qr-code-logo-button`/`#qr-code-container` 并复用。
- 本项目使用 Manifest V2。若需在新版 Chrome 长期使用，建议迁移到 Manifest V3（调整 `manifest.json`、脚本注入方式等）。

