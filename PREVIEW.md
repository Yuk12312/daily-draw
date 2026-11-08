# 每日一抽 · 帳號登入（本地預覽）

本地預覽用電郵＋密碼帳號。**未 push、未改正式站。**

## Firebase 你要開嘅嘢

共用像素 RPG 同一個 Firebase 專案 `pixel-adventure-rpg`。

1. Firebase Console → **Authentication** → Sign-in method → 啟用 **Email/Password**（未開會見到「電郵／密碼登入未開通」）。
2. Authentication → **Settings → Authorized domains** 加：
   - `localhost`
   - `yuk12312.github.io`（上線後要）
3. Firestore 集合：`dailyDrawUsers/{uid}`（再開次數 `luck`、今日摘要 `readingMeta`）。規則要允許登入用戶讀寫自己嘅 doc；訪客繼續只用 localStorage。
4. 預覽唔強制電郵驗證。

## 本地試

```bash
cd /workspace/daily-draw
python3 -m http.server 8766 --bind 0.0.0.0
```

開：`http://127.0.0.1:8766/`

1. 撳「登入／註冊」→ 註冊電郵＋密碼（≥6）
2. 登入後頂欄顯示電郵；打賞再開次數會寫入帳號
3. 登出後本機進度仍在；再開仍可用 localStorage
4. 訪客打賞唔強制登入，會提示「登入後再開次數可跟住帳號」

## API key Website restrictions（本機常見紅字 Error）

若註冊／登入只顯示紅色「Error」，多數係 Browser API key 封鎖咗 `127.0.0.1` referrer：

1. 開 [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → Credentials**
2. 揀 Firebase／網頁用嘅 **Browser key**（同 `firebase-config.js` 入面 `apiKey` 對應嗰把）
3. **Application restrictions → HTTP referrers (web sites)** 加入：
   - `http://127.0.0.1:8766/*`
   - `http://localhost:8766/*`
   - `https://yuk12312.github.io/*`（正式站）
4. 儲存後等一兩分鐘，再刷新預覽重試註冊

亦可喺瀏覽器 **DevTools → Network** 搵 `identitytoolkit` 請求：若 403 且 body 有 `API_KEY_HTTP_REFERRER_BLOCKED`／`Requests from referer … are blocked`，就係呢個問題。頁面而家會顯示廣東話提示，唔再淨係「Error」。

同時確認 Firebase Console → Authentication → **Authorized domains** 有 `localhost`（同正式域名）。

## 風險

- Email/Password provider 未開 → 註冊／登入失敗
- 網域未授權 → `unauthorized-domain`
- **API key HTTP referrer 未加本機網址** → Network 403 `API_KEY_HTTP_REFERRER_BLOCKED`，介面以前只顯示「Error」
- Firestore rules 未放行 `dailyDrawUsers` → 同步失敗（本機再開仍可用）
- 榮譽制打賞仍然驗唔到真付款；未接 Stripe

## 文案

用「打賞支持 · 娛樂再開」，**唔用「改運」**。

## 本輪預覽改動

已移除「抽完未完」整段（細事 checklist、今日感受筆記）。保留分享／下載、打賞支持再開、近期歷史、電郵登入。**未 push。**


## 關鍵字對題（本機預覽）

免費本地關鍵字／主題對齊，**唔使 AI、唔使付費 API**。問旅行／保險／錢／打工／姻緣等會收窄去相關牌；**古怪／無關鍵字命中**就退回成個一般牌庫（仍避開近幾次）。食嘢主題／問句仍走 FOOD 牌庫。

**未 push、未改正式站。** 等 Yuk 確認先考慮上線。


## 免費額 AI（本機預覽）

接 Cloudflare Worker（Workers AI）做貼題粵語結果卡；**key 唔放前端**。

- Endpoint：`POST https://daily-draw-ai.yuk-daily-draw.workers.dev/`
- Body：`{ "question": "...", "theme": "..." }`
- 何時試 AI：用戶打咗自訂「今日一念」（`question !== DEFAULT_QUESTION`）。主題掣（今日氣場／打工／姻緣心情／今日食咩）**只用固定牌庫，唔打 AI**
- 空白一念 → 唔打 AI，直接關鍵字／牌庫（跟所選主題）
- 本機每日限 **5** 次 AI（`localStorage`，跟裝置、HK 日期 `todayKey()`）
- 逾時約 9 秒／HTTP 失敗／免費額盡／超出本機限次 → **退回牌庫**（食嘢仍走 FOOD 牌庫），toast：`今日一念 AI 額用完，改用牌庫對題`
- AI 結果 `id` 以 `ai-` 開頭；版面仍走 `fillResult`
- Cloudflare 免費層約 10,000 Neurons／日；用盡後 API 失敗同樣退回關鍵字

**未 push、未改正式站。** 等 Yuk 確認先考慮上線。

本地試：

```bash
cd /workspace/daily-draw
python3 -m http.server 8766 --bind 0.0.0.0
```

開：`http://127.0.0.1:8766/`（改完 `app.js` 記得 hard refresh）

## AI 剩餘次數顯示＋Admin 無限（本機預覽）

首頁「開始今日一抽」掣下面會顯示：

- 一般：`今日一念 AI 仲有 X／5 次`
- 用完：`今日一念 AI 額已用完 · 改用牌庫`
- Admin：`Admin · AI 無限`

Admin 唔受本機每日 5 次限制（有自訂一念先會打 Worker；Worker 失敗一樣退回牌庫）。主題掣唔會因為 Admin 而改走 AI。

### 點樣開 Admin

1. **登入 allowlist 電郵**（Firebase）：而家有 `timchoi12@gmail.com`。要加多人，改 `app.js` 入面：
   ```js
   const ADMIN_EMAILS = [
     "timchoi12@gmail.com",
     "someone@example.com"
   ];
   ```
2. **訪客本機旗標**（唔使 Firebase）：瀏覽器 Console 執行
   ```js
   localStorage.setItem('daily-draw-admin-v1','1')
   ```
   之後刷新頁面；關返：
   ```js
   localStorage.removeItem('daily-draw-admin-v1')
   ```

**未 push、未改正式站。**

