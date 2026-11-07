const CJK = "\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF";

const brandTerms: Array<[string, string]> = [
  ["github pages", "GitHub Pages"],
  ["github", "GitHub"],
  ["javascript", "JavaScript"],
  ["typescript", "TypeScript"],
  ["nodejs", "Node.js"],
  ["node.js", "Node.js"],
  ["vitepress", "VitePress"],
  ["vuejs", "Vue.js"],
  ["vue.js", "Vue.js"],
  ["reactjs", "React"],
  ["npm", "npm"]
];

const requiredReadmeSections: Array<[string, string[]]> = [
  ["installation", ["installation", "安裝"]],
  ["usage", ["usage", "使用方式", "用法"]],
  ["api", ["api"]],
  ["contributing", ["contributing", "參與貢獻", "貢獻"]],
  ["license", ["license", "授權"]]
];

export type IssueSeverity = "error" | "warning" | "info";

export interface LintIssue {
  rule: string;
  message: string;
  line: number;
  column: number;
  severity: IssueSeverity;
  fix: string;
}

export interface LintOptions {
  filename?: string;
  checkReadme?: boolean;
}

export interface LintResult {
  filename: string;
  ok: boolean;
  issues: LintIssue[];
}

export function lintMarkdown(markdown: string, options: LintOptions = {}): LintResult {
  const filename = options.filename || "README.md";
  const lines = markdown.split(/\r?\n/);
  const issues: LintIssue[] = [];
  let inFence = false;
  const headings: string[] = [];

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      return;
    }

    const heading = trimmed.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      headings.push(normalizeHeading(heading[1]));
    }

    if (inFence) return;

    findSpacingIssues(line, lineNumber, issues);
    findPunctuationIssues(line, lineNumber, issues);
    findBrandIssues(line, lineNumber, issues);
  });

  if (options.checkReadme !== false) {
    findMissingReadmeSections(headings, issues, filename);
  }

  return {
    filename,
    ok: issues.length === 0,
    issues
  };
}

export function formatMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;

  return lines.map((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      return line;
    }

    if (inFence) return line;

    return fixBrandTerms(fixPunctuation(fixSpacing(line)));
  }).join("\n");
}

export function formatReport(result: LintResult): string {
  if (result.ok) {
    return `${result.filename}\n  no issues found`;
  }

  const rows = result.issues.map((issue) => {
    const location = `${issue.line}:${issue.column}`;
    return `  ${location.padEnd(7)} ${issue.rule.padEnd(18)} ${issue.message}`;
  });

  return `${result.filename}\n${rows.join("\n")}`;
}

function findSpacingIssues(line: string, lineNumber: number, issues: LintIssue[]): void {
  const patterns = [
    {
      regex: new RegExp(`[${CJK}][A-Za-z0-9]`, "g"),
      message: "中文與英文或數字之間建議加空格"
    },
    {
      regex: new RegExp(`[A-Za-z0-9][${CJK}]`, "g"),
      message: "英文或數字與中文之間建議加空格"
    }
  ];

  const matches: Array<{ index: number; message: string }> = [];
  for (const pattern of patterns) {
    for (const match of line.matchAll(pattern.regex)) {
      matches.push({ index: match.index, message: pattern.message });
    }
  }

  if (matches.length === 0) return;

  const first = matches.sort((a, b) => a.index - b.index)[0];
  issues.push({
    rule: "missing-space",
    message: `${first.message}（本行 ${matches.length} 處）`,
    line: lineNumber,
    column: first.index + 1,
    severity: "warning",
    fix: "在中英文或數字之間補上一個半形空格"
  });
}

function findPunctuationIssues(line: string, lineNumber: number, issues: LintIssue[]): void {
  if (!new RegExp(`[${CJK}]`).test(line)) return;

  const regex = /[,.!?;:]/g;
  const matches = [...line.matchAll(regex)];

  if (matches.length === 0) return;

  issues.push({
    rule: "zh-punctuation",
    message: `中文段落建議使用全形標點（本行 ${matches.length} 處）`,
    line: lineNumber,
    column: matches[0].index + 2,
    severity: "warning",
    fix: "把半形標點換成中文全形標點"
  });
}

function findBrandIssues(line: string, lineNumber: number, issues: LintIssue[]): void {
  const usedRanges: Array<[number, number]> = [];

  for (const [wrong, correct] of brandTerms) {
    const regex = new RegExp(`\\b${escapeRegExp(wrong)}\\b`, "gi");

    for (const match of line.matchAll(regex)) {
      if (match[0] === correct) continue;
      if (usedRanges.some(([start, end]) => match.index < end && match.index + match[0].length > start)) continue;

      usedRanges.push([match.index, match.index + match[0].length]);

      issues.push({
        rule: "brand-case",
        message: `${match[0]} 建議寫成 ${correct}`,
        line: lineNumber,
        column: match.index + 1,
        severity: "warning",
        fix: `改成 ${correct}`
      });
    }
  }
}

function findMissingReadmeSections(headings: string[], issues: LintIssue[], filename: string): void {
  const existing = new Set(headings);

  for (const [section, aliases] of requiredReadmeSections) {
    if (aliases.some((alias) => existing.has(alias))) continue;

    issues.push({
      rule: "missing-section",
      message: `${filename} 缺少 ${titleCase(section)} 區塊`,
      line: 1,
      column: 1,
      severity: "info",
      fix: `新增 ## ${titleCase(section)}`
    });
  }
}

function fixSpacing(line: string): string {
  return line
    .replace(new RegExp(`([${CJK}])([A-Za-z0-9])`, "g"), "$1 $2")
    .replace(new RegExp(`([A-Za-z0-9])([${CJK}])`, "g"), "$1 $2")
    .replace(/\b(Vue|React|Angular|Svelte)(\d+)\b/gi, (_, name: string, version: string) => {
      const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      return `${normalized} ${version}`;
    });
}

function fixPunctuation(line: string): string {
  if (!new RegExp(`[${CJK}]`).test(line)) return line;

  return line
    .replace(/,/g, "，")
    .replace(/\.(\s|$)/g, "。$1")
    .replace(/!(\s|$)/g, "！$1")
    .replace(/\?(\s|$)/g, "？$1")
    .replace(/;(\s|$)/g, "；$1")
    .replace(/:(\s|$)/g, "：$1");
}

function fixBrandTerms(line: string): string {
  return brandTerms.reduce((current, [wrong, correct]) => {
    const regex = new RegExp(`\\b${escapeRegExp(wrong)}\\b`, "gi");
    return current.replace(regex, correct);
  }, line);
}

function normalizeHeading(heading: string): string {
  return heading
    .replace(/[`*_#[\]()]/g, "")
    .trim()
    .toLowerCase();
}

function titleCase(value: string): string {
  if (value === "api") return "API";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
