# रीडमी एक्शन का अनुवाद करें

## दस्तावेज़ीकरण अनुवाद

-   [अंग्रेज़ी](DOCUMENTATION.md)
-   [सरलीकृत चीनी](DOCUMENTATION.zh-CN.md)
-   [परंपरागत चीनी](DOCUMENTATION.zh-TW.md)
-   [हिंदी](DOCUMENTATION.hi.md)
-   [फ़्रेंच](DOCUMENTATION.fr.md)
-   [अरब](DOCUMENTATION.ar.md)

**दस्तावेज़ीकरण को किसी भी भाषा में अनुवाद करने के लिए GitHub क्रिया**

यह एक GitHub क्रिया है जो स्वचालित रूप से आपके रेपो में दस्तावेज़ का एक निर्दिष्ट भाषा में अनुवाद करती है।

## स्थापित करना

1.  **वर्कफ़्लो फ़ाइल जोड़ें**आपके प्रोजेक्ट के लिए (उदा.`.github/workflows/readme.yml`):

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
    (गलती करना:`zh-CH`) (आवश्यक:`false`)

## समर्थित भाषाएँ

समर्थित भाषाएँ यहाँ पाई जा सकती हैं<https://cloud.google.com/translate/docs/languages>

### समस्याएँ

जाँच करना[यहाँ](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)इस कार्रवाई से संबंधित मुद्दों के लिए.

### विकास

सुझावों और योगदानों का हमेशा स्वागत है!

### लाइसेंस

[साथ](./LICENSE)
