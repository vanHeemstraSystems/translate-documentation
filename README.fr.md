# Traduire l’action Lisez-moi

## Traduction

-   [Anglais](DOCUMENTATION.md)
-   [Chinois simplifié](DOCUMENTATION.zh-CN.md)
-   [Chinois traditionnel](DOCUMENTATION.zh-TW.md)
-   [hindi](DOCUMENTATION.hi.md)
-   [Française](DOCUMENTATION.fr.md)
-   [arabe](DOCUMENTATION.ar.md)

**GitHub Action pour traduire la documentation dans n'importe quelle langue**

Il s'agit d'une action GitHub qui traduit automatiquement la documentation de votre dépôt dans une langue spécifiée.

## Installation

1.  **Ajouter un fichier de workflow**à votre projet (par ex.`.github/workflows/documentation.yml`):

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

## Construire

Procédez comme suit :

Linux/MacOS :

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

### Problèmes

Vérifier[ici](https://github.com/vanHeemstraSystems/translate-documentation/issues/1)pour les problèmes liés à cette action.

### Développement

Les suggestions et contributions sont toujours les bienvenues !

### LICENCE

[AVEC](./LICENSE)
