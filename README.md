# 每日一抽 · MVP 預覽

粵語輕量「每日一抽」占卜網頁原型。無後端、無註冊；用瀏覽器 `localStorage` 做「今日已抽」鎖定。

## 點樣開預覽

**最簡單：** 用檔案總管雙擊打開：

`/workspace/daily-draw/index.html`

或喺終端機：

```bash
# macOS
open /workspace/daily-draw/index.html

# Linux（有 xdg-open）
xdg-open /workspace/daily-draw/index.html

# 或者起一個本地靜態 server（可選）
cd /workspace/daily-draw && python3 -m http.server 8765
# 然後瀏覽器開 http://127.0.0.1:8765
```

離線都可以用；若無網絡，會退回系統中文字體（仍然可讀）。有網絡時會載入 Noto 字體令畫面更精緻。

## 檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | 頁面結構 |
| `styles.css` | 夜間神秘風樣式（手機優先） |
| `app.js` | 抽牌動畫、原創解讀、食咩牌庫、關鍵字對題、免費 Workers AI（每裝置每日 5 次，失敗或用完就退回關鍵字）、分享同下載 |

## MVP 行為

1. 首屏 hook →「開始今日一抽」
2. 撳牌背／掣 → 簡易洗牌動畫 → 結果卡（標題／短解讀／今日提示）
3. 可「複製結果文案」方便分享
4. 同一日再開會見到「今日已經抽過」；可睇返當日結果
5. 頁腳同結果卡均標明「僅供娛樂」

清除今日鎖定：瀏覽器開發者工具 → Application → Local Storage → 刪除 `daily-draw-v1`。

## 注意

- 內容僅供娛樂，非專業諮詢。
- 解讀為原創輕量文案，並非任何版權卡牌體系。
- 自訂「今日一念」，或揀咗打工／姻緣心情／今日食咩，會先問免費 Cloudflare Workers AI（每部裝置每日 5 次）。預設「今日氣場」加空白一念、逾時、或免費額用完，就用本地關鍵字對題。公開頁由 GitHub Pages（`main` / `/`）提供，見下方。

## GitHub Pages

公開網站：<https://yuk12312.github.io/daily-draw/>

由 `main` 分支根目錄（`/`）嘅靜態檔案提供：`index.html`、`styles.css`、`app.js`。

內容僅供娛樂，非專業諮詢；解讀為原創輕量文案。
