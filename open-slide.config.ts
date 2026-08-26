import type { OpenSlideConfig } from '@open-slide/core';

// GitHub Pages 的 project site 掛在 /<repo>/ 底下，資源路徑要跟著加前綴。
// 本機開發維持 '/'，CI 用 OPEN_SLIDE_BASE 注入。
const openSlideConfig: OpenSlideConfig = {
  base: process.env.OPEN_SLIDE_BASE || '/',
};

export default openSlideConfig;
