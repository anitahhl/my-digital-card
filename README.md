# myPDA - Digital Business Card

一個現代化的數位名片網站，使用 Next.js、Framer Motion 和 GSAP 構建。

## 功能特色

- 🎨 精美的動畫效果（GSAP + Framer Motion）
- 📱 響應式設計，支援手機和桌面
- 🌊 3D 粒子波背景效果
- ✨ 流暢的頁面轉場動畫
- 📧 聯絡資訊展示
- 📱 支援 vCard 下載
- 🔗 社群媒體連結

## 技術棧

- **框架**: Next.js 14
- **動畫**: Framer Motion, GSAP
- **3D**: Three.js
- **樣式**: Tailwind CSS
- **語言**: TypeScript

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 構建生產版本
npm run build
```

## 部署到 GitHub Pages

```bash
# 構建並部署
npm run deploy
```

## 頁面結構

- `/` - 主頁面（Hero + Showcase）
- `/card000` - 數位名片頁面

## 自定義

1. 修改 `src/app/card000/page.tsx` 中的個人資訊
2. 更換 `public/images/default.png` 頭像圖片
3. 調整 `src/components/IntroOverlay.tsx` 中的動畫路徑

## 授權

MIT License