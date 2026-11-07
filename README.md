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
