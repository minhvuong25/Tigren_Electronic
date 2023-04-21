const {
    bundleCartItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const productItemCheckout = targetables.reactComponent(targetablePath);

    const productBundleOptionsCheckout = productItemCheckout.addImport(
        `ProductBundleOptions from '@tigrensolutions/bundle-product/src/components/ProductBundle/productBundleOptions'`
    );

    productItemCheckout.insertBeforeSource(
        `} = props;`,
        `,
        bundle_options
    `
    );

    productItemCheckout.insertBeforeSource(
        `<ProductOptions`,
        `{bundle_options && (
                            <${productBundleOptionsCheckout}
                                bundleOptions={bundle_options}
                                classes={classes}
                                currency={currency}
                                isCheckout={true}
                            />
                        )}
                        `
    );
};
