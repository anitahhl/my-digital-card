# 🚀 Vercel 部署指南（推薦）

## 為什麼選擇 Vercel？
- ✅ Next.js 的原生支援（Vercel 就是 Next.js 的開發公司）
- ✅ 所有功能都能完美運行
- ✅ 自動 HTTPS 和 CDN
- ✅ 推送到 GitHub 就自動部署
- ✅ 比 GitHub Pages 更快更穩定

## 🎯 一鍵部署

### 方法 1: 網頁部署（最簡單）
1. 前往 [vercel.com](https://vercel.com)
2. 點擊 "Sign up" 並使用 GitHub 帳號登入
3. 點擊 "New Project"
4. 選擇 `anitahhl/my-digital-card` repository
5. 點擊 "Deploy" - 完成！

### 方法 2: CLI 部署
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel

# 設置為生產環境
vercel --prod
```

## 🌐 部署後
- 您會得到一個 `.vercel.app` 的網址
- 可以綁定自定義域名
- 每次推送到 GitHub 都會自動重新部署

## 📊 比較

| 功能 | GitHub Pages | Vercel |
|------|--------------|--------|
| Next.js 支援 | 靜態導出 | 完整支援 |
| 部署速度 | 1-10 分鐘 | 30-60 秒 |
| 自動部署 | 需手動 | 自動 |
| 自定義域名 | 有限制 | 完全支援 |
| HTTPS | 支援 | 支援 |
| 穩定性 | 好 | 極佳 |
