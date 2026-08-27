import { Step, Steps } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import hall from './assets/hall.jpg';
import tracks from './assets/tracks.jpg';
import theme from './assets/theme.jpg';
import workshop from './assets/workshop.jpg';
import flutterSalon from './assets/flutter.jpg';
import webmcp from './assets/webmcp.jpg';
import boothArt from './assets/booth-art.jpg';
import boothCoral from './assets/booth-coral.jpg';
import boothXr from './assets/booth-xr.jpg';
import boothStudio from './assets/booth-studio.jpg';

export const design: DesignSystem = {
  palette: { bg: '#f8f9fa', text: '#202124', accent: '#1a73e8' },
  fonts: {
    display: 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace',
    body: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 132, body: 40 },
  radius: 14,
};

const green = '#188038';
const red = '#c5221f';
const yellow = '#e37400';
const muted = '#5f6368';
const line = '#dadce0';
const card = '#ffffff';

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
} as const;

const page = { ...fill, padding: 120, display: 'flex', flexDirection: 'column' } as const;

const h2 = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 76,
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
} as const;

const eyebrow = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 26,
  letterSpacing: '0.18em',
  color: 'var(--osd-accent)',
  textTransform: 'uppercase',
} as const;

// ---------------------------------------------------------------- components

const Dot = ({ c }: { c: string }) => (
  <span style={{ width: 22, height: 22, borderRadius: '50%', background: c, display: 'inline-block' }} />
);

const Bullet = ({ text, sub }: { text: string; sub?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 44, lineHeight: 1.4 }}>{text}</div>
    {sub ? <div style={{ fontSize: 30, color: muted, lineHeight: 1.5 }}>{sub}</div> : null}
  </div>
);

