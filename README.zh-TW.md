# 翻譯自述文件操作

## 文件翻譯

-   [英語](DOCUMENTATION.md)
-   [簡體中文](DOCUMENTATION.zh-CN.md)
-   [繁體中文](DOCUMENTATION.zh-TW.md)
-   [印地語](DOCUMENTATION.hi.md)
-   [法語](DOCUMENTATION.fr.md)
-   [阿拉伯](DOCUMENTATION.ar.md)

**GitHub Action to translate Documentation to any language**

這是一個 GitHub Action，可自動將儲存庫中的文件翻譯為指定語言。

## 設定

1.  **新增工作流程文件** to your project (e.g. `.github/workflows/documentation.yml`):

```yaml
name: Translate DOCUMENTATION

on:
  push:
    branches:
      - main
      - master

jobs:
  translate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language:
          - { code: zh-CN, name: Chinese Simplified }
          - { code: zh-TW, name: Chinese Traditional }
          - { code: hi, name: Hindi }
          - { code: ar, name: Arabic }
          - { code: fr, name: French }
    
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x  # Updated to a more recent LTS version
      
      - name: Adding DOCUMENTATION - ${{ matrix.language.name }}
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: ${{ matrix.language.code }}
```

## 建造

Do the following:

Linux / macOS：

    $ export NODE_OPTIONS=--openssl-legacy-provider

視窗：

    $ setx NODE_OPTIONS=--openssl-legacy-provider

Then:

    $ npm run build

將建立一個新包並將其儲存在`dist`目錄。

## 配置

### 選項

您可以使用以下選項進一步配置操作：

-   `LANG`：您要將文件翻譯成的語言。預設為簡體中文。支援的語言可以在下面找到。
    (預設:`zh-CH`） （必需的：`false`)

## 支援的語言

Languages supported can be found here <https://cloud.google.com/translate/docs/languages>

### 問題

查看[這裡](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)對於與此操作相關的問題。

### 發展

隨時歡迎提出建議和貢獻！

### 執照

[和](./LICENSE)
