# Traduire l’action Lisez-moi

## Traduction

-   [Anglais](DOCUMENTATION.md)
-   [Chinois simplifié](DOCUMENTATION.zh-CN.md)
-   [Chinois traditionnel](DOCUMENTATION.zh-TW.md)
-   [hindi](DOCUMENTATION.hi.md)
-   [Française](DOCUMENTATION.fr.md)
-   [arabe](DOCUMENTATION.ar.md)

**GitHub Action to translate Documentation to any language**

Il s'agit d'une action GitHub qui traduit automatiquement la documentation de votre dépôt dans une langue spécifiée.

## Installation

1.  **Ajouter un fichier de workflow**à votre projet (par ex.`.github/workflows/readme.yml`):

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

## Construire

Procédez comme suit :

Linux / macOS:

    $ export NODE_OPTIONS=--openssl-legacy-provider

Fenêtres :

    $ setx NODE_OPTIONS=--openssl-legacy-provider

Alors:

    $ npm run build

Un nouveau package sera construit et stocké dans le`dist`annuaire.

## Configuration

### Possibilités

Vous pouvez configurer davantage l'action avec les options suivantes :

-   `LANG`: La langue dans laquelle vous souhaitez traduire votre fichier Lisez-moi. La valeur par défaut est le chinois simplifié. Les langues prises en charge peuvent être trouvées ci-dessous.
    (défaut:`zh-CH`) (requis:`false`)

## Langues prises en charge

Les langues prises en charge peuvent être trouvées ici<https://cloud.google.com/translate/docs/languages>

### Issues

Vérifier[ici](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)pour les problèmes liés à cette action.

### Développement

Les suggestions et contributions sont toujours les bienvenues !

### LICENCE

[AVEC](./LICENSE)
