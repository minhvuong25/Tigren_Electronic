const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    if (isModuleAvailable('@amasty/customers-also-viewed')) {
        return false;
    }

    const targetables = Targetables.using(targets);

    const productFullDetailComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    productFullDetailComponent.insertAfterSource(
        `import defaultClasses from './productFullDetail.module.css';`,
        `
const RelatedProducts = React.lazy(() =>
    import('@tigrensolutions/related-products/src/components/relatedProducts')
);`
    );

    productFullDetailComponent.insertBeforeSource(
        `</Fragment>`,
        `<RelatedProducts sku={productDetails && productDetails.sku} />
        `
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const productFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );
        productFullDetailComponent.insertBeforeSource(
            `const ProductFullDetail = props => {`,
            `const RelatedProducts = React.lazy(() =>
    import('@tigrensolutions/related-products/src/components/relatedProducts')
);

`
        );
        productFullDetailComponent.insertBeforeSource(
            '</Fragment>',
            `<Suspense fallback={null}>
            <RelatedProducts sku={productDetails && productDetails.sku} />
        </Suspense>`
        );
    }
};
