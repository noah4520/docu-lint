# docu-lint

> 一個幫 README 與技術文件檢查寫作問題的 Markdown 小工具。

`docu-lint` 會檢查中英文之間的空格、中文段落的標點，以及專有名詞的大小寫。在你把專案公開之前，先幫文件做一次基本的健康檢查。

## 適用情境

- README 公開前的自我檢查
- 中英文混排的技術文件校對
- 團隊文件規範的 CI 檢查

## 快速開始

```bash
npx docu-lint README.md
```

加上 `--fix` 會直接套用安全的自動修正：

```bash
npx docu-lint README.md --fix
```

> **注意：** `npx docu-lint` 要等套件發佈到 npm 之後才能使用。
> 在那之前，請先 clone 這個 repo，改跑本機的示範：
>
> ```bash
> npm install
> npm run demo
> ```

## 安裝

一般情況下不需要另外安裝。`npx` 會下載你指定的版本、執行 CLI，而且不會在專案裡留下多餘的檔案。

如果想把它加進專案裡固定使用：

```bash
npm install --save-dev docu-lint
```

## 使用方式

在 repo 裡執行內建的範例：

```bash
npm run demo
```

套用自動修正：

```bash
npm run demo:fix
```

查看目前的版本：

```bash
npx docu-lint --version
```

也可以直接在程式裡呼叫：

```ts
import { formatMarkdown, lintMarkdown } from "docu-lint";

const result = lintMarkdown("使用Vue3開發一個Web App.");
console.log(result.issues);

const fixed = formatMarkdown("使用Vue3開發一個Web App.");
console.log(fixed);
```

## API

### `lintMarkdown(markdown, options)`

檢查 Markdown 文字，回傳包含 `ok`、`filename` 與 `issues` 的報告。

### `formatMarkdown(markdown)`

在程式碼區塊以外套用安全的自動修正，回傳修正後的 Markdown。

### `formatReport(result)`

把檢查結果轉成適合在終端機顯示的文字。

## 參與貢獻

這個專案刻意保持精簡。適合第一次貢獻的方向包括：新增一條檢查規則、改善報告的輸出格式，或是幫文件網站補上範例。

## 授權

MIT
