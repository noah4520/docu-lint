# API Reference

## `lintMarkdown(markdown, options)`

Checks Markdown text and returns a report.

```ts
import { lintMarkdown } from "docu-lint";

const result = lintMarkdown("使用Vue3開發一個Web App.");
console.log(result.issues);
```

## `formatMarkdown(markdown)`

Applies safe automatic fixes outside fenced code blocks.

```ts
import { formatMarkdown } from "docu-lint";

formatMarkdown("使用Vue3開發一個Web App.");
// 使用 Vue 3 開發一個 Web App。
```

## `formatReport(result)`

Turns a lint result into terminal-friendly text.
