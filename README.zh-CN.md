# 翻译自述文件操作

## 文档翻译

-   [英语](DOCUMENTATION.md)
-   [简体中文](DOCUMENTATION.zh-CN.md)
-   [繁体中文](DOCUMENTATION.zh-TW.md)
-   [印地语](DOCUMENTATION.hi.md)
-   [法语](DOCUMENTATION.fr.md)
-   [阿拉伯](DOCUMENTATION.ar.md)

**GitHub Action 将文档翻译成任何语言**

这是一个 GitHub Action，可自动将存储库中的文档翻译为指定语言。

## 设置

1.  **添加工作流程文件**到您的项目（例如`.github/workflows/documentation.yml`):

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

执行以下操作：

Linux / macOS：

    $ export NODE_OPTIONS=--openssl-legacy-provider

视窗：

    $ setx NODE_OPTIONS=--openssl-legacy-provider

然后：

    $ npm run build

将构建一个新包并将其存储在`dist`目录。

## 配置

### 选项

您可以使用以下选项进一步配置操作：

-   `LANG`：您要将文档翻译成的语言。默认为简体中文。可以在下面找到支持的语言。
    （默认：`zh-CH`） （必需的：`false`)

## 支持的语言

可以在此处找到支持的语言<https://cloud.google.com/translate/docs/languages>

### 问题

查看[这里](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)对于与此操作相关的问题。

### 发展

随时欢迎提出建议和贡献！

### 执照

[和](./LICENSE)
