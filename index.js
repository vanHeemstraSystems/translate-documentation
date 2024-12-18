import { unified } from 'unified'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { getInput } from '@actions/core'
import translate from 'libretranslate'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import visit from 'unist-util-visit'
import simpleGit from 'simple-git'

const git = simpleGit()

const toAst = markdown => {
  return unified().use(parse).parse(markdown)
}

const toMarkdown = ast => {
  return unified().use(stringify).stringify(ast)
}

async function translateText(text, targetLanguage) {
  try {
    // You can specify a specific server if needed
    const translation = await translate(text, {
      to: targetLanguage,
      from: 'auto',
      server: 'https://libretranslate.de' // Optional: choose a public instance
    });
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text if translation fails
  }
}

async function translateDocumentation() {
  try {
    const mainDir = '.'
    const DOCUMENTATION = readdirSync(mainDir).includes('documentation.md')
      ? 'documentation.md'
      : 'DOCUMENTATION.md'
    const lang = getInput('LANG') || 'zh-CN'
    
    const documentation = readFileSync(join(mainDir, DOCUMENTATION), {
      encoding: 'utf8'
    })
    const documentationAST = toAst(documentation)

    // Translate nodes asynchronously
    await new Promise((resolve, reject) => {
      const promises = [];
      visit(documentationAST, async (node) => {
        if (node.type === 'text' && node.value.trim()) {
          const promise = translateText(node.value, lang)
            .then(translatedText => {
              node.value = translatedText;
            });
          promises.push(promise);
        }
      });

      Promise.all(promises)
        .then(() => {
          writeFileSync(
            join(mainDir, `DOCUMENTATION.${lang}.md`),
            toMarkdown(documentationAST),
            'utf8'
          );
          resolve();
        })
        .catch(reject);
    });

    // Commit and push changes
    await git.add('./*');
    await git.addConfig('user.name', 'github-actions[bot]');
    await git.addConfig(
      'user.email', 
      '41898282+github-actions[bot]@users.noreply.github.com'
    );
    await git.commit(
      `docs: Added DOCUMENTATION.${lang}.md translation via LibreTranslate`
    );
    await git.pull();
    await git.push();

    console.log('Translation and commit completed successfully');
  } catch (error) {
    console.error('Translation process failed:', error);
    process.exit(1);
  }
}

translateDocumentation();
