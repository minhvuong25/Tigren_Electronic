const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    const appComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/App/app.js'
    );
    const consentCookieComponent = appComponent.addReactLazyImport(
        '@tigrensolutions/cookie-consent/src/components/CookieConsent'
    );
    appComponent.insertAfterSource(
        'Routes />',
        `<Suspense fallback={null}>
            <${consentCookieComponent} />
        </Suspense>`
    );

    if (isModuleAvailable(`@tigrensolutions/core`)) {
        const appComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        const consentCookieComponent = appComponent.addReactLazyImport(
            '@tigrensolutions/cookie-consent/src/components/CookieConsent'
        );
        appComponent.insertAfterSource(
            'Routes />',
            `<Suspense fallback={null}>
            <${consentCookieComponent} />
        </Suspense>`
        );
    }
};
