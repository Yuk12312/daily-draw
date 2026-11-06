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

  const els = {
    home: document.getElementById("view-home"),
    draw: document.getElementById("view-draw"),
    result: document.getElementById("view-result"),
    locked: document.getElementById("view-locked"),
    btnStart: document.getElementById("btn-start"),
    btnDraw: document.getElementById("btn-draw"),
    btnCopy: document.getElementById("btn-copy"),
    btnShowToday: document.getElementById("btn-show-today"),
    deck: document.getElementById("deck"),
    drawHint: document.getElementById("draw-hint"),
    resultDate: document.getElementById("result-date"),
    resultQuestion: document.getElementById("result-question"),
    resultGlyph: document.getElementById("result-glyph"),
    resultTitle: document.getElementById("result-title"),
    resultReading: document.getElementById("result-reading"),
    resultNudge: document.getElementById("result-nudge"),
    intention: document.getElementById("intention-input"),
    toast: document.getElementById("toast"),
  };

  const DEFAULT_QUESTION = "今日靈感指引";
  let drawing = false;
  let pendingQuestion = "";

  function todayKey() {
    const d = new Date();
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

  function showView(name) {
    els.home.hidden = name !== "home";
    els.draw.hidden = name !== "draw";
    els.result.hidden = name !== "result";
    els.locked.hidden = name !== "locked";
  }

  function pickReading() {
    const day = todayKey();
    // Stable-ish pick for the day (same device/day → same vibe if refreshed before first save — we save after pick)
    let hash = 0;
    for (let i = 0; i < day.length; i++) {
      hash = (hash * 31 + day.charCodeAt(i)) >>> 0;
    }
    hash = (hash + Math.floor(Math.random() * 9973)) % READINGS.length;
    return READINGS[hash];
  }

  function normalizeQuestion(raw) {
    const q = (raw || "").trim();
    return q || DEFAULT_QUESTION;
  }

  function fillResult(reading, dateIso, question) {
    const q = normalizeQuestion(question);
    els.resultDate.textContent = formatDisplayDate(dateIso);
    els.resultQuestion.textContent = q === DEFAULT_QUESTION ? DEFAULT_QUESTION : `你問的是：『${q}』`;
    els.resultGlyph.textContent = reading.glyph;
    els.resultTitle.textContent = reading.title;
    els.resultReading.textContent = reading.reading;
    els.resultNudge.textContent = reading.nudge;
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
    pendingQuestion = normalizeQuestion(els.intention ? els.intention.value : "");
    drawing = false;
    els.deck.classList.remove("drawing", "reveal");
    els.btnDraw.disabled = false;
    els.btnDraw.textContent = "或者撳呢度抽";
    els.drawHint.textContent = pendingQuestion === DEFAULT_QUESTION
      ? "將心意放進牌裡，準備好就撳"
      : "你嘅一念已記下，準備好就撳張牌";
    showView("draw");
  }

  function runDraw() {
    if (drawing) return;
    const existing = loadState();
    if (existing && existing.date === todayKey()) {
      fillResult(existing.reading, existing.date, existing.question);
      showView("locked");
      return;
    }

    drawing = true;
    els.btnDraw.disabled = true;
    els.btnDraw.textContent = "抽緊…";
    els.drawHint.textContent = "牌氣聚集緊…";
    els.deck.classList.add("drawing");

    const reading = pickReading();
    const date = todayKey();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduceMotion ? 200 : 1600;

    setTimeout(() => {
      els.deck.classList.remove("drawing");
      els.deck.classList.add("reveal");

      setTimeout(() => {
        const state = { date, reading, question: pendingQuestion || DEFAULT_QUESTION };
        saveState(state);
        fillResult(reading, date, state.question);
        showView("result");
        drawing = false;
      }, reduceMotion ? 50 : 450);
    }, wait);
  }

  function copyResult() {
    const state = loadState();
    if (!state) return;
    const r = state.reading;
    const question = normalizeQuestion(state.question);
    const text = [
      "🔮【今日一抽占卜結果】",
      `❓ 我的問題：${question}`,
      `🎴 抽到牌卡：${r.title}`,
      `💬 解讀：${r.reading}${r.nudge ? " " + r.nudge : ""}`,
      "——",
      "（僅供娛樂）聽日再嚟抽啦 🌙"
    ].join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast("已複製結果文案 ✓"),
        () => fallbackCopy(text)
      );
    } else {
      fallbackCopy(text);
    }
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
      fillResult(state.reading, state.date, state.question);
      showView("locked");
    } else {
      showView("home");
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
    els.btnShowToday.addEventListener("click", () => {
      const s = loadState();
      if (s) {
        fillResult(s.reading, s.date, s.question);
        showView("result");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
