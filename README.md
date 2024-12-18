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

1. **Add a workflow file** to your project (e.g. `.github/workflows/documentation.yml`):
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
