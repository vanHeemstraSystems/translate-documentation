# ترجمة الإجراء التمهيدي

## ترجمة الوثائق

-   [إنجليزي](DOCUMENTATION.md)
-   [الصينية المبسطة](DOCUMENTATION.zh-CN.md)
-   [الصينية التقليدية](DOCUMENTATION.zh-TW.md)
-   [الهندية](DOCUMENTATION.hi.md)
-   [فرنسي](DOCUMENTATION.fr.md)
-   [عربى](DOCUMENTATION.ar.md)

**إجراء GitHub لترجمة الوثائق إلى أي لغة**

هذا هو إجراء GitHub الذي يقوم تلقائيًا بترجمة الوثائق الموجودة في الريبو الخاص بك إلى لغة محددة.

## Setup

1.  **إضافة ملف سير العمل**لمشروعك (على سبيل المثال`.github/workflows/readme.yml`):

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

## يبني

قم بما يلي:

لينكس / ماك:

    $ export NODE_OPTIONS=--openssl-legacy-provider

ويندوز:

    $ setx NODE_OPTIONS=--openssl-legacy-provider

ثم:

    $ npm run build

سيتم إنشاء حزمة جديدة وتخزينها في ملف`dist`دليل.

## إعدادات

### خيارات

يمكنك تكوين الإجراء بشكل أكبر باستخدام الخيارات التالية:

-   `LANG`: اللغة التي تريد ترجمة الملف التمهيدي إليها. الافتراضي هو الصينية المبسطة. يمكن العثور على اللغات المدعومة أدناه.
    (تقصير:`zh-CH`) (مطلوب:`false`)

## اللغات المدعومة

اللغات المدعومة يمكن العثور عليها هنا<https://cloud.google.com/translate/docs/languages>

### مشاكل

يفحص[هنا](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)للقضايا المتعلقة بهذا الإجراء.

### تطوير

الاقتراحات والمساهمات هي دائما موضع ترحيب!

### رخصة

[مع](./LICENSE)
