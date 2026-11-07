# API 參考

## `lintMarkdown(markdown, options)`

檢查 Markdown 文字並回傳報告。

```ts
import { lintMarkdown } from "docu-lint";

const result = lintMarkdown("使用Vue3開發一個Web App.");
console.log(result.issues);
```

## `formatMarkdown(markdown)`

在程式碼區塊以外套用安全的自動修正。

```ts
import { formatMarkdown } from "docu-lint";

formatMarkdown("使用Vue3開發一個Web App.");
// 使用 Vue 3 開發一個 Web App。
```

## `formatReport(result)`

把檢查結果轉成適合在終端機顯示的文字。
