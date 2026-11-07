# Playground

把一段 Markdown 貼進示範程式，看看檢查結果如何對應寫作原則。

```md
一個用javascript寫的README檢查工具,可以幫你檢查github專案文件.
```

預期的修正結果：

```md
一個用 JavaScript 寫的 README 檢查工具，可以幫你檢查 GitHub 專案文件。
```

::: tip
先從這個靜態頁面開始，之後可以換成一個小的 Vue 元件，直接從套件匯入 `lintMarkdown()` 與 `formatMarkdown()`。
:::
