window.__ModuleLoader__.load({
  id: 'dsh-theme-controls',
  factory: (require) => {
    const React = require('react');
    const { jsx, jsxs } = require('react/jsx-runtime');
    const KEY = 'dsh-theme-controls:v1';
    const DEFAULTS = { background: '', fit: 'cover', opacity: 0.18, blur: 0, uiFont: '', uiSize: 14, contentFont: '', contentSize: 16, codeFont: '' };
    const FONTS = [
      ['Default', ''],
      ['System sans-serif', "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif"],
      ['Source Han Sans', "'Noto Sans SC', 'Source Han Sans SC', 'Microsoft YaHei', sans-serif"],
      ['Source Han Serif', "'Noto Serif SC', 'Source Han Serif SC', SimSun, serif"],
      ['LXGW WenKai', "'LXGW WenKai', 'Noto Serif SC', serif"],
      ['Monospace', "'JetBrains Mono', 'Cascadia Code', Consolas, monospace"]
    ];
    const FITS = new Set(['cover', 'contain', 'stretch', 'tile']);
    const FONT_VALUES = new Set(FONTS.map(([, value]) => value));
    const MARKDOWN_FONTS = ['base', 'base-italic', 'base-strong', 'base-strong-italic', 'small', 'small-italic', 'small-strong', 'small-strong-italic', 'table', 'table-head', 'h1', 'h2', 'h3', 'h4'];
    const CODE_FONTS = ['code', 'code-block', 'code-block-small'];
    const originalStyles = new Map();
    const appliedStyles = new Set();
    const STYLE = '.dsh-theme-controls{display:grid;gap:12px;padding:16px 0;border-bottom:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);font-size:14px}.dsh-theme-controls__title{font-size:1em;line-height:1.6;font-weight:600}.dsh-theme-controls__hint,.dsh-theme-controls__label{color:var(--dsw-alias-label-secondary);font-size:.86em;line-height:1.5}.dsh-theme-controls__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 12px}.dsh-theme-controls__field{display:grid;gap:5px;min-width:0}.dsh-theme-controls__wide{grid-column:1/-1}.dsh-theme-controls input,.dsh-theme-controls select{box-sizing:border-box;width:100%;min-height:32px;padding:5px 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit}.dsh-theme-controls input[type=range]{min-height:24px;padding:0}.dsh-theme-controls__range{display:grid;grid-template-columns:1fr 48px;align-items:center;gap:8px}.dsh-theme-controls__actions{display:flex;justify-content:flex-end;gap:8px}.dsh-theme-controls button{min-height:30px;padding:4px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;font:inherit}.dsh-theme-controls button:hover{background:var(--dsw-alias-interactive-bg-hover)}@media(max-width:560px){.dsh-theme-controls__grid{grid-template-columns:1fr}.dsh-theme-controls__wide{grid-column:auto}}';

    function number(value, fallback, min, max) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
    }

    function background(value) {
      if (typeof value !== 'string') return '';
      const trimmed = value.trim();
      return /^(https?:|data:image\/)/i.test(trimmed) ? trimmed : '';
    }

    function normalize(value) {
      const source = value && typeof value === 'object' ? value : {};
      return {
        background: background(source.background),
        fit: FITS.has(source.fit) ? source.fit : DEFAULTS.fit,
        opacity: number(source.opacity, DEFAULTS.opacity, 0, 0.6),
        blur: number(source.blur, DEFAULTS.blur, 0, 20),
        uiFont: FONT_VALUES.has(source.uiFont) ? source.uiFont : '',
        uiSize: number(source.uiSize, DEFAULTS.uiSize, 11, 24),
        contentFont: FONT_VALUES.has(source.contentFont) ? source.contentFont : '',
        contentSize: number(source.contentSize, DEFAULTS.contentSize, 11, 32),
        codeFont: FONT_VALUES.has(source.codeFont) ? source.codeFont : ''
      };
    }

    function read() {
      try {
        return normalize(JSON.parse(localStorage.getItem(KEY) || '{}'));
      } catch (_) {
        return { ...DEFAULTS };
      }
    }

    function save(value) {
      try {
        localStorage.setItem(KEY, JSON.stringify(value));
        return true;
      } catch (_) {
        window.alert('Unable to save theme preferences in this browser.');
        return false;
      }
    }

    function prop(name, value) {
      const style = document.documentElement.style;
      if (!originalStyles.has(name)) originalStyles.set(name, { value: style.getPropertyValue(name), priority: style.getPropertyPriority(name) });
      if (value) style.setProperty(name, value);
      else style.removeProperty(name);
    }

    function owned(name, value) {
      if (!value && !appliedStyles.has(name)) return;
      appliedStyles.add(name);
      prop(name, value);
    }

    function restore() {
      const style = document.documentElement.style;
      for (const [name, original] of originalStyles) {
        if (original.value) style.setProperty(name, original.value, original.priority);
        else style.removeProperty(name);
      }
      originalStyles.clear();
      appliedStyles.clear();
    }

    function apply(value) {
      owned('--dsw-font-family', value.uiFont);
      owned('--ds-font-family-code', value.codeFont);
      owned('zoom', value.uiSize !== DEFAULTS.uiSize ? `${value.uiSize / DEFAULTS.uiSize}` : '');
      for (const name of MARKDOWN_FONTS) {
        owned(`--dsw-font-markdown-${name}-font-family`, value.contentFont);
        owned(`--dsw-font-markdown-${name}-font-size`, value.contentFont ? `${value.contentSize}px` : '');
      }
      for (const name of CODE_FONTS) {
        owned(`--dsw-font-markdown-${name}-font-family`, value.codeFont);
        owned(`--dsw-font-markdown-${name}-font-size`, value.codeFont ? `${Math.max(11, value.contentSize - 1)}px` : '');
      }
      if (!document.body) return;
      let backdrop = document.getElementById('dsh-theme-controls-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'dsh-theme-controls-backdrop';
        document.body.prepend(backdrop);
      }
      if (!value.background) {
        backdrop.style.display = 'none';
        return;
      }
      backdrop.style.cssText = `position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:url(${JSON.stringify(value.background)});background-size:${value.fit === 'stretch' ? '100% 100%' : value.fit};background-position:center;background-repeat:${value.fit === 'tile' ? 'repeat' : 'no-repeat'};opacity:${value.opacity};filter:blur(${value.blur}px);transform:scale(1.02)`;
    }

    function styles() {
      if (document.querySelector('style[data-dsh-theme-controls]')) return;
      const element = document.createElement('style');
      element.dataset.dshThemeControls = 'true';
      element.textContent = STYLE;
      document.head.appendChild(element);
    }

    function FontOptions() {
      return FONTS.map(([label, value]) => jsx('option', { value, children: label }, label));
    }

    function SelectField({ label, value, onChange, children }) {
      return jsx('label', { className: 'dsh-theme-controls__field', children: [jsx('span', { className: 'dsh-theme-controls__label', children: label }), jsx('select', { value, onChange: (event) => onChange(event.target.value), children })] });
    }

    function RangeField({ label, min, max, step, value, output, onChange }) {
      return jsx('label', { className: 'dsh-theme-controls__field', children: [jsx('span', { className: 'dsh-theme-controls__label', children: label }), jsxs('div', { className: 'dsh-theme-controls__range', children: [jsx('input', { type: 'range', min, max, step, value, onChange: (event) => onChange(Number(event.target.value)) }), jsx('output', { children: output })] })] });
    }

    function Panel() {
      const [value, setValue] = React.useState(read);
      const update = (key, next) => {
        const updated = normalize({ ...value, [key]: next });
        if (!save(updated)) return;
        setValue(updated);
        apply(updated);
      };
      React.useEffect(() => {
        styles();
        apply(value);
      }, []);
      const chooseImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg,image/webp,image/gif';
        input.onchange = () => {
          const file = input.files && input.files[0];
          if (!file) return;
          if (file.size > 4 * 1024 * 1024) return window.alert('Image files must be 4 MB or smaller.');
          const reader = new FileReader();
          reader.onload = () => update('background', String(reader.result));
          reader.readAsDataURL(file);
        };
        input.click();
      };
      const reset = () => {
        localStorage.removeItem(KEY);
        restore();
        document.getElementById('dsh-theme-controls-backdrop')?.remove();
        setValue({ ...DEFAULTS });
      };
      return jsxs('section', { className: 'dsh-theme-controls', children: [
        jsx('div', { className: 'dsh-theme-controls__title', children: 'Theme and fonts' }),
        jsx('div', { className: 'dsh-theme-controls__hint', children: 'Preferences stay in this browser and are never sent to a model.' }),
        jsxs('div', { className: 'dsh-theme-controls__grid', children: [
          jsx('label', { className: 'dsh-theme-controls__field dsh-theme-controls__wide', children: [jsx('span', { className: 'dsh-theme-controls__label', children: 'Background image URL' }), jsx('input', { value: value.background, placeholder: 'https://... or data:image/...', onChange: (event) => update('background', event.target.value) })] }),
          jsx(SelectField, { label: 'Background fit', value: value.fit, onChange: (next) => update('fit', next), children: ['cover', 'contain', 'stretch', 'tile'].map((item) => jsx('option', { value: item, children: item }, item)) }),
          jsx(RangeField, { label: 'Background opacity', min: '0', max: '0.6', step: '0.01', value: value.opacity, output: `${Math.round(value.opacity * 100)}%`, onChange: (next) => update('opacity', next) }),
          jsx(RangeField, { label: 'Background blur', min: '0', max: '20', step: '1', value: value.blur, output: `${value.blur}px`, onChange: (next) => update('blur', next) }),
          jsx(SelectField, { label: 'UI font', value: value.uiFont, onChange: (next) => update('uiFont', next), children: jsx(FontOptions, {}) }),
          jsx(SelectField, { label: 'Content font', value: value.contentFont, onChange: (next) => update('contentFont', next), children: jsx(FontOptions, {}) }),
          jsx(SelectField, { label: 'Code font', value: value.codeFont, onChange: (next) => update('codeFont', next), children: jsx(FontOptions, {}) }),
          jsx('label', { className: 'dsh-theme-controls__field', children: [jsx('span', { className: 'dsh-theme-controls__label', children: 'UI scale' }), jsx('input', { type: 'number', min: '11', max: '24', value: value.uiSize, onChange: (event) => update('uiSize', event.target.value) })] }),
          jsx('label', { className: 'dsh-theme-controls__field', children: [jsx('span', { className: 'dsh-theme-controls__label', children: 'Content font size' }), jsx('input', { type: 'number', min: '11', max: '32', value: value.contentSize, onChange: (event) => update('contentSize', event.target.value) })] })
        ] }),
        jsxs('div', { className: 'dsh-theme-controls__actions', children: [jsx('button', { type: 'button', onClick: chooseImage, children: 'Choose image' }), jsx('button', { type: 'button', onClick: reset, children: 'Reset' })] })
      ] });
    }

    function applyPlugin(ctx) {
      styles();
      apply(read());
      ctx.slots.inject('settings.general.item', () => ctx.slots.register({ name: 'settings.general.item', id: 'dsh-theme-controls', order: 20 }, Panel));
    }

    return { apply: applyPlugin, inject: ['slots'] };
  }
});
