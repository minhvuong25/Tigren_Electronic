const {
    bundleCartItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const minicartItemComponent = targetables.reactComponent(targetablePath);

    const productBundleOptionsMinicart = minicartItemComponent.addImport(
        `ProductBundleOptions from '@tigrensolutions/bundle-product/src/components/ProductBundle/productBundleOptions'`
    );

    minicartItemComponent.insertAfterSource(
        `const configured_variant = configuredVariant(configurable_options, product);`,
        `
    const price =
        prices &&
        (prices.price_including_tax
            ? prices.price_including_tax
            : prices.price);

    const finalPrice =
        product &&
        product.price &&
        product.price.regularPrice &&
        product.price.regularPrice.amount
            ? product.price.regularPrice.amount
            : null;

    const specialClass =
        finalPrice && price && price.value < finalPrice.value
            ? classes.specialPrice
            : classes.productPrice;

    `
    );

    minicartItemComponent.insertBeforeSource(
        `<ProductOptions`,
        `{props.bundle_options && <${productBundleOptionsMinicart} bundleOptions={props.bundle_options}
                                currency={finalPrice.currency || 'USD'}
                                classes={classes}/>}`
    );
};
