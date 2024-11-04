import { unified } from 'unified'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { getInput } from '@actions/core'
import $ from 'google-translate-api'
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

const mainDir = '.'
let DOCUMENTATION = readdirSync(mainDir).includes('documentation.md')
  ? 'documentation.md'
  : 'DOCUMENTATION.md'
const lang = getInput('LANG') || 'zh-CN'
const documentation = readFileSync(join(mainDir, DOCUMENTATION), {
  encoding: 'utf8'
})
const documentationAST = toAst(documentation)
console.log('AST CREATED AND READ')

let originalText = []

visit(documentationAST, async node => {
  if (node.type === 'text') {
    originalText.push(node.value)
    node.value = (await $(node.value, { to: lang })).text
  }
})

const translatedText = originalText.map(async text => {
  return (await $(text, { to: lang })).text
})

async function writeToFile () {
  try {
    await Promise.all(translatedText)
    writeFileSync(
      join(mainDir, `DOCUMENTATION.${lang}.md`),
      toMarkdown(documentationAST),
      'utf8'
    )
    console.log(`DOCUMENTATION.${lang}.md written`)
  } catch (error) {
    console.log('writeToFile error: ', error)
    throw new Error(error)
  }
}

async function commitChanges (lang) {
  try {
    console.log('commit started')
    await git.add('./*')
    await git.addConfig('user.name', 'github-actions[bot]')
    await git.addConfig(
      'user.email',
      '41898282+github-actions[bot]@users.noreply.github.com'
    )
    await git.commit(
      `docs: Added DOCUMENTATION."${lang}".md translation via https://github.com/vanHeemstraSystems/translate-documentation`
    )
    console.log('finished commit')
    await git.push()
    console.log('pushed')
  } catch (error) {
    console.log('commitChanges error: ', error)
    throw new Error(error)
  }
}

async function translateDocumentation () {
  try {
    await writeToFile()
    await commitChanges(lang)
    console.log('Done')
  } catch (error) {
    console.log('translateDocumentation error: ', error)
    throw new Error(error)
  }
}

translateDocumentation()
