# DSH Theme Controls

DSH Web plugin for setting a background image and adjusting UI, content, and code typography.

中文文档请见 [README.zh-CN.md](README.zhhttps://github.com/ZZzzzPink/Theme-Controls.git-CN.md)。

## Features

- Background image from an HTTPS/HTTP URL or a local PNG, JPEG, WebP, or GIF file.
- Background fit, opacity, and blur controls.
- UI font and font-size controls.
- Separate Markdown content and code font controls.
- Settings are saved only in the active browser profile. The plugin does not access DSH sessions, conversation history, models, or credentials.

## Compatibility

- DSH Web `0.1.0-rc.6` was used for validation.
- Requires the DSH settings slot `settings.general.item`.
- The plugin is client-only and is not intended for headless DSH usage.

## Installation

From a local checkout:

```powershell
dsh plugin add -w --profile web .
```

For a GitHub repository with a `main` branch, use the codeload URL if GitHub Git transport is unavailable:

```powershell
dsh plugin add -w --profile web "https://codeload.github.com/<owner>/<repository>/tar.gz/refs/heads/main"
```

Restart DSH Web after installation.

## Usage

Open **Settings -> General** and select **Theme and fonts**. Changes apply immediately. Use **Reset** to remove this plugin's browser-local preferences.

## Privacy and Limits

- Local images are stored as browser-local `data:image/...` values and must be 4 MB or smaller.
- Background URL input accepts only `http:`, `https:`, and `data:image/...` values.
- Font selections apply only while the plugin is loaded in the current browser profile.

## Development Checks

```powershell
node --check lib/index.js
node --check lib/client.js
npm pack --dry-run
```

## License

[MIT](LICENSE)
