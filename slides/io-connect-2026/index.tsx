import { Step, Steps } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import hall from './assets/hall.jpg';
import tracks from './assets/tracks.jpg';
import theme from './assets/theme.jpg';
import workshop from './assets/workshop.jpg';
import flutterSalon from './assets/flutter.jpg';
import webmcp from './assets/webmcp.jpg';
import agentPlatform from './assets/agent-platform.jpg';
import googleSign from './assets/google-sign.jpg';
import gdgSummit from './assets/gdg-summit.jpg';
import gdgPoster from './assets/gdg-poster.jpg';
import gdeSummit from './assets/gde-summit.jpg';
import venue from './assets/venue.jpg';
import keynoteGame from './assets/keynote-game.jpg';
import artPoem from './assets/art-poem.jpg';
import artPaper from './assets/art-paper.jpg';
import artDance from './assets/art-dance.jpg';
import boothXr from './assets/booth-xr.jpg';
import studioWide from './assets/studio-wide.jpg';
import studioResult from './assets/studio-result.jpg';

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

/** 作品卡:圖 + 作品名 + 一句機制說明 */
const ArtCard = ({ src, title, note }: { src: string; title: string; note: string }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ width: '100%', height: 306, borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${line}` }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 24, color: muted, lineHeight: 1.5 }}>{note}</div>
  </div>
);

/** 分層條:名稱 + 說明,可標記「我們用的那層」 */
const Layer = ({ n, name, desc, color }: { n: string; name: string; desc: string; color: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      background: card,
      border: `1px solid ${line}`,
      borderLeft: `5px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '16px 20px',
    }}
  >
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: muted, flex: '0 0 34px' }}>{n}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, color, flex: '0 0 250px' }}>{name}</div>
    <div style={{ fontSize: 22, color: muted, flex: 1 }}>{desc}</div>
  </div>
);

