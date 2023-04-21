module.exports = (targetables, targetablePath) => {
    const productListingCart = targetables.reactComponent(targetablePath);

    const productBundleOptionsCartPage = productListingCart.addImport(
        `ProductBundleOptions from '@tigrensolutions/bundle-product/src/components/ProductBundle/productBundleOptions'`
    );

    productListingCart.insertBeforeSource(
        `<ProductOptions`,
        `{item && item.bundle_options && (
                            <${productBundleOptionsCartPage}
                                bundleOptions={item.bundle_options}
                                currency={currency}
                                classes={classes}
                            />
                        )}`
    );
};
