import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-TW",
  title: "docu-lint",
  description: "檢查 README 與技術文件寫作問題的 Markdown 小工具",

  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "Playground", link: "/playground/" }
    ],
    sidebar: {
      "/guide/": [{ text: "簡介", link: "/guide/" }],
      "/api/": [{ text: "API 參考", link: "/api/" }],
      "/playground/": [{ text: "Playground", link: "/playground/" }]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/noah4520/docu-lint" }
    ]
  }
});