/** Antigravity 的三個操作介面 */
const Surface = ({ icon, name, sub, desc, color }: { icon: string; name: string; sub: string; desc: string; color: string }) => (
  <div
    style={{
      flex: 1,
      background: card,
      border: `1px solid ${line}`,
      borderTop: `5px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '30px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div
      style={{
        width: 52, height: 52, borderRadius: '50%', background: color,
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--osd-font-display)', fontSize: 24,
      }}
    >
      {icon}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, marginTop: 6 }}>{name}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, color: muted }}>{sub}</div>
    <div style={{ fontSize: 25, color: muted, lineHeight: 1.5, marginTop: 4 }}>{desc}</div>
  </div>
);

/** 流程步驟卡:編號 + 指令 + 它做的事 */
const Step5 = ({ n, cmd, what, color }: { n: string; cmd: string; what: string; color: string }) => (
  <div
    style={{
      flex: 1,
      background: card,
      border: `1px solid ${line}`,
      borderTop: `4px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '22px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, color: muted }}>{n}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, color }}>{cmd}</div>
    <div style={{ fontSize: 22, color: muted, lineHeight: 1.5 }}>{what}</div>
  </div>
);

/** 情境 / 結果的橫條 */
const Band = ({ label, text, color }: { label: string; text: string; color: string }) => (
  <div
    style={{
      background: card,
      border: `1px solid ${line}`,
      borderLeft: `5px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '18px 24px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
    }}
  >
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, color, flex: '0 0 auto' }}>{label}</span>
    <span style={{ fontSize: 25, color: muted, lineHeight: 1.5 }}>{text}</span>
  </div>
);

/** 段落分隔頁:日期 + 段落名 */
const DayBreak = ({ date, title, sub }: { date: string; title: string; sub: string }) => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 140px' }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>
      {date}
    </div>
    <h2 style={{ ...h2, fontSize: 84, marginTop: 26 }}>{title}</h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 30, marginBottom: 0 }}>{sub}</p>
  </div>
);

/** 行程總覽的一列 */
const DayRow = ({ date, day, what, tag, color }: { date: string; day: string; what: string; tag: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 26, padding: '16px 0', borderBottom: `1px solid ${line}` }}>
    <div style={{ flex: '0 0 120px', fontFamily: 'var(--osd-font-display)', fontSize: 30, color }}>{date}</div>
    <div style={{ flex: '0 0 70px', fontSize: 24, color: muted }}>{day}</div>
    <div style={{ flex: 1, fontSize: 30 }}>{what}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, color, border: `1px solid ${color}`, borderRadius: 999, padding: '5px 16px' }}>
      {tag}
    </div>
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
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>展區 · 01</div>
    <h2 style={{ ...h2, fontSize: 58, marginTop: 22 }}>AI 社會公益 × Gemma 4</h2>
    <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
      <ArtCard
        src={artPoem}
        title="四時行吟"
        note="誦讀古詩，AI 識別語音裡的情緒律動，即時匹配 24 節氣"
      />
      <ArtCard
        src={artPaper}
        title="紙上生靈"
        note="多模態識別手繪筆觸，帶觀眾走進剪紙光影世界"
      />
      <ArtCard
        src={artDance}
        title="樂舞胡旋"
        note="即時識別觀眾衣著並映射專屬化身，與唐俑共舞胡旋"
      />
    </div>
    <p style={{ fontSize: 24, color: muted, marginTop: 36, marginBottom: 0 }}>
      三組都是中央美院青年藝術家的畢業創作，加上 Gemma 4 開放模型改成互動裝置。
    </p>
  </div>
);

const BoothXr: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>展區 · 02</div>
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
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>展區 · 03</div>
    <h2 style={{ ...h2, fontSize: 58, marginTop: 22 }}>Gemini 奇趣影棚</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
      <Bullet text="站上定點拍照，Gemini 重新生成整個場景與造型" sub="換掉的是背景、服裝、甚至物種，不只是套濾鏡" />
      <Bullet text="掃 QR 取圖，24 小時後自動刪除" sub="畫面上就寫著這句——這個細節比生成品質更值得注意" />
    </div>
    <div style={{ display: 'flex', gap: 24, marginTop: 34, height: 400 }}>
      <div style={{ flex: '1.4', borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${line}` }}>
        <img src={studioWide} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: '1', borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${line}` }}>
        <img src={studioResult} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  </div>
);

const Workshop: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>我參加的工作坊</div>
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

const Stack: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 44, alignItems: 'center' }}>
    <div style={{ flex: '1.1' }}>
      <div style={eyebrow}>ADK 在哪一層</div>
      <h2 style={{ ...h2, fontSize: 52, marginTop: 22 }}>整個 agent stack<br />分四層</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 34 }}>
        <Layer n="01" name="Agent Studio" desc="低程式碼視覺工作區" color={yellow} />
        <Layer n="02" name="Managed Agents API" desc="託管服務" color={green} />
        <Layer n="03" name="Antigravity · CLI" desc="開發者工具" color="#a48ff0" />
        <Layer n="04" name="ADK 2.0" desc="完全用程式控制" color="#1a73e8" />
      </div>
      <p style={{ fontSize: 24, color: muted, marginTop: 28, marginBottom: 0 }}>
        A2A 協定貫穿四層，不同層做出來的 agent 可以互相呼叫。
      </p>
    </div>
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${line}` }}>
        <img src={agentPlatform} alt="" style={{ width: '100%', display: 'block' }} />
      </div>
      <div style={{ fontSize: 22, color: muted, lineHeight: 1.5 }}>
        主舞台講的 Agent Platform 內部：Registry、Gateway、Identity、Observability——
        全是「怎麼讓 agent 上線不出事」的東西。
      </div>
    </div>
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
    <div style={eyebrow}>開發工具</div>
    <h2 style={{ ...h2, fontSize: 56, marginTop: 22 }}>你寫程式的工具也在 agent 化</h2>
    <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
      <Surface icon="▤" name="桌面 App" sub="Agent Manager" desc="視覺化編排多個 agent，跨 macOS / Windows / Linux" color="#1a73e8" />
      <Surface icon=">_" name="CLI" sub="agy" desc="輕量的終端機介面，適合 SSH 與雲端環境" color={green} />
      <Surface icon="◎" name="IDE" sub="Antigravity IDE" desc="視覺化檢查與多工作區操作，接近 VS Code 的用法" color={yellow} />
    </div>
    <div
      style={{
        marginTop: 30,
        padding: '20px 26px',
        background: card,
        border: `1px solid ${line}`,
        borderRadius: 'var(--osd-radius)',
        display: 'flex',
        alignItems: 'baseline',
        gap: 20,
      }}
    >
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#1a73e8' }}>共用同一套引擎</span>
      <span style={{ fontSize: 25, color: muted }}>
        三個介面切換不掉狀態，slash 指令、subagent、skill 全部通用：
        <span style={{ color: 'var(--osd-text)', fontFamily: 'var(--osd-font-display)', fontSize: 23 }}>
          {' '}/browser　/goal　.agents/skills/
        </span>
      </span>
    </div>
  </div>
);

