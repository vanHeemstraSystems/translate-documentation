# 翻譯自述文件操作

## 文件翻譯

-   [English](DOCUMENTATION.md)
-   [簡體中文](DOCUMENTATION.zh-CN.md)
-   [繁體中文](DOCUMENTATION.zh-TW.md)
-   [印地語](DOCUMENTATION.hi.md)
-   [法語](DOCUMENTATION.fr.md)
-   [阿拉伯](DOCUMENTATION.ar.md)

**GitHub Action 將文件翻譯成任何語言**

這是一個 GitHub Action，可自動將儲存庫中的文件翻譯為指定語言。

## 設定

1.  **新增工作流程文件**到您的專案（例如`.github/workflows/readme.yml`):

```yaml
name: Translate DOCUMENTATION

on:
  push:
    branches:
      - main
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      # ISO Language Codes: https://cloud.google.com/translate/docs/languages  
      - name: Adding DOCUMENTATION - Chinese Simplified
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: zh-CN
      - name: Adding DOCUMENTATION - Chinese Traditional
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: zh-TW
      - name: Adding DOCUMENTATION - Hindi
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: hi
      - name: Adding DOCUMENTATION - Arabic
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: ar
      - name: Adding DOCUMENTATION - French
        uses: vanHeemstraSystems/translate-documentation@main
        with:
          LANG: fr
```

## 建造

執行以下操作：

Linux / macOS：

    $ export NODE_OPTIONS=--openssl-legacy-provider

視窗：

    $ setx NODE_OPTIONS=--openssl-legacy-provider

然後：

    $ npm run build

將建立一個新包並將其儲存在`dist`目錄。

## 配置

### 選項

您可以使用以下選項進一步配置操作：

-   `LANG`：您要將自述文件翻譯成的語言。預設為簡體中文。可以在下面找到支援的語言。
    (預設:`zh-CH`） （必需的：`false`)

## 支援的語言

可以在此處找到支援的語言<https://cloud.google.com/translate/docs/languages>

### 問題

查看[這裡](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)對於與此操作相關的問題。

### 發展

隨時歡迎提出建議和貢獻！

### 執照

[和](./LICENSE)
