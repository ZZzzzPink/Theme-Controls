# DSH Theme Controls

用于 DSH Web 的主题与字体插件，可设置背景图片，并调整界面、正文和代码字体。

English documentation: [README.md](README.md)。

## 功能

- 支持使用 HTTP/HTTPS 图片地址，或选择本地 PNG、JPEG、WebP、GIF 作为背景图。
- 支持背景适配、透明度和模糊度。
- 支持设置全局界面字体和字号。
- 支持分别设置 Markdown 正文字体/字号和代码字体。
- 配置仅保存在当前浏览器。插件不访问 DSH 会话、历史记录、模型或凭据。

## 兼容性

- 已基于 DSH Web `0.1.0-rc.6` 验证。
- 依赖 DSH 提供的 `settings.general.item` 设置项插槽。
- 仅支持 DSH Web，不适用于 headless 模式。

## 安装

在插件本地目录执行：

```powershell
dsh plugin add -w --profile web .
```

若从 GitHub 安装且本机无法正常使用 GitHub Git 传输，可使用 codeload 地址：

```powershell
dsh plugin add -w --profile web "https://codeload.github.com/<用户名或组织>/<仓库>/tar.gz/refs/heads/main"
```

安装后重启 DSH Web。

## 使用位置

打开 **设置 -> 通用设置**，即可看到 **Theme and fonts** 设置项。修改后立即生效；点击 **Reset** 可清除该插件在当前浏览器保存的配置。

## 隐私与限制

- 本地背景图会以浏览器本地的 `data:image/...` 数据保存，文件不能超过 4 MB。
- 背景地址只允许 `http:`、`https:` 和 `data:image/...`。
- 字体设置仅在当前浏览器 profile 且插件已加载时生效。

## 开发检查

```powershell
node --check lib/index.js
node --check lib/client.js
npm pack --dry-run
```

## 许可证

[MIT](LICENSE)
