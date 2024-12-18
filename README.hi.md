# रीडमी एक्शन का अनुवाद करें

## DOCUMENTATION Translation

-   [अंग्रेज़ी](DOCUMENTATION.md)
-   [सरलीकृत चीनी](DOCUMENTATION.zh-CN.md)
-   [परंपरागत चीनी](DOCUMENTATION.zh-TW.md)
-   [हिंदी](DOCUMENTATION.hi.md)
-   [फ़्रेंच](DOCUMENTATION.fr.md)
-   [अरब](DOCUMENTATION.ar.md)

**GitHub Action to translate Documentation to any language**

यह एक GitHub क्रिया है जो स्वचालित रूप से आपके रेपो में दस्तावेज़ का एक निर्दिष्ट भाषा में अनुवाद करती है।

## स्थापित करना

1.  **Add a workflow file** to your project (e.g. `.github/workflows/documentation.yml`):

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

## निर्माण

निम्नलिखित कार्य करें:

लिनक्स/मैकओएस:

    $ export NODE_OPTIONS=--openssl-legacy-provider

खिड़कियाँ:

    $ setx NODE_OPTIONS=--openssl-legacy-provider

तब:

    $ npm run build

एक नया पैकेज बनाया और संग्रहीत किया जाएगा`dist`निर्देशिका.

## विन्यास

### विकल्प

आप निम्नलिखित विकल्पों के साथ कार्रवाई को आगे कॉन्फ़िगर कर सकते हैं:

-   `LANG`: वह भाषा जिसमें आप अपने रीडमी का अनुवाद करना चाहते हैं। डिफ़ॉल्ट सरलीकृत चीनी है. समर्थित भाषाएँ नीचे पाई जा सकती हैं।
    (गलती करना:`zh-CH`) (required: `false`)

## समर्थित भाषाएँ

समर्थित भाषाएँ यहाँ पाई जा सकती हैं<https://cloud.google.com/translate/docs/languages>

### समस्याएँ

जाँच करना[यहाँ](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)इस कार्रवाई से संबंधित मुद्दों के लिए.

### विकास

सुझावों और योगदानों का हमेशा स्वागत है!

### लाइसेंस

[साथ](./LICENSE)
