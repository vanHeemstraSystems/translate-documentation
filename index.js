const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join } = require("path");
const core = require("@actions/core");
const $ = require("google-translate-api");
const unified = require("unified");
const parse = require("remark-parse");
const stringify = require("remark-stringify");
const visit = require("unist-util-visit");
const simpleGit = require("simple-git");
const git = simpleGit();

const toAst = (markdown) => {
  // return unified().use(parse).parse(markdown);
  return unified.use(parse).parse(markdown);
};

const toMarkdown = (ast) => {
  // return unified().use(stringify).stringify(ast);
  unified.use(stringify).stringify(ast);
};

const mainDir = ".";
let DOCUMENTATION = readdirSync(mainDir).includes("documentation.md")
  ? "documentation.md"
  : "DOCUMENTATION.md";
const lang = core.getInput("LANG") || "zh-CN";
const documentation = readFileSync(join(mainDir, DOCUMENTATION), { encoding: "utf8" });
const documentationAST = toAst(documentation);
console.log("AST CREATED AND READ");

let originalText = [];

visit(documentationAST, async (node) => {
  if (node.type === "text") {
    originalText.push(node.value);
    node.value = (await $(node.value, { to: lang })).text;
  }
});

const translatedText = originalText.map(async (text) => {
  return (await $(text, { to: lang })).text;
});

async function writeToFile() {
  await Promise.all(translatedText);
  writeFileSync(
    join(mainDir, `DOCUMENTATION.${lang}.md`),
    toMarkdown(documentationAST),
    "utf8"
  );
  console.log(`DOCUMENTATION.${lang}.md written`);
}

async function commitChanges(lang) {
  console.log("commit started");
  await git.add("./*");
  await git.addConfig("user.name", "github-actions[bot]");
  await git.addConfig(
    "user.email",
    "41898282+github-actions[bot]@users.noreply.github.com"
  );
  await git.commit(
    `docs: Added DOCUMENTATION."${lang}".md translation via https://github.com/vanHeemstraSystems/translate-documentation`
  );
  console.log("finished commit");
  await git.push();
  console.log("pushed");
}

async function translateDocumentation() {
  try {
    await writeToFile();
    await commitChanges(lang);
    console.log("Done");
  } catch (error) {
    throw new Error(error);
  }
}

translateDocumentation();
