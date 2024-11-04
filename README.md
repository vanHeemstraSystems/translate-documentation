# Translate Readme Action

## DOCUMENTATION Translation
- [English](DOCUMENTATION.md)
- [简体中文](DOCUMENTATION.zh-CN.md)
- [繁体中文](DOCUMENTATION.zh-TW.md)
- [हिंदी](DOCUMENTATION.hi.md)
- [Française](DOCUMENTATION.fr.md)
- [عربى](DOCUMENTATION.ar.md)

**GitHub Action to translate Documentation to any language**

This is a GitHub Action that automatically translate the documentation in your repo to a specified language.

## Setup

1. **Add a workflow file** to your project (e.g. `.github/workflows/readme.yml`):
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
      # ISO Langusge Codes: https://cloud.google.com/translate/docs/languages  
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

## Build

Do the following:

Linux / macOS:

```
$ export NODE_OPTIONS=--openssl-legacy-provider
```

Windows:

```
$ setx NODE_OPTIONS=--openssl-legacy-provider
```

Then:

```
$ npm run build
```

A new package will be build and stored in the ```dist``` directory.

## Configuration

### Options

You can configure the action further with the following options:

- `LANG`: The language you want to translate your readme to. The default is Simplified Chinese. The supported languages can be found below.
  (default: `zh-CH`) (required: `false`)

## Supported Languages

Languages supported can be found here https://cloud.google.com/translate/docs/languages

### Issues

Check [here](https://github.com/vanHeemstraSystems/translate-documentation/issues/1) for issues related to this action.

### Development

Suggestions and contributions are always welcome!

### LICENSE

[MIT](./LICENSE)
