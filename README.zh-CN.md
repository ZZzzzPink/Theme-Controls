# DSH Theme Controls

[![DSH 平台](https://img.shields.io/badge/DSH-Web-1677ff)](https://github.com/deepseek-ai/deepseek-harness)
[![许可证](https://img.shields.io/github/license/ZZzzzPink/Theme-Controls)](LICENSE)
[![Issues](https://img.shields.io/github/issues/ZZzzzPink/Theme-Controls)](https://github.com/ZZzzzPink/Theme-Controls/issues)

这是一个用于 DSH Web 的客户端主题与字体插件。你可以在 **设置 -> 通用设置** 中修改背景图片、界面缩放、界面字体、Markdown 正文字体和代码字体。

英文文档请见 [README.md](README.md)。

## 功能概览

- 支持 HTTP/HTTPS 图片地址，或选择本地 PNG、JPEG、WebP、GIF 文件作为背景图。
- 支持 `cover`、`contain`、`stretch`、`tile` 四种背景适配方式。
- 支持背景透明度和模糊度。
- 支持界面字体和全局界面缩放。
- 支持独立设置 Markdown 正文字体和字号。
- 支持独立设置代码字体。
- 配置保存在当前浏览器，并提供重置按钮。

## 兼容性

- 目标平台：DSH Web。
- 已基于 DSH `0.1.0-rc.6` 验证。
- 依赖 DSH 的 `settings.general.item` 设置项插槽。
- 仅支持客户端 Web 环境，不支持 headless 和桌面专用 host。

## 安装

### 推荐：从 GitHub 安装

直接安装到 DSH Web 的 `web` profile：

```powershell
dsh plugin add -w --profile web github:ZZzzzPink/Theme-Controls
```

安装后重启 DSH Web。

### 网络备用方式：源码压缩包

如果正常的 GitHub 安装因 SSH 或 Git 传输错误失败，可以通过源码压缩包安装 `main` 分支：

```powershell
dsh plugin add -w --profile web "https://codeload.github.com/ZZzzzPink/Theme-Controls/tar.gz/refs/heads/main"
```

## 使用

1. 在 DSH Web 中打开 **设置 -> 通用设置**。
2. 找到 **Theme and fonts** 设置项。
3. 修改配置，支持的改动会立即生效。
4. 点击 **Choose image** 选择本地背景图。
5. 点击 **Reset** 清除插件保存的配置，并恢复插件接管前记录的内联样式。

界面缩放以 `14` 为默认基准值。高于或低于 `14` 的值会通过根节点 `zoom` 属性缩放整个 DSH Web 界面。

## 存储与隐私

- 配置保存在当前浏览器 profile 的 `dsh-theme-controls:v1` 项中。
- 本地图片会以 `data:image/...` 数据保存到浏览器存储。
- 本地图片不能超过 4 MB；Base64 编码会增加存储占用，浏览器还必须有足够的存储空间。
- 背景地址只接受 `http:`、`https:` 和 `data:image/...`。
- 插件不会访问 DSH 会话、历史记录、模型、凭据或网络 API。

## 开发检查

在项目目录中执行：

```powershell
node --check lib/index.js
node --check lib/client.js
npm pack --dry-run
git diff --check
```

发布包包含 `cordis.patch.yml`、中英文 README、客户端文件和 MIT 许可证。

## 许可证

本项目使用 [MIT License](LICENSE) 开源。
