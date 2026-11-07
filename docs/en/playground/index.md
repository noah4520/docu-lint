# Playground

Paste a Markdown snippet into the demo app and show students how lint feedback maps to writing principles.

```md
一個用javascript寫的README檢查工具,可以幫你檢查github專案文件.
```

Expected fix:

```md
一個用 JavaScript 寫的 README 檢查工具，可以幫你檢查 GitHub 專案文件。
```

::: tip Demo idea
Start with this static page, then replace it with a small Vue component that imports `lintMarkdown()` and `formatMarkdown()` from the package.
:::
