import unifiedFunction from "unified";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { getInput } from "@actions/core";
import $ from "google-translate-api";
import parse from "remark-parse";
import stringify from "remark-stringify";
import visit from "unist-util-visit";
import simpleGit from "simple-git";
const git = simpleGit();

const toAst = async (markdown) => {
  const ast = await unifiedFunction().use(stringify).parse(markdown)
  // return unified().use(parse).parse(markdown);
  return ast;
};

const toMarkdown = async (ast) => {
  const markdown = await unifiedFunction().use(stringify).stringify(ast);
  // return unified().use(stringify).stringify(ast);
  return markdown;
};

const mainDir = ".";
let DOCUMENTATION = readdirSync(mainDir).includes("documentation.md")
  ? "documentation.md"
  : "DOCUMENTATION.md";
const lang = getInput("LANG") || "zh-CN";
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
