(function () {
  "use strict";

  const STORAGE_KEY = "daily-draw-v1";

  /** Original light entertainment readings — not based on any copyrighted deck. */
  const READINGS = [
    {
      id: "soft-breeze",
      glyph: "🌬",
      title: "微風過隙",
      reading: "今日適合輕輕放慢半步。唔使急住證明自己，順住感覺做小事，反而會有意外驚喜。",
      nudge: "今日金句：慢慢嚟，先至快。"
    },
    {
      id: "warm-lamp",
      glyph: "🕯",
      title: "燈火微明",
      reading: "有啲悶唔代表冇進展。你而家累積緊嘅，聽日可能就會用得著。記住對自己溫柔啲。",
      nudge: "今晚留十分鐘畀自己放空。"
    },
    {
      id: "open-window",
      glyph: "🪟",
      title: "窗開一縫",
      reading: "機會可能以『偶然一句說話』出現。保持好奇，但唔使即刻應承所有事。聽完先決定。",
      nudge: "今日適合主動打招呼。"
    },
    {
      id: "steady-cup",
      glyph: "☕",
      title: "杯裡穩陣",
      reading: "今日節奏偏穩。適合處理積壓嘅雜事，清完台面會突然覺得世界闊咗一點。",
      nudge: "喝杯水，重置一下心情。"
    },
    {
      id: "spark-note",
      glyph: "✨",
      title: "一點火花",
      reading: "靈感會嚟，但好短暫。見到就記低，唔好等『完美時機』。半成品都好過空白。",
      nudge: "開備忘錄寫三個字都得。"
    },
    {
      id: "quiet-tide",
      glyph: "🌊",
      title: "潮退一刻",
      reading: "有啲事先放低反而會清楚啲。今日唔適合硬碰硬；轉個角度，路可能自己出現。",
      nudge: "卡住就散步五分鐘。"
    },
    {
      id: "kind-echo",
      glyph: "🔔",
      title: "善意回聲",
      reading: "你今日講出嚟嘅關心，可能比你想像中更重要。一句『你今日點呀』已經夠溫暖。",
      nudge: "傳個貼圖畀重要嘅人。"
    },
    {
      id: "clear-path",
      glyph: "🛤",
      title: "路標清晰",
      reading: "心裡其實有答案，只係想要多一次確認。信自己一次啦；小決定都可以練膽。",
      nudge: "今日做一個『細而爽快』嘅決定。"
    },
    {
      id: "playful-cloud",
      glyph: "☁",
      title: "雲端玩笑",
      reading: "唔好太認真對待所有小煩惱。今日適合用幽默拆解尷尬；笑完之後，事會變輕。",
      nudge: "睇吓令你開心嘅短片都得。"
    },
    {
      id: "rooted-tree",
      glyph: "🌳",
      title: "根深一步",
      reading: "穩定感嚟自日常小習慣。唔使大改造；一杯水、一個伸展、一封覆完嘅訊息，就夠。",
      nudge: "完成一件拖延已久嘅小事。"
    },
    {
      id: "silver-thread",
      glyph: "🧵",
      title: "銀線相連",
      reading: "舊朋友或者舊話題可能會翻出嚟。唔使急住重啟關係，真誠回應已經係最好態度。",
      nudge: "覆訊息前深呼吸一次。"
    },
    {
      id: "moon-pocket",
      glyph: "🌙",
      title: "口袋裡的月",
      reading: "今日適合收藏多過展示。你唔需要即刻被看見；先做好自己嗰份，光會慢慢透出嚟。",
      nudge: "今日低調做事，效果可能更好。"
    },
    {
      id: "fresh-ink",
      glyph: "🖋",
      title: "新墨未乾",
      reading: "開新頁唔等於丟低過去。帶住有用嘅經驗往前走就得；唔完美都值得開始。",
      nudge: "寫低一個『今日想試』。"
    },
    {
      id: "gentle-rain",
      glyph: "🌧",
      title: "細雨洗塵",
      reading: "情緒可能有啲起伏，唔使壓抑。畀自己空間感受，雨過之後視野會乾淨啲。",
      nudge: "今日減少刷手機半小時。"
    },
    {
      id: "bright-coin",
      glyph: "🪙",
      title: "亮亮小幣",
      reading: "小確幸會以『慳到時間／錢／心機』嘅形式出現。留意細節，會發現自己其實好會打理生活。",
      nudge: "獎勵自己一件平而開心嘅嘢。"
    },
    {
      id: "shared-umbrella",
      glyph: "☂",
      title: "共傘一刻",
      reading: "合作比單打獨鬥更順。今日適合問人借意見，或者主動幫人一把——互惠感會好強。",
      nudge: "講句『不如一齊諗』。"
    },
    {
      id: "late-bloom",
      glyph: "🌸",
      title: "遲開的花",
      reading: "進度慢唔等於失敗。有啲事需要發酵；你已經喺正確方向，只係未到開花日。",
      nudge: "對進度溫柔啲，繼續行。"
    },
    {
      id: "compass-heart",
      glyph: "🧭",
      title: "心裡指南",
      reading: "外面聲音好多，但身體同直覺會提點你。覺得累就休，覺得對就試；今日跟感覺行。",
      nudge: "問自己：邊樣令我輕鬆啲？"
    }
  ];


  const FOOD_READINGS = [
    {
      id: "food-hot-wok",
      glyph: "🔥",
      title: "鑊氣一口",
      reading: "今日適合有鑊氣、熱辣或者煎炒嘅嘢。想食咩香口就跟感覺行，唔好迫自己清淡。呢個只係娛樂提示，唔係營養或醫療建議。",
      nudge: "附近茶餐廳或者你熟悉嗰檔，已經好啱。"
    },
    {
      id: "food-warm-bowl",
      glyph: "🍜",
      title: "暖笠笠一碗",
      reading: "今日想要一碗熱嘅：湯粉麵、粥或者燉湯。慢慢食，當係停低休息，唔使研究大餐。",
      nudge: "揀暖胃、步驟少嘅一碗就得。"
    },
    {
      id: "food-fresh",
      glyph: "🥗",
      title: "清爽一口",
      reading: "今日口感偏向清爽：蒸嘢、青菜、水果或者清湯都得。身體想淡啲就聽佢，唔使勉強重口味。",
      nudge: "加碟熟菜，食得自在就好。"
    },
    {
      id: "food-neighbour",
      glyph: "🏪",
      title: "街坊味道",
      reading: "唔使搵新餐廳。附近熟食、茶記、平時那檔已經啱今日。熟口熟面，反而最順。",
      nudge: "行去你第一時間諗到嗰間。"
    },
    {
      id: "food-share",
      glyph: "🥢",
      title: "同人分享",
      reading: "今日食嘢適合一齊：叫多一味分、或者約人飲茶開餐。分享比獨食更對題。",
      nudge: "問句「今晚一齊食？」"
    },
    {
      id: "food-gut",
      glyph: "💭",
      title: "聽肚說話",
      reading: "你其實知想食咩，只係選擇困難。第一個閃過腦海嘅就係答案，唔好刷餐牌刷到肚餓加躁。",
      nudge: "唔好睇 menu 超過三分鐘。"
    },
    {
      id: "food-sweet",
      glyph: "🍰",
      title: "小小甜",
      reading: "可以獎勵自己一件甜品或者平時少食嘅小食。一次開心就得，唔使有罪惡感，亦唔係叫你日日咁。",
      nudge: "一份細的已經夠甜。"
    },
    {
      id: "food-home",
      glyph: "🍚",
      title: "家常一碟",
      reading: "簡單家常味道會更舒服：白飯、碟熟菜、或者屋企口味。唔使為咗『食咩好』而複雜化。",
      nudge: "返屋企食，或者叫平時那款都得。"
    }
  ];

  const els = {
    home: document.getElementById("view-home"),
    draw: document.getElementById("view-draw"),
    result: document.getElementById("view-result"),
    locked: document.getElementById("view-locked"),
    btnStart: document.getElementById("btn-start"),
    btnDraw: document.getElementById("btn-draw"),
    btnCopy: document.getElementById("btn-copy"),
    btnShare: document.getElementById("btn-share"),
    btnDownload: document.getElementById("btn-download"),
    btnShowToday: document.getElementById("btn-show-today"),
    deck: document.getElementById("deck"),
    drawHint: document.getElementById("draw-hint"),
    stepLabel: document.getElementById("step-label"),
    resultDate: document.getElementById("result-date"),
    resultTheme: document.getElementById("result-theme"),
    resultQuestion: document.getElementById("result-question"),
    resultGlyph: document.getElementById("result-glyph"),
    resultTitle: document.getElementById("result-title"),
    resultReading: document.getElementById("result-reading"),
    resultNudge: document.getElementById("result-nudge"),
    resultCard: document.getElementById("result-card"),
    intention: document.getElementById("intention-input"),
    themeChips: document.getElementById("theme-chips"),
    streakMsg: document.getElementById("streak-msg"),
    toast: document.getElementById("toast"),
    historyBox: document.getElementById("history-box"),
    historyList: document.getElementById("history-list"),
    tipBox: document.getElementById("tip-box"),
    luckStatus: document.getElementById("luck-status"),
    luckPanel: document.getElementById("luck-panel"),
    btnLuckOpen: document.getElementById("btn-luck-open"),
    btnLuckConfirm: document.getElementById("btn-luck-confirm"),
    btnLuckRedraw: document.getElementById("btn-luck-redraw"),
    luckStatusLocked: document.getElementById("luck-status-locked"),
    luckPanelLocked: document.getElementById("luck-panel-locked"),
    btnLuckOpenLocked: document.getElementById("btn-luck-open-locked"),
    btnLuckConfirmLocked: document.getElementById("btn-luck-confirm-locked"),
    btnLuckRedrawLocked: document.getElementById("btn-luck-redraw-locked"),
    btnAccount: document.getElementById("btn-account"),
    accountChip: document.getElementById("account-chip"),
    authModal: document.getElementById("auth-modal"),
    authClose: document.getElementById("auth-close"),
    authHint: document.getElementById("auth-hint"),
    authStatus: document.getElementById("auth-status"),
    authGuest: document.getElementById("auth-guest"),
    authUser: document.getElementById("auth-user"),
    authEmail: document.getElementById("auth-email"),
    authPass: document.getElementById("auth-pass"),
    authError: document.getElementById("auth-error"),
    authEmailLine: document.getElementById("auth-email-line"),
    btnSignin: document.getElementById("btn-signin"),
    btnSignup: document.getElementById("btn-signup"),
    btnSignout: document.getElementById("btn-signout"),
    loginSoft: document.getElementById("login-soft"),
    loginSoftLocked: document.getElementById("login-soft-locked"),
  };

  const DEFAULT_QUESTION = "今日靈感指引";
  const DEFAULT_THEME = "今日氣場";
  const SITE_URL = "https://yuk12312.github.io/daily-draw/";
  const STREAK_KEY = "daily-draw-streak-v1";
  const HISTORY_KEY = "daily-draw-history-v1";
  const LUCK_KEY = "daily-draw-luck-v1";
  const LUCK_MAX_EXTRAS = 3;
  const CLOUD_USER_COL = "dailyDrawUsers";
  let drawing = false;
  let redrawMode = false;
  let pendingQuestion = "";
  let pendingTheme = DEFAULT_THEME;
  let _fb = null;
  let _fbAuth = null;
  let _fbDb = null;
  let _fbUser = null;
  let _authReady = false;
  let _syncingCloud = false;

  function initFirebase() {
    if (_fb) return !!_fbAuth;
    if (typeof firebase === "undefined" || !window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey) {
      return false;
    }
    try {
      _fb = firebase.apps && firebase.apps.length
        ? firebase.app()
        : firebase.initializeApp(window.FIREBASE_CONFIG);
      _fbAuth = firebase.auth();
      _fbDb = firebase.firestore();
      _fbAuth.onAuthStateChanged(async (user) => {
        _fbUser = user;
        _authReady = true;
        updateAuthUI();
        if (user) {
          await syncLuckOnLogin();
          await maybeApplyCloudReadingMeta();
        }
        refreshLuckUI();
      });
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  function friendlyAuthError(e) {
    const code = (e && e.code) || "";
    const msg = (e && e.message) || String(e || "");
    const status = (e && (e.status || e.statusCode)) || "";
    const blob = [code, msg, status, e && e.details, e && e.customData && e.customData.message]
      .filter(Boolean)
      .join(" ");
    if (
      /API_KEY_HTTP_REFERRER_BLOCKED/i.test(blob) ||
      (/Requests from referer/i.test(blob) && /are blocked/i.test(blob)) ||
      (/PERMISSION_DENIED/i.test(blob) && /referer/i.test(blob)) ||
      (/PERMISSION_DENIED/i.test(blob) && /API[_ ]?key/i.test(blob) && /referer|referrer|blocked/i.test(blob))
    ) {
      return "本機預覽網址未加入 API key 允許清單。請喺 Google Cloud Console → APIs & Services → Credentials → 該 Browser key → Website restrictions 加入 http://127.0.0.1:8766/* 同 http://localhost:8766/*（以及 https://yuk12312.github.io/*）。";
    }
    if (code === "auth/invalid-email" || /invalid-email|badly formatted/i.test(msg)) {
      return "請輸入有效電郵地址";
    }
    if (code === "auth/missing-password" || code === "auth/weak-password") {
      return "密碼至少需要 6 個字元";
    }
    if (code === "auth/email-already-in-use") {
      return "此電郵已被註冊，請直接登入";
    }
    if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
      return "電郵或密碼不正確";
    }
    if (code === "auth/too-many-requests") {
      return "嘗試次數過多，請稍後再試";
    }
    if (code === "auth/unauthorized-domain") {
      return "此網域尚未授權，請喺 Firebase Console 加入 localhost／正式域名";
    }
    if (code === "auth/network-request-failed") {
      return "網絡錯誤，請檢查連線";
    }
    if (code === "auth/operation-not-allowed") {
      return "電郵／密碼登入未開通：請喺 Firebase Console → Authentication 啟用 Email/Password";
    }
    if (/permission-denied/i.test(msg) || code === "permission-denied") {
      return "雲端權限不足，請檢查 Firestore rules（dailyDrawUsers）";
    }
    let clean = msg.replace(/^Firebase:\s*/i, "").replace(/\s*\([^)]*\)\.?\s*$/, "").trim();
    if (!clean || clean.length < 3) clean = "操作失敗，請稍後再試";
    if (/^Error$/i.test(clean)) {
      return "Error（請開 Console → Network 睇 identitytoolkit 是否 403／API_KEY_HTTP_REFERRER_BLOCKED；若係，將 http://127.0.0.1:8766/* 同 http://localhost:8766/* 加入 Browser key 嘅 Website restrictions）";
    }
    return clean;
  }

  function setAuthError(text) {
    if (!els.authError) return;
    if (!text) {
      els.authError.hidden = true;
      els.authError.textContent = "";
      return;
    }
    els.authError.hidden = false;
    els.authError.textContent = text;
  }

  function openAuthModal() {
    initFirebase();
    if (els.authModal) els.authModal.hidden = false;
    setAuthError("");
    updateAuthUI();
    if (els.authEmail && !_fbUser) {
      setTimeout(() => els.authEmail.focus(), 50);
    }
  }

  function closeAuthModal() {
    if (els.authModal) els.authModal.hidden = true;
    setAuthError("");
  }

  function updateAuthUI() {
    const signedIn = !!_fbUser;
    const email = (_fbUser && _fbUser.email) || "";
    if (els.accountChip) {
      els.accountChip.textContent = signedIn ? email : "訪客";
      els.accountChip.classList.toggle("is-in", signedIn);
      els.accountChip.title = signedIn ? email : "未登入";
    }
    if (els.btnAccount) {
      els.btnAccount.textContent = signedIn ? "帳號" : "登入／註冊";
    }
    if (els.authStatus) {
      els.authStatus.textContent = signedIn
        ? ("已登入：" + email)
        : "未登入 · 訪客進度只喺呢部裝置";
    }
    if (els.authHint) {
      els.authHint.textContent = signedIn
        ? "再開次數同今日抽牌摘要會跟住帳號（僅供娛樂）。"
        : "用電郵註冊或登入；再開次數可跟住帳號（僅供娛樂）。";
    }
    if (els.authGuest) els.authGuest.hidden = signedIn;
    if (els.authUser) els.authUser.hidden = !signedIn;
    if (els.authEmailLine) {
      els.authEmailLine.textContent = signedIn ? ("帳號：" + email) : "";
    }
    const softHtml = '登入後再開次數可跟住帳號（可選，唔強制）。<button type="button" class="login-soft-btn" data-open-auth>去登入</button>';
    [els.loginSoft, els.loginSoftLocked].forEach((node) => {
      if (!node) return;
      if (signedIn) {
        node.hidden = true;
      } else {
        node.hidden = false;
        node.innerHTML = softHtml;
      }
    });
  }

  function userDocRef() {
    if (!_fbDb || !_fbUser) return null;
    return _fbDb.collection(CLOUD_USER_COL).doc(_fbUser.uid);
  }

  function normalizeLuck(raw) {
    const today = todayKey();
    if (!raw || raw.date !== today) {
      return { date: today, credits: 0, extrasGranted: 0 };
    }
    return {
      date: today,
      credits: Math.max(0, Number(raw.credits) || 0),
      extrasGranted: Math.max(0, Number(raw.extrasGranted) || 0)
    };
  }

  function mergeLuck(a, b) {
    const today = todayKey();
    const left = normalizeLuck(a);
    const right = normalizeLuck(b);
    const extrasGranted = Math.min(
      LUCK_MAX_EXTRAS,
      Math.max(left.extrasGranted, right.extrasGranted)
    );
    let credits = Math.max(left.credits, right.credits);
    credits = Math.min(credits, LUCK_MAX_EXTRAS);
    // Remaining credits cannot exceed grants for the day in a healthy state,
    // but devices may diverge; keep soft clamp to extrasGranted when both same day.
    if (left.date === today && right.date === today) {
      credits = Math.min(credits, Math.max(extrasGranted, credits));
    }
    return { date: today, credits, extrasGranted };
  }

  function loadLuckLocal() {
    try {
      const raw = JSON.parse(localStorage.getItem(LUCK_KEY) || "null");
      return normalizeLuck(raw);
    } catch {
      return normalizeLuck(null);
    }
  }

  function saveLuckLocal(luck) {
    localStorage.setItem(LUCK_KEY, JSON.stringify(normalizeLuck(luck)));
  }

  async function pushLuckToCloud(luck) {
    const ref = userDocRef();
    if (!ref) return;
    const payload = {
      email: (_fbUser && _fbUser.email) || "",
      luck: normalizeLuck(luck),
      updatedAt: Date.now()
    };
    try {
      await ref.set(payload, { merge: true });
    } catch (e) {
      console.warn(e);
      showToast(friendlyAuthError(e));
    }
  }

  async function syncLuckOnLogin() {
    if (!_fbUser || _syncingCloud) return;
    _syncingCloud = true;
    try {
      const local = loadLuckLocal();
      const ref = userDocRef();
      if (!ref) return;
      const snap = await ref.get();
      const cloudLuck = snap.exists ? (snap.data().luck || null) : null;
      const merged = mergeLuck(local, cloudLuck);
      saveLuckLocal(merged);
      await ref.set({
        email: _fbUser.email || "",
        luck: merged,
        updatedAt: Date.now()
      }, { merge: true });
      showToast("已同步帳號再開次數");
    } catch (e) {
      console.warn(e);
      showToast(friendlyAuthError(e));
    } finally {
      _syncingCloud = false;
    }
  }

  async function pushReadingMeta(state) {
    const ref = userDocRef();
    if (!ref || !state || !state.reading) return;
    try {
      await ref.set({
        email: (_fbUser && _fbUser.email) || "",
        readingMeta: {
          date: state.date,
          theme: state.theme || DEFAULT_THEME,
          question: normalizeQuestion(state.question),
          title: state.reading.title,
          glyph: state.reading.glyph,
          reading: state.reading.reading,
          nudge: state.reading.nudge,
          id: state.reading.id,
          redraw: !!state.redraw
        },
        updatedAt: Date.now()
      }, { merge: true });
    } catch (e) {
      console.warn(e);
    }
  }

  async function maybeApplyCloudReadingMeta() {
    const ref = userDocRef();
    if (!ref) return;
    try {
      const snap = await ref.get();
      if (!snap.exists) return;
      const meta = snap.data().readingMeta;
      if (!meta || meta.date !== todayKey()) return;
      const local = loadState();
      if (local && local.date === todayKey()) {
        // Keep local reading; refresh cloud from local instead of wiping.
        await pushReadingMeta(local);
        return;
      }
      // No local today reading — adopt cloud meta so free draw locks across devices.
      const reading = {
        id: meta.id || "cloud",
        glyph: meta.glyph || "✦",
        title: meta.title || "今日一抽",
        reading: meta.reading || "（已從帳號同步今日結果）",
        nudge: meta.nudge || "僅供娛樂"
      };
      const state = {
        date: meta.date,
        reading,
        question: meta.question || DEFAULT_QUESTION,
        theme: meta.theme || DEFAULT_THEME,
        redraw: !!meta.redraw,
        fromCloud: true
      };
      saveState(state);
      recordHistory(state);
      fillResult(state.reading, state.date, state.question, state.theme);
      showView("locked");
      refreshLuckUI();
      showToast("已從帳號載入今日抽牌");
    } catch (e) {
      console.warn(e);
    }
  }

  async function fbSignUp() {
    setAuthError("");
    if (!initFirebase()) {
      setAuthError("帳號服務未就緒");
      return;
    }
    const email = (els.authEmail && els.authEmail.value || "").trim();
    const pass = (els.authPass && els.authPass.value) || "";
    if (!email || !pass) {
      setAuthError("請輸入電郵同密碼");
      return;
    }
    if (pass.length < 6) {
      setAuthError("密碼至少需要 6 個字元");
      return;
    }
    try {
      await _fbAuth.createUserWithEmailAndPassword(email, pass);
      showToast("註冊成功");
      closeAuthModal();
    } catch (e) {
      setAuthError(friendlyAuthError(e));
    }
  }

  async function fbSignIn() {
    setAuthError("");
    if (!initFirebase()) {
      setAuthError("帳號服務未就緒");
      return;
    }
    const email = (els.authEmail && els.authEmail.value || "").trim();
    const pass = (els.authPass && els.authPass.value) || "";
    if (!email || !pass) {
      setAuthError("請輸入電郵同密碼");
      return;
    }
    try {
      await _fbAuth.signInWithEmailAndPassword(email, pass);
      showToast("登入成功");
      closeAuthModal();
    } catch (e) {
      setAuthError(friendlyAuthError(e));
    }
  }

  async function fbSignOut() {
    if (!_fbAuth) return;
    try {
      await _fbAuth.signOut();
      showToast("已登出（本機進度保留）");
      updateAuthUI();
      refreshLuckUI();
      closeAuthModal();
    } catch (e) {
      setAuthError(friendlyAuthError(e));
    }
  }

  function todayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function yesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function formatDisplayDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${y}年${Number(m)}月${Number(d)}日`;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadLuck() {
    return loadLuckLocal();
  }

  function saveLuck(luck) {
    const normalized = normalizeLuck(luck);
    saveLuckLocal(normalized);
    if (_fbUser) {
      pushLuckToCloud(normalized);
    }
  }

  function luckCredits() {
    return loadLuck().credits;
  }

  function canGrantLuck() {
    return loadLuck().extrasGranted < LUCK_MAX_EXTRAS;
  }

  function grantLuckCredit() {
    const luck = loadLuck();
    if (luck.extrasGranted >= LUCK_MAX_EXTRAS) {
      return { ok: false, luck, reason: "full" };
    }
    luck.credits += 1;
    luck.extrasGranted += 1;
    luck.date = todayKey();
    saveLuck(luck);
    return { ok: true, luck };
  }

  function consumeLuckCredit() {
    const luck = loadLuck();
    if (luck.credits <= 0) return false;
    luck.credits -= 1;
    saveLuck(luck);
    return true;
  }

  function refreshLuckUI() {
    const luck = loadLuck();
    const remaining = LUCK_MAX_EXTRAS - luck.extrasGranted;
    const statusText = luck.credits > 0
      ? `今日仲有 ${luck.credits} 次支持再開（已打賞 ${luck.extrasGranted}/${LUCK_MAX_EXTRAS}）`
      : remaining > 0
        ? `今日仲可以打賞再開 ${remaining} 次（榮譽制 · 僅供娛樂）`
        : `今日再開次數已滿（最多 ${LUCK_MAX_EXTRAS} 次）`;

    [els.luckStatus, els.luckStatusLocked].forEach((node) => {
      if (!node) return;
      node.hidden = false;
      node.textContent = statusText;
    });

    const showRedraw = luck.credits > 0;
    if (els.btnLuckRedraw) els.btnLuckRedraw.hidden = !showRedraw;
    if (els.btnLuckRedrawLocked) els.btnLuckRedrawLocked.hidden = !showRedraw;

    const canOpen = remaining > 0;
    if (els.btnLuckOpen) {
      els.btnLuckOpen.disabled = !canOpen && luck.credits <= 0;
      els.btnLuckOpen.textContent = canOpen
        ? "打賞支持 · 今日再開一次"
        : luck.credits > 0
          ? "今日再開已滿 · 可用剩餘次數"
          : "今日再開次數已滿";
    }
    if (els.btnLuckOpenLocked) {
      els.btnLuckOpenLocked.disabled = !canOpen && luck.credits <= 0;
      els.btnLuckOpenLocked.textContent = canOpen
        ? "打賞支持 · 今日再開一次"
        : luck.credits > 0
          ? "今日再開已滿 · 可用剩餘次數"
          : "今日再開次數已滿";
    }
  }

  function openLuckPanel(which) {
    if (which === "locked") {
      if (els.luckPanelLocked) els.luckPanelLocked.hidden = false;
    } else if (els.luckPanel) {
      els.luckPanel.hidden = false;
    }
    refreshLuckUI();
  }

  function confirmLuckTip() {
    const result = grantLuckCredit();
    if (!result.ok) {
      showToast(`今日再開次數已滿（最多 ${LUCK_MAX_EXTRAS} 次）`);
      refreshLuckUI();
      return;
    }
    refreshLuckUI();
    if (!_fbUser) {
      showToast("打賞確認成功；登入後再開次數可跟住帳號");
    } else {
      showToast("打賞確認成功，可以再開一次（娛樂）");
    }
  }

  function beginLuckRedraw() {
    if (luckCredits() <= 0) {
      showToast("未有再開次數，請先打賞確認");
      return;
    }
    redrawMode = true;
    if (els.intention) els.intention.value = "";
    showView("home");
    showToast("揀主題後開始再開一次（娛樂）");
  }

  function archivePreviousReading(state) {
    if (!state || !state.reading) return;
    const row = {
      date: state.date,
      glyph: state.reading.glyph,
      title: (state.reading.title || "") + "（再開前）",
      theme: state.theme || DEFAULT_THEME,
      question: normalizeQuestion(state.question),
      archived: true
    };
    const rows = loadHistory();
    rows.unshift(row);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(rows.slice(0, 14)));
  }

  function updateStreak(date) {
    let streak = { count: 0, last: "" };
    try {
      streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}") || streak;
    } catch {
      streak = { count: 0, last: "" };
    }
    if (streak.last === date) {
      return streak.count || 1;
    }
    const next = streak.last === yesterdayKey() ? (streak.count || 0) + 1 : 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({ count: next, last: date }));
    return next;
  }

  function showStreak(date) {
    if (!els.streakMsg) return;
    try {
      const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
      if (streak && streak.last === date && streak.count > 1) {
        els.streakMsg.hidden = false;
        els.streakMsg.textContent = `你已連續抽咗 ${streak.count} 日（純娛樂，無獎賞）`;
      } else {
        els.streakMsg.hidden = true;
      }
    } catch {
      els.streakMsg.hidden = true;
    }
  }

  function showView(name) {
    els.home.hidden = name !== "home";
    els.draw.hidden = name !== "draw";
    els.result.hidden = name !== "result";
    els.locked.hidden = name !== "locked";
  }

  function isFoodAsk(question, theme) {
    if ((theme || "") === "今日食咩") return true;
    return /食|餐|餸|餓|肚餓|開餐|宵夜|早餐|午餐|晚餐|下午茶|飲茶|點心|外賣|煮飯|煮餐|菜單|餐單|eat/i.test(question || "");
  }

  function pickReading(question, theme) {
    const pool = isFoodAsk(question, theme) ? FOOD_READINGS : READINGS;
    const day = todayKey();
    let hash = 0;
    const seed = day + "|" + (question || "") + "|" + (theme || "");
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    hash = (hash + Math.floor(Math.random() * 9973)) % pool.length;
    return pool[hash];
  }

  function alignReading(state) {
    if (!state || !state.reading) return state;
    const wantFood = isFoodAsk(state.question, state.theme);
    const isFood = FOOD_READINGS.some((item) => item.id === state.reading.id);
    if (wantFood && !isFood) {
      state.reading = pickReading(state.question, state.theme);
      saveState(state);
      recordHistory(state);
    }
    return state;
  }

  function loadHistory() {
    try {
      const rows = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(rows) ? rows : [];
    } catch {
      return [];
    }
  }

  function recordHistory(state) {
    if (!state || !state.reading) return;
    const row = {
      date: state.date,
      glyph: state.reading.glyph,
      title: state.reading.title,
      theme: state.theme || DEFAULT_THEME,
      question: normalizeQuestion(state.question)
    };
    // Keep archived same-day rows (再開前); replace only non-archived same-day primary.
    const rows = loadHistory().filter((item) => item.date !== row.date || item.archived);
    rows.unshift(row);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(rows.slice(0, 14)));
  }

  function renderHistory(currentDate) {
    if (!els.historyBox || !els.historyList) return;
    const rows = loadHistory().filter((item) => item.date !== currentDate || item.archived).slice(0, 7);
    if (!rows.length) {
      els.historyBox.hidden = true;
      return;
    }
    els.historyBox.hidden = false;
    els.historyList.innerHTML = rows.map((item) => {
      const q = item.question && item.question !== DEFAULT_QUESTION ? item.question : item.theme;
      return `<li><span class="h-glyph">${item.glyph || "✦"}</span><span>${item.date} · ${item.title} · ${q}</span></li>`;
    }).join("");
  }

  function normalizeQuestion(raw) {
    const q = (raw || "").trim();
    return q || DEFAULT_QUESTION;
  }

  function selectedTheme() {
    const on = els.themeChips && els.themeChips.querySelector(".chip.is-on");
    return (on && on.getAttribute("data-theme")) || DEFAULT_THEME;
  }

  function fillResult(reading, dateIso, question, theme) {
    const q = normalizeQuestion(question);
    const t = theme || DEFAULT_THEME;
    els.resultDate.textContent = formatDisplayDate(dateIso);
    if (els.resultTheme) els.resultTheme.textContent = t;
    els.resultQuestion.textContent = q === DEFAULT_QUESTION ? DEFAULT_QUESTION : `你嘅一念：『${q}』`;
    els.resultGlyph.textContent = reading.glyph;
    els.resultTitle.textContent = reading.title;
    els.resultReading.textContent = reading.reading;
    els.resultNudge.textContent = reading.nudge;
    if (els.resultCard) {
      els.resultCard.classList.remove("is-revealing");
      void els.resultCard.offsetWidth;
      els.resultCard.classList.add("is-revealing");
    }
    showStreak(dateIso);
    renderHistory(dateIso);
  }

  function showToast(msg) {
    els.toast.hidden = false;
    els.toast.textContent = msg;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  function startDrawFlow() {
    const existing = loadState();
    const today = todayKey();
    if (existing && existing.date === today && luckCredits() <= 0) {
      fillResult(existing.reading, existing.date, existing.question, existing.theme);
      showView("locked");
      refreshLuckUI();
      showToast("今日已抽過；打賞支持後可以再開");
      return;
    }
    if (existing && existing.date === today && luckCredits() > 0) {
      redrawMode = true;
    }
    pendingQuestion = normalizeQuestion(els.intention ? els.intention.value : "");
    pendingTheme = selectedTheme();
    drawing = false;
    els.deck.classList.remove("drawing", "reveal");
    els.btnDraw.disabled = true;
    els.btnDraw.textContent = "深呼吸…";
    if (els.stepLabel) els.stepLabel.textContent = "閉吓眼 · 慢慢深呼吸";
    els.drawHint.textContent = "將一念放進牌裡…";
    showView("draw");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduceMotion ? 80 : 800;
    setTimeout(() => {
      els.btnDraw.disabled = false;
      els.btnDraw.textContent = "或者撳呢度抽";
      els.drawHint.textContent = pendingQuestion === DEFAULT_QUESTION
        ? "準備好就撳張牌"
        : "你嘅一念已記下，準備好就撳張牌";
    }, wait);
  }

  function runDraw() {
    if (drawing || els.btnDraw.disabled) return;
    const existing = loadState();
    const today = todayKey();
    const isRedraw = !!(existing && existing.date === today && (redrawMode || luckCredits() > 0));
    if (existing && existing.date === today && !isRedraw) {
      fillResult(existing.reading, existing.date, existing.question, existing.theme);
      showView("locked");
      refreshLuckUI();
      return;
    }
    if (isRedraw && luckCredits() <= 0) {
      showToast("未有再開次數，請先打賞確認");
      showView("result");
      refreshLuckUI();
      return;
    }

    drawing = true;
    els.btnDraw.disabled = true;
    els.btnDraw.textContent = "抽緊…";
    els.drawHint.textContent = isRedraw ? "再開牌氣聚集緊…（娛樂）" : "牌氣聚集緊…";
    els.deck.classList.add("drawing");

    const reading = pickReading(pendingQuestion, pendingTheme);
    const date = today;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduceMotion ? 200 : 1600;

    setTimeout(() => {
      els.deck.classList.remove("drawing");
      els.deck.classList.add("reveal");

      setTimeout(() => {
        if (isRedraw) {
          if (!consumeLuckCredit()) {
            drawing = false;
            showToast("再開次數剛用完");
            showView("result");
            refreshLuckUI();
            return;
          }
          archivePreviousReading(existing);
        } else {
          updateStreak(date);
        }
        const state = {
          date,
          reading,
          question: pendingQuestion || DEFAULT_QUESTION,
          theme: pendingTheme || DEFAULT_THEME,
          redraw: isRedraw
        };
        saveState(state);
        recordHistory(state);
        if (_fbUser) pushReadingMeta(state);
        redrawMode = false;
        fillResult(reading, date, state.question, state.theme);
        showView("result");
        refreshLuckUI();
        drawing = false;
        if (isRedraw) showToast("支持再開完成（娛樂）");
      }, reduceMotion ? 50 : 450);
    }, wait);
  }

  function buildShareText() {
    const state = loadState();
    if (!state) return "";
    const r = state.reading;
    const question = normalizeQuestion(state.question);
    const theme = state.theme || DEFAULT_THEME;
    return [
      "🔮【今日一抽占卜結果】",
      `🌙 主題：${theme}`,
      `❓ 我嘅一念：${question}`,
      `🎴 今日抽到：${r.title}`,
      `💬 解讀：${r.reading}${r.nudge ? " " + r.nudge : ""}`,
      "——",
      "（僅供娛樂）聽日再嚟抽啦 🌙",
      SITE_URL
    ].join("\n");
  }

  function copyResult() {
    const text = buildShareText();
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast("已複製結果文案 ✓"),
        () => fallbackCopy(text)
      );
    } else {
      fallbackCopy(text);
    }
  }

  function shareResult() {
    const text = buildShareText();
    if (!text) return;
    if (navigator.share) {
      navigator.share({
        title: "每日一抽",
        text,
        url: SITE_URL
      }).then(
        () => showToast("已打開分享"),
        () => copyResult()
      );
    } else {
      copyResult();
      showToast("已複製，可貼去 WhatsApp／IG");
    }
  }

  function downloadCard() {
    const card = els.resultCard;
    if (!card || typeof html2canvas !== "function") {
      showToast("下載暫時未能用，試下截圖");
      return;
    }
    showToast("整緊結果卡…");
    html2canvas(card, {
      backgroundColor: "#141225",
      scale: 2,
      useCORS: true
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "每日一抽-結果卡.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("已下載結果卡 ✓");
    }).catch(() => {
      showToast("下載失敗，試下截圖分享");
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("已複製結果文案 ✓");
    } catch {
      showToast("複製失敗，試下手動選取");
    }
    document.body.removeChild(ta);
  }

  function boot() {
    const state = loadState();
    const today = todayKey();

    if (state && state.date === today) {
      const aligned = alignReading(state);
      recordHistory(aligned);
      fillResult(aligned.reading, aligned.date, aligned.question, aligned.theme);
      showView("locked");
      refreshLuckUI();
    } else {
      showView("home");
      refreshLuckUI();
    }

    if (els.themeChips) {
      els.themeChips.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        els.themeChips.querySelectorAll(".chip").forEach((chip) => {
          chip.classList.toggle("is-on", chip === btn);
          chip.setAttribute("aria-pressed", chip === btn ? "true" : "false");
        });
      });
    }

    els.btnStart.addEventListener("click", startDrawFlow);
    els.btnDraw.addEventListener("click", runDraw);
    els.deck.addEventListener("click", runDraw);
    els.deck.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        runDraw();
      }
    });
    els.btnCopy.addEventListener("click", copyResult);
    if (els.btnShare) els.btnShare.addEventListener("click", shareResult);
    if (els.btnDownload) els.btnDownload.addEventListener("click", downloadCard);
    els.btnShowToday.addEventListener("click", () => {
      const s = alignReading(loadState());
      if (s) {
        fillResult(s.reading, s.date, s.question, s.theme);
        showView("result");
        refreshLuckUI();
      }
    });

    if (els.btnLuckOpen) {
      els.btnLuckOpen.addEventListener("click", () => openLuckPanel("result"));
    }
    if (els.btnLuckOpenLocked) {
      els.btnLuckOpenLocked.addEventListener("click", () => openLuckPanel("locked"));
    }
    if (els.btnLuckConfirm) {
      els.btnLuckConfirm.addEventListener("click", confirmLuckTip);
    }
    if (els.btnLuckConfirmLocked) {
      els.btnLuckConfirmLocked.addEventListener("click", confirmLuckTip);
    }
    if (els.btnLuckRedraw) {
      els.btnLuckRedraw.addEventListener("click", beginLuckRedraw);
    }
    if (els.btnLuckRedrawLocked) {
      els.btnLuckRedrawLocked.addEventListener("click", beginLuckRedraw);
    }

    if (els.btnAccount) {
      els.btnAccount.addEventListener("click", openAuthModal);
    }
    if (els.authClose) {
      els.authClose.addEventListener("click", closeAuthModal);
    }
    if (els.authModal) {
      els.authModal.addEventListener("click", (e) => {
        if (e.target === els.authModal) closeAuthModal();
      });
    }
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-auth]");
      if (btn) {
        e.preventDefault();
        openAuthModal();
      }
    });
    if (els.btnSignin) els.btnSignin.addEventListener("click", fbSignIn);
    if (els.btnSignup) els.btnSignup.addEventListener("click", fbSignUp);
    if (els.btnSignout) els.btnSignout.addEventListener("click", fbSignOut);
    if (els.authPass) {
      els.authPass.addEventListener("keydown", (e) => {
        if (e.key === "Enter") fbSignIn();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.authModal && !els.authModal.hidden) {
        closeAuthModal();
      }
    });

    initFirebase();
    updateAuthUI();
    refreshLuckUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
