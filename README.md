# DSH Theme Controls

[![DSH Platform](https://img.shields.io/badge/DSH-Web-1677ff)](https://github.com/deepseek-ai/deepseek-harness)
[![License](https://img.shields.io/github/license/ZZzzzPink/Theme-Controls)](LICENSE)
[![Issues](https://img.shields.io/github/issues/ZZzzzPink/Theme-Controls)](https://github.com/ZZzzzPink/Theme-Controls/issues)

A client-side theme and typography plugin for DSH Web. Configure a background image, interface scale, UI font, Markdown font, and code font from its own **Theme and fonts** settings page.

中文文档请见 [README.zh-CN.md](README.zh-CN.md)。

## What It Does

- Background image from an HTTP(S) URL or a local PNG, JPEG, WebP, or GIF file.
- Background fit modes: `cover`, `contain`, `stretch`, and `tile`.
- Background opacity and blur controls.
- UI font selection and interface scale control.
- Independent Markdown content font and font-size controls.
- Independent code font selection.
- Browser-local persistence with a reset action.

## Compatibility

- Target: DSH Web.
- Validated against DSH `0.1.0-rc.6`.
- Plugin version: `0.1.3`.
- Registers a top-level DSH settings section through `settings.section`.
- Client-only; headless and desktop-specific hosts are not supported.

## Install

### Recommended: GitHub

Install the plugin directly into the DSH Web profile:

```powershell
dsh plugin add -w --profile web github:ZZzzzPink/Theme-Controls
```

Restart DSH Web after installation.

### Network Fallback: Source Archive

If the normal GitHub installation fails with an SSH or Git transport error, use the `main` branch source archive instead:

```powershell
dsh plugin add -w --profile web "https://codeload.github.com/ZZzzzPink/Theme-Controls/tar.gz/refs/heads/main"
```

## Use It

1. Open **Settings** in DSH Web.
2. Open the top-level **Theme and fonts** section.
3. Change a value; supported changes apply immediately.
4. Use **Choose image** to select a local background image.
5. Use **Reset** to remove the plugin's saved preferences and restore the inline styles captured before the plugin applied its changes.

The interface scale uses `14` as its default baseline. Values above or below `14` scale the complete DSH Web interface through the root `zoom` property.

## Storage and Privacy

- Preferences are stored in the active browser profile under `dsh-theme-controls:v1`.
- Local images are stored as `data:image/...` values in browser storage.
- Local image files must be 4 MB or smaller. Base64 encoding may require additional browser storage capacity.
- Background URLs accept only `http:`, `https:`, and `data:image/...` values.
- The plugin does not access DSH sessions, conversation history, models, credentials, or network APIs.

## Development

Run the checks from the project directory:

```powershell
node --check lib/index.js
node --check lib/client.js
npm pack --dry-run
git diff --check
```

The package includes `cordis.patch.yml`, both README files, the client bundle, and the MIT license.

## License

Released under the [MIT License](LICENSE).
