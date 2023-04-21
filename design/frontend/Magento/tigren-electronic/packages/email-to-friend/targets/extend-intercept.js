const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

module.exports = targets => {
    const targetables = Targetables.using(targets);

    const productFullDetailComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );

    productFullDetailComponent.insertAfterSource(
        `import Price from '@magento/venia-ui/lib/components/Price';`,
        `
const ShareProductButton = React.lazy(() =>
        import('@tigrensolutions/email-to-friend/src/components/ShareProductButton')
    );`
    );

    productFullDetailComponent.appendJSX(
        'section className={classes.actions}',
        `<ShareProductButton product={product} />`
    );

    productFullDetailComponent.insertAfterSource(
        `import Price from '@magento/venia-ui/lib/components/Price';`,
        `
const ShareProduct = React.lazy(() =>
        import('@tigrensolutions/email-to-friend/src/components/ShareProduct')
    );`
    );

    productFullDetailComponent.appendJSX(
        'Fragment',
        `<ShareProduct product={product} />`
    );

    // Add ShareProductLogin to the app component
    const AppComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/App/app.js'
    );
    AppComponent.insertAfterSource(
        `import { useApp } from '@magento/peregrine/lib/talons/App/useApp';`,
        `
const ShareProductLogin = React.lazy(() =>
    import('@tigrensolutions/email-to-friend/src/components/ShareProductLogin')
);`
    );
    AppComponent.insertBeforeSource(
        '<Navigation />',
        `<Suspense fallback={null}>
            <ShareProductLogin />
        </Suspense>`
    );

    if (isModuleAvailable(`@tigrensolutions/core`)) {
        const productFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );

        productFullDetailComponent.insertBeforeSource(
            `const ProductFullDetail = props => {`,
            `const ShareProductButton = React.lazy(() =>
    import('@tigrensolutions/email-to-friend/src/components/ShareProductButton')
);

`
        );
        productFullDetailComponent.insertAfterSource(
            `<SocialShare shareUrl={window.location.href} />
                    </div>`,
            `
                    <Suspense fallback={null}>
                        <ShareProductButton product={product} />
                    </Suspense>`
        );

        productFullDetailComponent.insertBeforeSource(
            `const ProductFullDetail = props => {`,
            `const ShareProduct = React.lazy(() =>
    import('@tigrensolutions/email-to-friend/src/components/ShareProduct')
);

`
        );
        productFullDetailComponent.insertBeforeSource(
            `</Fragment>`,
            `    <Suspense fallback={null}>
                <ShareProduct product={product} />
            </Suspense>
        `
        );

        // Add ShareProductLogin to the app component
        const AppComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        AppComponent.insertBeforeSource(
            `const App = props => {`,
            `const ShareProductLogin = React.lazy(() =>
    import('@tigrensolutions/email-to-friend/src/components/ShareProductLogin')
);

`
        );
        AppComponent.insertBeforeSource(
            '<Navigation />',
            `<Suspense fallback={null}>
            <ShareProductLogin />
        </Suspense>`
        );
    }
};
