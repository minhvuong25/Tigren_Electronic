# How to Set Up Tigren PWA Theme

Based on PWA Studio, Tigren PWA theme for Magento 2 is an easy way to transform your store into a headless
storefront that is fast, engaging, and mobile-friendly. Follow this tutorial and learn to set up a new Tigren PWA
storefront project.

## Minimum requirements

- Magento 2 Backend
- NodeJS (>=14 LTS). To check your current Node version: node -v
- Yarn (>= 1.13.0). To check your current Yarn version: yarn -v

## Installation

1. Install Tigren Magento 2 Modules

- Unpack the extension ZIP file (Tigren_M2_Modules.zip) file on your computer
- Connect to your website source folder with FTP/SFTP/SSH client and upload all the files and folders from the extracted
  zip file to the corresponding root folder of your Magento installation.
- Connect to your Magento directory with SSH
- Run the following commands:
  - `php bin/magento setup:upgrade`
  - `php bin/magento setup:di:compile`
  - `php bin/magento setup:static-content:deploy`

2. Install `magento/module-upward-connector` and `magento/pwa` packages

- Run the following commands:
  - `composer require magento/module-upward-connector magento/pwa`
  - `php bin/magento setup:upgrade`
  - `php bin/magento setup:di:compile`
  - `php bin/magento setup:static-content:deploy`

3. Install Tigren PWA theme

- Unpack the theme ZIP file (Tigren_PWA_XXX_Theme_vXXX.zip) on your computer
- Connect to your website source folder with FTP/SFTP/SSH client
- Create a new folder to the corresponding root folder of your Magento installation, that can be named `pwa`
- Upload all the files and folders from the extracted zip file to the `pwa` folder.
- In the `pwa` folder, create a new `.env` file and add this content
  ```
  MAGENTO_BACKEND_URL=<Your_Magento_Website_URL>
  CHECKOUT_BRAINTREE_TOKEN=<Your_Braintree_Token>
  MAGENTO_BACKEND_EDITION=CE
  ```
- Connect to your Magento directory with SSH
- Go to the `pwa` folder and run the following commands:
  - `yarn install`
  - `yarn run build`
  - `php bin/magento config:set web/upward/path <Your_Magento_Installation_Path>/pwa/dist/upward.yml`

3. Enable Tigren PWA theme from backend configuration

- Change this configuration to `Yes` to enable Tigren PWA
  theme: `STORES > Configuration > GENERAL > Web > UPWARD PWA Configuration > Enabled`
- Finally, flush the cache from the Magento backend, and you now have a Tigren PWA theme!
