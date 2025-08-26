# 部署指南

## 🚀 快速部署到 GitHub Pages

### 步驟 1: 創建 GitHub Repository
1. 前往 [GitHub.com](https://github.com)
2. 點擊右上角的 "+" → "New repository"
3. Repository 名稱: `mypda-digital-card` (或您喜歡的名稱)
4. 設置為 **Public** (GitHub Pages 免費版需要)
5. **不要** 勾選 "Add a README file"
6. 點擊 "Create repository"

### 步驟 2: 連接本地 Repository
在終端機中執行以下命令 (將 `YOUR_USERNAME` 替換為您的 GitHub 用戶名，`YOUR_REPO_NAME` 替換為您的 repository 名稱):

```bash
# 添加遠程 repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步驟 3: 部署到 GitHub Pages
```bash
# 構建並部署
npm run deploy
```

### 步驟 4: 啟用 GitHub Pages (如果需要)
1. 前往您的 GitHub repository
2. 點擊 "Settings" 標籤
3. 向下滾動到 "Pages" 選項
4. 在 "Source" 下選擇 "Deploy from a branch"
5. 選擇 "gh-pages" 分支和 "/ (root)" 資料夾
6. 點擊 "Save"

### 🌐 您的網站將會在以下網址可用:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

## 📝 更新網站
每次您想更新網站時:
```bash
# 提交更改
git add .
git commit -m "Update website"
git push

# 重新部署
npm run deploy
```

## ⚡ 替代部署選項

### Vercel (推薦)
1. 前往 [vercel.com](https://vercel.com)
2. 使用 GitHub 帳號登入
3. 點擊 "New Project"
4. 選擇您的 repository
5. 點擊 "Deploy" - 就這麼簡單！

### Netlify
1. 前往 [netlify.com](https://netlify.com)
2. 點擊 "Add new site" → "Import an existing project"
3. 選擇 GitHub 並授權
4. 選擇您的 repository
5. 點擊 "Deploy site"

## 🔧 故障排除

如果遇到部署問題:
1. 確保所有更改都已提交: `git status`
2. 檢查構建是否成功: `npm run build`
3. 檢查 gh-pages 分支是否存在: `git branch -a`
