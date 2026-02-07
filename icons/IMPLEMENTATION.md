# Oh. Logo — Implementation Guide for johnnyoh.xyz

## Favicon Files

Copy these files to your Hugo `static/` directory:

```
static/
├── favicon.svg          # Vector, used by modern browsers
├── favicon.ico          # Fallback for older browsers (16+32px)
├── favicon-32.png       # 32px PNG
├── favicon-16.png       # 16px PNG
├── apple-touch-icon.png # 180px for iOS home screen
└── icon-512.png         # 512px for Android/PWA/OG
```

## HTML Head (add to Hugo's `<head>` partial)

```html
<!-- Favicon -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## Site Header Logo (with blink animation)

### HTML (Hugo partial)
```html
<a href="/" class="site-logo" aria-label="Home">
  <span class="logo-mark">
    <span class="logo-text">Oh</span>
    <span class="logo-dot"></span>
  </span>
  <span class="logo-name">Jonathan Oh</span>
</a>
```

### CSS
```css
/* Oh. Logo */
.site-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-mark {
  width: 36px;
  height: 36px;
  background: #0a0a0a;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 16px;
  color: #ffffff;
  line-height: 1;
}

.logo-dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #2563eb;
  border-radius: 1px;
  margin-left: 1px;
  margin-bottom: 2px;
  vertical-align: baseline;
  animation: cursor-blink 1.1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.logo-name {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 15px;
  color: #ffffff;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .logo-dot {
    animation: none;
  }
}
```

## Design Spec

| Property       | Value                          |
|---------------|--------------------------------|
| Typeface      | JetBrains Mono, ExtraBold (800)|
| Text          | "Oh" (capital O, lowercase h)  |
| Dot color     | #2563eb                        |
| Background    | #0a0a0a                        |
| Corner radius | ~18% of icon size              |
| Blink speed   | 1.1s, step-end, infinite       |
| Blink where   | Site header + hero only        |
| Static where  | Favicon, social, print, OG     |