const Codelab: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>實戰案例</div>
    <h2 style={{ ...h2, fontSize: 54, marginTop: 20 }}>五個指令串成一條工作流</h2>

    <div style={{ marginTop: 32 }}>
      <Band
        label="情境"
        text="一支 1,000 行的 legacy index.html，沒有文件、沒有測試，要在上線前交出 AI 解算器與平衡數據"
        color={muted}
      />
    </div>

    <div style={{ display: 'flex', gap: 16, marginTop: 22 }}>
      <Step5 n="01" cmd="/grill-me" what="反過來訪談你，把架構與 DOM 掛勾問清楚" color="#5f6368" />
      <Step5 n="02" cmd="/goal" what="給目標，讓它自己寫進解算器" color="#1a73e8" />
      <Step5 n="03" cmd="/browser" what="開沙箱瀏覽器截圖，驗證畫面與狀態" color={green} />
      <Step5 n="04" cmd="/schedule" what="跑 100 次收遙測，產出平衡報告" color={yellow} />
      <Step5 n="05" cmd="Custom Skill" what="把這套 SOP 收成自己的 /run-stress-test" color="#a48ff0" />
    </div>

    <div style={{ marginTop: 22 }}>
      <Band
        label="結果"
        text="調整方塊生成機率 10% → 15%，通關率從 20% 拉到 35%，而且是用自己編的指令驗證出來的"
        color={green}
      />
    </div>

    <p style={{ fontSize: 21, color: muted, marginTop: 24, marginBottom: 0 }}>
      重點不是遊戲，是最後一步：<span style={{ color: 'var(--osd-text)' }}>流程本身變成可以重複執行的指令</span>。
    </p>
  </div>
);

const Itinerary: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>先講行程</div>
    <h2 style={{ ...h2, fontSize: 58, marginTop: 22 }}>五天在上海做什麼</h2>
    <div style={{ marginTop: 34 }}>
      <DayRow date="8/10" day="一" what="抵達、報到" tag="移動" color={muted} />
      <DayRow date="8/11" day="二" what="Greater China GDG Summit：上午 Cloud 分享、下午各地組織者討論" tag="社群" color={green} />
      <DayRow date="8/12" day="三" what="I/O Connect Day 1：Keynote、AI 與 Chrome 場、展區" tag="大會" color="#1a73e8" />
      <DayRow date="8/13" day="四" what="I/O Connect Day 2：Android 與 Cloud 場、ADK 工作坊、開發者沙龍" tag="大會" color="#1a73e8" />
      <DayRow date="8/14" day="五" what="APAC GDE Summit（陪同參與）、返程" tag="社群" color={yellow} />
    </div>
    <p style={{ fontSize: 26, color: muted, marginTop: 32, marginBottom: 0 }}>
      公開的大會只有中間兩天，前後各一天是社群自己的場子。以下照這個順序講。
    </p>
  </div>
);