const Card = ({ n, title, body, color }: { n: string; title: string; body: string; color: string }) => (
  <div
    style={{
      flex: 1,
      background: card,
      border: `1px solid ${line}`,
      borderTop: `6px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '36px 34px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, color }}>{n}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 28, color: muted, lineHeight: 1.6 }}>{body}</div>
  </div>
);

const Trap = ({ n, wrong, right }: { n: string; wrong: string; right: string }) => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, color: red, flex: '0 0 44px', paddingTop: 6 }}>{n}</div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 38, lineHeight: 1.4 }}>{wrong}</div>
      <div style={{ fontSize: 30, color: green, lineHeight: 1.5 }}>→ {right}</div>
    </div>
  </div>
);

const Chip = ({ text }: { text: string }) => (
  <span
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 26,
      border: `1px solid ${line}`,
      background: card,
      borderRadius: 999,
      padding: '10px 24px',
    }}
  >
    {text}
  </span>
);

/** 整頁背景圖 + 暗色遮罩，讓白字讀得到 */
const PhotoBg = ({ src, dim = 0.55 }: { src: string; dim?: number }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: `rgba(12,14,16,${dim})` }} />
  </div>
);

/** 右半邊配圖、左半邊文字的雙欄版面 */
const PhotoSide = ({ src }: { src: string }) => (
  <div style={{ flex: '0 0 46%', borderRadius: 'var(--osd-radius)', overflow: 'hidden', alignSelf: 'stretch' }}>
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

/** 大數字統計塊 */
const Figure = ({ n, label, color }: { n: string; label: string; color: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 96, fontWeight: 700, color, lineHeight: 1 }}>{n}</div>
    <div style={{ fontSize: 28, color: muted }}>{label}</div>
  </div>
);

/** 依比例畫的 track 長條 */
const TrackBar = ({ name, n, total, color }: { name: string; n: number; total: number; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <div style={{ flex: '0 0 130px', fontFamily: 'var(--osd-font-display)', fontSize: 26 }}>{name}</div>
    <div style={{ width: `${(n / total) * 620}px`, height: 34, background: color, borderRadius: 6 }} />
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, color: muted }}>{n}</div>
  </div>
);

// ---------------------------------------------------------------- pages

const Cover: Page = () => (
  <div style={{ ...fill, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 140px', color: '#fff' }}>
    <PhotoBg src={hall} dim={0.62} />
    <div style={{ position: 'relative', display: 'flex', gap: 12, marginBottom: 40 }}>
      <Dot c="#1a73e8" />
      <Dot c={red} />
      <Dot c="#fbbc04" />
      <Dot c={green} />
    </div>
    <div style={{ ...eyebrow, position: 'relative', color: '#8ab4f8' }}>GDG 組織者 · 參加分享</div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 700,
        margin: '30px 0 26px',
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        position: 'relative',
      }}
    >
      Google I/O<br />Connect China 2026
    </h1>
    <p style={{ fontSize: 40, color: '#dadce0', margin: 0, position: 'relative' }}>
      2026.08.12–13　上海世博中心　參加紀錄
    </p>
  </div>
);

const Where: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={{ ...eyebrow, fontSize: 22, letterSpacing: '0.08em', textTransform: 'none' }}>
        I/O = 美國主場　·　Connect = 巡迴場　·　Extended = 社群自辦
      </div>
      <h2 style={{ ...h2, fontSize: 64, marginTop: 22 }}>我去的是巡迴場</h2>

      <div style={{ display: 'flex', gap: 56, marginTop: 44 }}>
        <Figure n="61" label="場次總計" color="#1a73e8" />
        <Figure n="2" label="天" color={green} />
        <Figure n="4" label="主軸" color={yellow} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 44 }}>
        <TrackBar name="議程" n={30} total={61} color="#1a73e8" />
        <TrackBar name="工作坊" n={19} total={61} color={green} />
        <TrackBar name="開發者沙龍" n={12} total={61} color={yellow} />
      </div>

      <p style={{ fontSize: 26, color: muted, marginTop: 36, marginBottom: 0 }}>
        兩軌並行，要先排好不然會撞場。以 GDG 組織者身分受邀。
      </p>
    </div>
    <PhotoSide src={tracks} />
  </div>
);

const Thesis: Page = () => (
  <div style={{ ...page, position: 'relative', justifyContent: 'center', color: '#fff' }}>
    <PhotoBg src={theme} dim={0.68} />
    <div style={{ position: 'relative' }}>
      <div style={{ ...eyebrow, color: '#8ab4f8' }}>一句話</div>
      <h2 style={{ ...h2, fontSize: 88, marginTop: 30 }}>
        Agent 從「能不能做」<br />變成「怎麼上線」
      </h2>
      <p style={{ fontSize: 36, color: '#dadce0', marginTop: 48, marginBottom: 0, lineHeight: 1.6 }}>
        去年在講模型能力，今年在講 sandbox、高併發、權限與安全。<br />
        議題換了，代表大家已經在跑真的東西。
      </p>
    </div>
  </div>
);

const WhyChina: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>先解釋一件事</div>
    <h2 style={{ ...h2, fontSize: 66, marginTop: 26 }}>Google 不是退出中國了嗎？</h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 26, marginBottom: 40, lineHeight: 1.5 }}>
      辦的不是「中國市場」，是<span style={{ color: 'var(--osd-text)' }}>幫中國開發者出海</span>——這解釋了議程為什麼長那樣。
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 36, lineHeight: 1.4 }}>· 開源模型推廣 —— Gemma 4</div>
      <div style={{ fontSize: 36, lineHeight: 1.4 }}>· Android 出海 —— 國際版仍高度依賴 GMS</div>
      <div style={{ fontSize: 36, lineHeight: 1.4 }}>· 雲端出海 —— 跨國基礎設施與合規</div>
      <div style={{ fontSize: 36, lineHeight: 1.4 }}>· TPU 出海 —— 降低 AI 訓練與推論成本</div>
    </div>
    <p style={{ fontSize: 30, color: 'var(--osd-accent)', marginTop: 44, marginBottom: 0 }}>
      所以主軸是「出海 × agent」，Cloud 場一直在講 global scale 不是偶然。
    </p>
  </div>
);

const Sessions: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>兩天下來</div>
      <h2 style={{ ...h2, fontSize: 62, marginTop: 24 }}>我聽的場次</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 }}>
        <div style={{ fontSize: 32, lineHeight: 1.4 }}>Authentication in 2026：passkeys、digital credentials</div>
        <div style={{ fontSize: 32, lineHeight: 1.4 }}>ML Kit + Gemini Nano：端側 GenAI</div>
        <div style={{ fontSize: 32, lineHeight: 1.4 }}>優化應用效能，駕馭新一代 Android</div>
        <div style={{ fontSize: 32, lineHeight: 1.4 }}>AI upskilling with Google Skills</div>
        <div style={{ fontSize: 32, lineHeight: 1.4, color: 'var(--osd-accent)' }}>
          工作坊：Build multi-agent systems with ADK
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.4 }}>開發者沙龍：Flutter 和 Firebase、GDG</div>
      </div>
      <p style={{ fontSize: 26, color: muted, marginTop: 36, marginBottom: 0 }}>
        61 場裡的 7 場。以下講其中影響我最多的那條線。
      </p>
    </div>
    <PhotoSide src={flutterSalon} />
  </div>
);

const Shift1: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>觀察 01</div>
      <h2 style={{ ...h2, fontSize: 64, marginTop: 26 }}>工具介面標準化了</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 44 }}>
        <Bullet
          text="MCP 從「某家的協定」變成大會共同語言"
          sub="Chrome DevTools、Firebase、各家平台，用的都是同一套 tool calling"
        />
        <Bullet
          text="展區有專為 agent 設計的 WebMCP 工具"
          sub="現場可以實際操作，不只是投影片上的規格"
        />
        <Bullet text="工具寫一次，到處都能接" sub="同一支 MCP server，Claude Code、ADK、Antigravity 都吃" />
      </div>
    </div>
    <PhotoSide src={webmcp} />
  </div>
);

const Shift2: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>觀察 02</div>
    <h2 style={{ ...h2, marginTop: 30 }}>從一個 agent 到一組 agent</h2>
    <div style={{ display: 'flex', gap: 28, marginTop: 54 }}>
      <Card n="ORCHESTRATOR" title="主 Agent" body="負責拆解任務、決定派給誰，自己不做事" color="#1a73e8" />
      <Card n="SPECIALIST" title="專業 Agent" body="各自只做一件事，換掉一個不影響其他" color={green} />
      <Card n="PROTOCOL" title="A2A / MCP" body="agent 之間、agent 對工具，各有各的協定" color={yellow} />
    </div>
  </div>
);

const BoothArt: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>展區 · 01</div>
      <h2 style={{ ...h2, fontSize: 58, marginTop: 24 }}>AI 社會公益<br />× Gemma 4</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 40 }}>
        <Bullet text="四時行吟" sub="誦讀古詩，AI 識別語音裡的情緒律動，即時匹配 24 節氣" />
        <Bullet text="紙上生靈" sub="多模態識別手繪筆觸，帶觀眾走進剪紙光影世界" />
        <Bullet text="樂舞胡旋" sub="識別觀眾衣著並映射化身，與唐俑共舞" />
      </div>
      <p style={{ fontSize: 24, color: muted, marginTop: 34, marginBottom: 0 }}>
        三組都是中央美院青年藝術家的畢業創作，加上 Gemma 4 開放模型改成互動裝置。
      </p>
    </div>
    <PhotoSide src={boothArt} />
  </div>
);

const BoothCoral: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>展區 · 02</div>
      <h2 style={{ ...h2, fontSize: 58, marginTop: 24 }}>Coral 邊緣推論</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
        <Bullet text="YOLOv8n 即時人物偵測" sub="畫面上直接標推論耗時，現場看到的是 50.6 ms" />
        <Bullet text="全部在裝置上跑完" sub="不上雲，也就沒有網路來回的延遲與隱私問題" />
      </div>
      <p style={{ fontSize: 24, color: muted, marginTop: 34, marginBottom: 0 }}>
        跟 Gemini Nano、ML Kit 那條端側 AI 的線是同一件事的兩端。
      </p>
    </div>
    <PhotoSide src={boothCoral} />
  </div>
);

const BoothXr: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>展區 · 03</div>
      <h2 style={{ ...h2, fontSize: 58, marginTop: 24 }}>Android XR</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
        <Bullet text="XREAL Aura 試戴" sub="Android 展區排隊最久的一攤" />
        <Bullet text="外型接近一般墨鏡" sub="不是頭盔，是可以戴出門的量體" />
      </div>
    </div>
    <PhotoSide src={boothXr} />
  </div>
);

const BoothStudio: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>展區 · 04</div>
      <h2 style={{ ...h2, fontSize: 58, marginTop: 24 }}>Gemini 奇趣影棚</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
        <Bullet text="站上定點拍照，Gemini 生成主題照" sub="實驗室、書房、派對，換的是整個場景不只是濾鏡" />
        <Bullet text="掃 QR 取圖，24 小時後自動刪除" sub="畫面上就寫著這句——這個細節比生成品質更值得注意" />
      </div>
    </div>
    <PhotoSide src={boothStudio} />
  </div>
);

const Workshop: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>我實際上的一堂課</div>
      <h2 style={{ ...h2, fontSize: 58, marginTop: 26 }}>Build multi-agent<br />systems with ADK</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }}>
        <Chip text="LlmAgent" />
        <Chip text="SequentialAgent" />
        <Chip text="ParallelAgent" />
        <Chip text="LoopAgent" />
        <Chip text="McpToolset" />
      </div>
      <p style={{ fontSize: 32, color: muted, marginTop: 40, marginBottom: 0, lineHeight: 1.6 }}>
        最有用的一句：<span style={{ color: 'var(--osd-text)' }}>控制流該由誰決定？</span><br />
        模型決定 → LlmAgent；你決定 → workflow agent。
      </p>
    </div>
    <PhotoSide src={workshop} />
  </div>
);

const Shenzhen: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>社群案例</div>
    <h2 style={{ ...h2, marginTop: 30 }}>深圳 GDG 拿 ADK 跑活動營運</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 50 }}>
      <Bullet text="主 Agent 編排 → 文案 / 生圖 / 排版三個專業 Agent" sub="活動前籌備、活動中記錄、活動後復盤，各自觸發同一組 SOP" />
      <Bullet text="成效：流程沉澱成社群資產" sub="SOP 與 prompt 都在 ADK 專案裡，新的組織者照著跑就行" />
    </div>
    <p style={{ fontSize: 26, color: muted, marginTop: 40, marginBottom: 0 }}>
      來源：深圳 GDG 於 GDG Summit 的分享（講者自述為定性總結，未做精確工時統計）
    </p>
  </div>
);

const Bridge: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>回來之後</div>
    <h2 style={{ ...h2, fontSize: 64, marginTop: 26 }}>拿工作坊的東西<br />接了一個既有系統</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 44 }}>
      <Bullet text="把一個既有的監控 dashboard 開放給 agent 讀" sub="不是重寫一套，是讓原本畫圖用的資料換一個介面給模型看" />
      <Bullet text="工具只有三個，全部唯讀" sub="tool 太多模型會選錯；寫入的誤判成本比誤報高" />
      <Bullet text="實作細節與踩到的問題另外分享" sub="這場先講大會" />
    </div>
  </div>
);

const Tooling: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>不只是後端</div>
    <h2 style={{ ...h2, marginTop: 30 }}>工具端也在往同一個方向走</h2>
    <div style={{ display: 'flex', gap: 28, marginTop: 50 }}>
      <Card n="/browser" title="沙箱瀏覽器" body="內建 chrome-devtools-mcp，agent 自己開頁面驗證結果" color="#1a73e8" />
      <Card n="/goal" title="自主執行" body="拆解目標、跑測試、讀編譯錯誤自己修" color={green} />
      <Card n=".agents/skills/" title="團隊 SOP" body="把流程寫成 Markdown 進版控，變成團隊專屬指令" color={yellow} />
    </div>
    <p style={{ fontSize: 26, color: muted, marginTop: 36, marginBottom: 0 }}>
      Antigravity 2.0 於 GDG Summit 分享的 slash commands
    </p>
  </div>
);

const Takeaway: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>資源</div>
    <h2 style={{ ...h2, fontSize: 62, marginTop: 26 }}>要自己看的話</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 46 }}>
      <div style={{ fontSize: 34, lineHeight: 1.4 }}>
        官方議程與講者　<span style={{ color: muted, fontSize: 28 }}>ioconnectchina.googlecnapps.cn</span>
      </div>
      <div style={{ fontSize: 34, lineHeight: 1.4 }}>
        議程影片　<span style={{ color: muted, fontSize: 28 }}>會後陸續上線</span>
      </div>
      <div style={{ fontSize: 34, lineHeight: 1.4 }}>
        ADK 文件　<span style={{ color: muted, fontSize: 28 }}>adk.dev</span>
      </div>
      <div style={{ fontSize: 34, lineHeight: 1.4 }}>
        這份簡報　<span style={{ color: muted, fontSize: 28 }}>會放在社群</span>
      </div>
    </div>
  </div>
);

const End: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 140px' }}>
    <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
      <Dot c="#1a73e8" />
      <Dot c={red} />
      <Dot c="#fbbc04" />
      <Dot c={green} />
    </div>
    <h2 style={{ ...h2, fontSize: 76 }}>
      工具寫一次，<br />到處都能接
    </h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 40, marginBottom: 0 }}>
      這是這趟最實際的收穫。
    </p>
  </div>
);

export const meta: SlideMeta = {
  title: 'I/O Connect China 2026 分享',
  createdAt: '2026-08-26T09:48:16.943Z',
};

// ADK 實作細節（SoIBuilt / Arch / Demo / Traps）已抽到另一份簡報，
// 這份專注在大會本身，可獨立拿去社群分享。
export default [
  Cover,
  Where,
  WhyChina,
  Thesis,
  Sessions,
  Shift1,
  Shift2,
  BoothArt,
  BoothCoral,
  BoothXr,
  BoothStudio,
  Workshop,
  Shenzhen,
  Bridge,
  Tooling,
  Takeaway,
  End,
] satisfies Page[];
