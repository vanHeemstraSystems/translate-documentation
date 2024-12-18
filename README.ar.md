# ترجمة الإجراء التمهيدي

## ترجمة الوثائق

-   [إنجليزي](DOCUMENTATION.md)
-   [الصينية المبسطة](DOCUMENTATION.zh-CN.md)
-   [الصينية التقليدية](DOCUMENTATION.zh-TW.md)
-   [الهندية](DOCUMENTATION.hi.md)
-   [فرنسي](DOCUMENTATION.fr.md)
-   [عربى](DOCUMENTATION.ar.md)

**إجراء GitHub لترجمة الوثائق إلى أي لغة**

This is a GitHub Action that automatically translate the documentation in your repo to a specified language.

## يثبت

1.  **إضافة ملف سير العمل**لمشروعك (على سبيل المثال`.github/workflows/documentation.yml`):

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

-   `LANG`: اللغة التي تريد ترجمة مستنداتك إليها. الافتراضي هو الصينية المبسطة. يمكن العثور على اللغات المدعومة أدناه.
    (تقصير:`zh-CH`) (مطلوب:`false`)

## اللغات المدعومة

اللغات المدعومة يمكن العثور عليها هنا<https://cloud.google.com/translate/docs/languages>

### مشاكل

يفحص[هنا](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)للقضايا المتعلقة بهذا الإجراء.

### تطوير

الاقتراحات والمساهمات هي دائما موضع ترحيب!

### رخصة

[مع](./LICENSE)
