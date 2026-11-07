import { defineConfig } from "vitepress";

export default defineConfig({
  title: "docu-lint",
  description: "檢查 README 與技術文件寫作問題的 Markdown 小工具",

  locales: {
    root: {
      label: "繁體中文",
      lang: "zh-TW"
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      description: "Markdown writing checks for README and technical docs.",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/en/guide/" },
          { text: "API", link: "/en/api/" },
          { text: "Playground", link: "/en/playground/" }
        ],
        sidebar: {
          "/en/guide/": [{ text: "Introduction", link: "/en/guide/" }],
          "/en/api/": [{ text: "API Reference", link: "/en/api/" }],
          "/en/playground/": [{ text: "Playground", link: "/en/playground/" }]
        }
      }
    }
  },

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
