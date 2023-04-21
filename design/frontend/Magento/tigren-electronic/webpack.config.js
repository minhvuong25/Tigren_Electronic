const { graphQL } = require('@magento/pwa-buildpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const { promisify } = require('util');

const {
    getMediaURL,
    getStoreConfigData,
    getAvailableStoresConfigData,
    getPossibleTypes
} = graphQL;

const { DefinePlugin } = webpack;
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

// Using the @tigrensolutions/buildpack
const {
    configureWebpack
} = require('@tigrensolutions/buildpack/src/WebpackTools/configureWebpack');

const getCleanTemplate = templateFile => {
    return new Promise(resolve => {
        fs.readFile(templateFile, 'utf8', (err, data) => {
            resolve(
                data.replace(
                    /(?<inlineddata><!-- Inlined Data -->.*\s<!-- \/Inlined Data -->)/gs,
                    ''
                )
            );
        });
    });
};

module.exports = async env => {
    /**
     * configureWebpack() returns a regular Webpack configuration object.
     * You can customize the build by mutating the object here, as in
     * this example. Since it's a regular Webpack configuration, the object
     * supports the `module.noParse` option in Webpack, documented here:
     * https://webpack.js.org/configuration/module/#modulenoparse
     */
    const config = await configureWebpack({
        context: __dirname,
        vendor: [
            '@apollo/client',
            'apollo-cache-persist',
            'informed',
            'react',
            'react-dom',
            'react-feather',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-actions',
            'redux-thunk'
        ],
        special: {
            'react-feather': {
                esModules: true
            }
        },
        env
    });

    const mediaUrl = await getMediaURL();
    const storeConfigData = await getStoreConfigData();
    const { availableStores } = await getAvailableStoresConfigData();
    const writeFile = promisify(fs.writeFile);

    /**
     * Loop the available stores when there is provided STORE_VIEW_CODE
     * in the .env file, because should set the store name from the
     * given store code instead of the default one.
     */
    const availableStore = availableStores.find(
        ({ code }) => code === process.env.STORE_VIEW_CODE
    );

    global.MAGENTO_MEDIA_BACKEND_URL = mediaUrl;
    global.LOCALE = storeConfigData.locale.replace('_', '-');
    global.AVAILABLE_STORE_VIEWS = availableStores;

    global.SPLASH_SCREEN_IMAGE_WIDTH =
        process.env.SPLASH_SCREEN_IMAGE_WIDTH || '192px';
    global.SPLASH_SCREEN_IMAGE =
        process.env.SPLASH_SCREEN_IMAGE ||
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTkyLjAwMDAwMHB0IiBoZWlnaHQ9IjE5Mi4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE5Mi4wMDAwMDAgMTkyLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTkyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTkwNSAxNzY4IGMtMjcgLTE3IC03MiAtNDQgLTEwMCAtNjAgLTExOSAtNjggLTE5MiAtMTEwIC0yMjQgLTEyOQotMTA0IC02MiAtMjk5IC0xNzQgLTMxOCAtMTgzIGwtMjMgLTExIDAgLTQyNyAwIC00MjcgNjIgLTM3IGM3NSAtNDQgODQgLTQ5CjI1OCAtMTQ5IDc0IC00MyAxNDkgLTg2IDE2NSAtOTYgMTcgLTEwIDY2IC0zOCAxMTAgLTYzIDQ0IC0yNSA5MiAtNTQgMTA4IC02MwoyNiAtMTcgMjggLTE3IDU1IDAgMTUgOSA2MyAzOCAxMDcgNjMgNDQgMjUgOTggNTYgMTIwIDY5IDIyIDE0IDkyIDU0IDE1NSA5MQo2MyAzNiAxNjAgOTIgMjE1IDEyNCBsMTAwIDU5IDMgNDI0IDIgNDI1IC0zNyAyMyBjLTQyIDI1IC0zOCAyMyAtMTc4IDEwNCAtNTUKMzIgLTExMyA2NSAtMTMwIDczIC0xNiA5IC0zMiAxOCAtMzUgMjIgLTMgNCAtNDEgMjYgLTg0IDUxIC04MyA0NiAtOTQgNTIKLTE5NCAxMTIgLTM1IDIwIC02OCAzNyAtNzUgMzYgLTcgMCAtMzQgLTE0IC02MiAtMzF6IG0tMTEwIC00MzIgYzYxIC0zNCAxMjUKLTcxIDE0MiAtODIgMzEgLTE4IDM0IC0xOCA2MCAtMiAxNiA5IDgxIDQ2IDE0NiA4MyBsMTE4IDY3IDEwNCAtNjIgMTA1IC02MiAwCi0xMjQgMCAtMTI0IC00MSAtMjUgYy0yMiAtMTUgLTU1IC0zNCAtNzIgLTQ0IC0xMDUgLTYwIC0xNjMgLTk2IC0xNjkgLTEwNSAtNAotNiAtOCAtODMgLTggLTE3MiBsMCAtMTYwIC03NyAtNDUgYy00MyAtMjQgLTgyIC00NiAtODggLTQ4IC01IC0yIC0xNyAtMTAKLTI2IC0xOCAtMTQgLTEyIC0yNyAtNyAtMTAwIDMzIC00NiAyNiAtOTYgNTYgLTExMSA2NiBsLTI4IDE5IDAgMTY3IDAgMTY3Ci01NyAzMyBjLTMyIDE4IC04NSA0OCAtMTE4IDY4IC0zMyAxOSAtNzAgNDAgLTgyIDQ2IC0xMiA2IC0yMyAxNiAtMjUgMjIgLTcKMjIgNCAyNTYgMTIgMjU2IDQgMCA1MCAyNSAxMDEgNTUgNTEgMzAgOTUgNTUgOTggNTUgNCAwIDU2IC0yOSAxMTYgLTY0eiIvPgo8L2c+Cjwvc3ZnPgo=';

    const possibleTypes = await getPossibleTypes();

    const htmlWebpackConfig = {
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        }
    };

    // Strip UPWARD mustache from template file during watch
    if (
        process.env.npm_lifecycle_event &&
        process.env.npm_lifecycle_event.includes('watch')
    ) {
        const devTemplate = await getCleanTemplate('./template.html');

        // Generate new gitignored html file based on the cleaned template
        await writeFile('template.generated.html', devTemplate);
        htmlWebpackConfig.template = './template.generated.html';
    } else {
        htmlWebpackConfig.template = './template.html';
    }

    config.module.noParse = [
        /@adobe\/adobe\-client\-data\-layer/,
        /braintree\-web\-drop\-in/
    ];
    config.plugins = [
        ...config.plugins,
        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            POSSIBLE_TYPES: JSON.stringify(possibleTypes),
            STORE_NAME: availableStore
                ? JSON.stringify(availableStore.store_name)
                : JSON.stringify(storeConfigData.store_name),
            STORE_VIEW_CODE: process.env.STORE_VIEW_CODE
                ? JSON.stringify(process.env.STORE_VIEW_CODE)
                : JSON.stringify(storeConfigData.code),
            AVAILABLE_STORE_VIEWS: JSON.stringify(availableStores),
            DEFAULT_LOCALE: JSON.stringify(global.LOCALE),
            DEFAULT_COUNTRY_CODE: JSON.stringify(
                process.env.DEFAULT_COUNTRY_CODE || 'US'
            ),
            __DEV__: process.env.NODE_ENV !== 'production'
        }),
        new HTMLWebpackPlugin(htmlWebpackConfig),
        new HtmlWebpackInjectPreload({
            // This plugin allows adding preload links anywhere you want.
            // Fore more details, please follow this https://github.com/principalstudio/html-webpack-inject-preload
            files: [
                {
                    match: /Sarabun-Regular\.ttf$/,
                    attributes: {
                        as: 'font',
                        type: 'font/ttf',
                        crossorigin: 'anonymous'
                    }
                }
            ]
        })
    ];

    return [config];
};