const BreakGdg: Page = () => (
  <DayBreak date="8 / 11" title="Greater China GDG Summit" sub="大會前一天，大中華區的 GDG 組織者先聚一次" />
);

const GdgWhat: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>8/11 · 這是什麼</div>
      <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>大中華區<br />GDG 領導力峰會</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
        <Bullet text="在 Google 上海辦公室，限 GDG 組織者參加" sub="台灣、香港、大陸各城市的社群負責人都在" />
        <Bullet text="半天聽 Google，半天彼此討論" sub="上午是 Cloud 團隊的分享，下午換我們自己講" />
      </div>
    </div>
    <div style={{ flex: '0 0 34%', borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${line}` }}>
      <img src={gdgPoster} alt="" style={{ width: '100%', display: 'block' }} />
    </div>
  </div>
);

const GdgMorning: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>8/11 · 上午</div>
    <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>Google Cloud 團隊的分享</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 42 }}>
      <Bullet text="Cloud 這一年往哪走" sub="重心已經整個轉到 agent，跟隔天大會的主軸完全一致" />
      <Bullet text="社群能拿到什麼資源" sub="活動支援、講者、學習資源怎麼申請" />
      <Bullet text="＿＿＿＿＿＿" sub="（這裡等你補：上午最有記憶點的一段）" />
    </div>
  </div>
);

const GdgAfternoon: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>8/11 · 下午</div>
      <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>換各地組織者<br />自己討論</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 38 }}>
        <Bullet text="開放式分組，用雙腳法則" sub="覺得這桌沒你要的東西，就換一桌，沒人會介意" />
        <Bullet text="討論的都是實務問題" sub="怎麼找講者、怎麼讓人真的來、怎麼讓社群不靠一個人撐著" />
      </div>
    </div>
    <PhotoSide src={gdgSummit} />
  </div>
);

const GdgFun: Page = () => (
  <div style={{ ...page, justifyContent: 'center' }}>
    <div style={eyebrow}>8/11 · 順帶一提</div>
    <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>中國的 Google<br />不叫 Google</h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 40, marginBottom: 0, lineHeight: 1.6 }}>
      辦公室門口的公司登記名稱跟你想的不一樣——<br />
      這種小地方最能感覺到「這裡的規則不同」。
    </p>
    <p style={{ fontSize: 26, color: muted, marginTop: 40, marginBottom: 0 }}>
      （照片待補：PXL_20260811_042808026、PXL_20260811_020924218）
    </p>
  </div>
);

const BreakIo: Page = () => (
  <DayBreak date="8 / 12 – 13" title="I/O Connect China" sub="上海世博中心，兩天，61 場" />
);

const Venue: Page = () => (
  <div style={{ ...fill, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 140px 110px', color: '#fff' }}>
    <PhotoBg src={venue} dim={0.5} />
    <div style={{ position: 'relative' }}>
      <div style={{ ...eyebrow, color: '#8ab4f8' }}>8/12 · 進場</div>
      <h2 style={{ ...h2, fontSize: 66, marginTop: 22 }}>四個主軸，掛在中庭</h2>
      <p style={{ fontSize: 32, color: '#dadce0', marginTop: 24, marginBottom: 0, lineHeight: 1.6 }}>
        AI、Android、Cloud、Chrome 四面吊旗，走進去就知道兩天要講什麼。<br />
        場地大到走完一圈要十分鐘，展區跟議程廳是分開的兩塊。
      </p>
    </div>
  </div>
);

const VenueMap: Page = () => (
  <div style={{ ...page }}>
    <div style={eyebrow}>8/12 · 會場</div>
    <h2 style={{ ...h2, fontSize: 54, marginTop: 20 }}>大概長這樣</h2>
    <svg viewBox="0 0 1600 520" style={{ width: '100%', height: 'auto', marginTop: 28 }} role="img"
         aria-label="會場配置示意圖：入口進來是中庭，左邊是主會場與議程廳，右邊是展區，外側是半戶外的開發者沙龍">
      <rect x="30" y="30" width="1540" height="460" rx="16" fill="none" stroke={line} strokeWidth="2" strokeDasharray="6 5" />

      <rect x="70" y="70" width="420" height="180" rx="12" fill="rgba(26,115,232,0.07)" stroke="#1a73e8" strokeWidth="2" />
      <text x="96" y="120" fontSize="30" fontFamily="ui-monospace, monospace" fill="#1a73e8">主會場</text>
      <text x="96" y="158" fontSize="22" fill={muted}>Keynote · 開場遊戲</text>
      <text x="96" y="192" fontSize="22" fill={muted}>能坐下近三千人</text>

      <rect x="70" y="278" width="420" height="180" rx="12" fill={card} stroke={line} strokeWidth="2" />
      <text x="96" y="328" fontSize="30" fontFamily="ui-monospace, monospace" fill="var(--osd-text)">議程廳 ×2</text>
      <text x="96" y="366" fontSize="22" fill={muted}>兩軌並行，會撞場</text>
      <text x="96" y="400" fontSize="22" fill={muted}>AI / Chrome / Android / Cloud</text>

      <rect x="530" y="70" width="380" height="388" rx="12" fill="rgba(232,116,0,0.06)" stroke={yellow} strokeWidth="2" />
      <text x="556" y="120" fontSize="30" fontFamily="ui-monospace, monospace" fill={yellow}>中庭</text>
      <text x="556" y="158" fontSize="22" fill={muted}>四面吊旗掛這裡</text>
      <text x="556" y="196" fontSize="22" fill={muted}>AI · Android</text>
      <text x="556" y="228" fontSize="22" fill={muted}>Cloud · Chrome</text>
      <text x="556" y="286" fontSize="22" fill={muted}>報到、動線交會點</text>
      <text x="556" y="330" fontSize="22" fill={muted}>Google 立體字打卡</text>

      <rect x="950" y="70" width="380" height="388" rx="12" fill="rgba(24,128,56,0.06)" stroke={green} strokeWidth="2" />
      <text x="976" y="120" fontSize="30" fontFamily="ui-monospace, monospace" fill={green}>展區</text>
      <text x="976" y="158" fontSize="22" fill={muted}>Gemini 奇趣影棚</text>
      <text x="976" y="192" fontSize="22" fill={muted}>AI 社會公益 ×3</text>
      <text x="976" y="226" fontSize="22" fill={muted}>Android XR 試戴</text>
      <text x="976" y="260" fontSize="22" fill={muted}>WebMCP · 邊緣推論</text>
      <text x="976" y="294" fontSize="22" fill={muted}>出海創業加速器</text>
      <text x="976" y="352" fontSize="22" fill={muted}>排隊最久的一塊</text>

      <rect x="1370" y="70" width="160" height="388" rx="12" fill="rgba(164,143,240,0.06)" stroke="#a48ff0" strokeWidth="2" />
      <text x="1392" y="120" fontSize="26" fontFamily="ui-monospace, monospace" fill="#a48ff0">沙龍</text>
      <text x="1392" y="156" fontSize="20" fill={muted}>半戶外</text>
      <text x="1392" y="184" fontSize="20" fill={muted}>綠植柱</text>
      <text x="1392" y="212" fontSize="20" fill={muted}>白方凳</text>
      <text x="1392" y="256" fontSize="20" fill={muted}>工作坊</text>
      <text x="1392" y="284" fontSize="20" fill={muted}>也在這側</text>

      <polygon points="30,250 8,232 8,268" fill={muted} />
      <text x="14" y="300" fontSize="20" fill={muted}>入口</text>
    </svg>
    <p style={{ fontSize: 24, color: muted, marginTop: 24, marginBottom: 0 }}>
      示意圖，不是官方平面圖。重點是：議程廳和展區在兩側，中間隔著中庭——換場要走一段。
    </p>
  </div>
);

const KeynoteGame: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>8/12 · Keynote</div>
      <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>開場是一場<br />跟台下玩的遊戲</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 38 }}>
        <Bullet text="鏡頭掃過台下，即時找出觀眾" sub="不是預錄，是當場辨識、當場生成" />
        <Bullet text="依照找到的人生成對應的互動物件" sub="整段沒有一句「我們的模型有多強」，直接讓你看它在做什麼" />
      </div>
      <p style={{ fontSize: 24, color: muted, marginTop: 34, marginBottom: 0 }}>
        影片另外放（連結待補），不進簡報檔避免檔案過大。
      </p>
    </div>
    <PhotoSide src={keynoteGame} />
  </div>
);

const Agentic: Page = () => (
  <div style={{ ...page, position: 'relative', justifyContent: 'center', color: '#fff' }}>
    <PhotoBg src={theme} dim={0.68} />
    <div style={{ position: 'relative' }}>
      <div style={{ ...eyebrow, color: '#8ab4f8' }}>一個翻譯</div>
      <h2 style={{ ...h2, fontSize: 78, marginTop: 26 }}>Agent 在這裡<br />叫「智能體」</h2>
      <p style={{ fontSize: 34, color: '#dadce0', marginTop: 44, marginBottom: 0, lineHeight: 1.7 }}>
        大會主題「智體新境」——不是「代理」，是「有智能的個體」。<br />
        翻譯選了哪個字，其實就說明了他們怎麼看這件事。
      </p>
    </div>
  </div>
);

const BreakGde: Page = () => (
  <DayBreak date="8 / 14" title="APAC GDE Summit" sub="大會後一天，亞太區的 Google Developer Experts" />
);

const GdeSummit: Page = () => (
  <div style={{ ...page, flexDirection: 'row', gap: 56, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <div style={eyebrow}>8/14 · 陪同參與</div>
      <h2 style={{ ...h2, fontSize: 54, marginTop: 22 }}>亞太區 GDE 的<br />年度聚會</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 38 }}>
        <Bullet text="形式是 panel 加現場 Q&A" sub="用 slido 匿名提問，問題直接投在旁邊的螢幕上" />
        <Bullet text="問的都是很實際的疑問" sub="工具那麼多要怎麼選、某某功能什麼時候上行動裝置" />
      </div>
      <p style={{ fontSize: 24, color: muted, marginTop: 34, marginBottom: 0 }}>
        我是陪同參與，這段口述帶過。
      </p>
    </div>
    <PhotoSide src={gdeSummit} />
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
  <div style={{ ...fill, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 140px', color: '#fff' }}>
    <PhotoBg src={googleSign} dim={0.6} />
    <div style={{ position: 'relative', display: 'flex', gap: 12, marginBottom: 40 }}>
      <Dot c="#8ab4f8" />
      <Dot c="#f28b82" />
      <Dot c="#fdd663" />
      <Dot c="#81c995" />
    </div>
    <h2 style={{ ...h2, fontSize: 76, position: 'relative' }}>
      工具寫一次，<br />到處都能接
    </h2>
    <p style={{ fontSize: 34, color: '#dadce0', marginTop: 40, marginBottom: 0, position: 'relative' }}>
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
  Itinerary,

  // ── 8/11 GDG Summit ──
  BreakGdg,
  GdgWhat,
  GdgMorning,
  GdgAfternoon,
  GdgFun,

  // ── 8/12–13 I/O Connect ──
  BreakIo,
  Where,
  WhyChina,
  Venue,
  VenueMap,
  KeynoteGame,
  Agentic,
  Thesis,
  Sessions,
  Shift1,
  Shift2,
  BoothArt,
  BoothXr,
  BoothStudio,
  Workshop,
  Stack,
  Shenzhen,
  Tooling,
  Codelab,

  // ── 8/14 GDE Summit ──
  BreakGde,
  GdeSummit,

  // ── 收尾 ──
  Bridge,
  Takeaway,
  End,
] satisfies Page[];
