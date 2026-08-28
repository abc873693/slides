# 公開簡報

社群分享用的簡報集散地。用 [open-slide](https://github.com/1weiho/open-slide) 撰寫，每份簡報是一個 React 元件陣列，畫在固定 1920×1080 的畫布上。

推上 `main` 會自動部署到 GitHub Pages。

## 目前的簡報

| 目錄 | 內容 |
|---|---|
| `slides/io-connect-2026/` | Google I/O Connect China 2026 參加分享（15 頁） |
| `slides/getting-started/` | open-slide 官方範例，不需要可以刪 |

## 本機開發

```bash
npm install
npm run dev            # http://localhost:5173
npm run dev -- --host <你的內網 IP>    # 只綁指定網卡，給同網段的人看
```

進入簡報後按 `F` 全螢幕播放，方向鍵翻頁。

## 新增一份簡報

在 `slides/` 下開一個 kebab-case 目錄，放一個 `index.tsx`：

```tsx
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => <div style={{ width: '100%', height: '100%' }}>…</div>;

export const meta: SlideMeta = { title: '標題', createdAt: '<ISO 時間>' };
export default [Cover] satisfies Page[];
```

寫之前先讀 `.agents/skills/slide-authoring/SKILL.md`——那份是 open-slide 附的規範，講畫布尺寸、字級、垂直預算怎麼算。**畫布不會捲動，超過 1080px 的內容會被直接裁掉**，所以每頁動筆前要先算高度。

圖片放 `slides/<id>/assets/`，用 `import x from './assets/x.jpg'` 引入。

## 部署

`.github/workflows/pages.yml` 做三件事：

1. `npm run build`，帶 `OPEN_SLIDE_BASE=/<repo>/`（GitHub Pages 的 project site 掛在子路徑，資源要加前綴）
2. `cp dist/index.html dist/404.html`（Pages 沒有 rewrite，SPA 深層路由靠 404 導回）
3. 上傳並部署

第一次要到 repo 的 **Settings → Pages → Source** 選 **GitHub Actions**。

## 素材

`photos/` 和 `notes/` 已在 `.gitignore`，不會上傳——原始照片與逐字稿留在本機，只有挑過、確認可公開的才複製進 `slides/<id>/assets/`。

**公開前的檢查**：內部系統的數值與識別資訊、未公開的產品規劃、清楚入鏡的他人臉孔。
