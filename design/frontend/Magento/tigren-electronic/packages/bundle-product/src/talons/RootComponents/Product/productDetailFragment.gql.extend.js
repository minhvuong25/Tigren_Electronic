const {
    bundleProduct
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const productFulldetailFragment = targetables.reactComponent(
        targetablePath
    );

    productFulldetailFragment.insertAfterSource(
        `ProductInterface {`,
        bundleProduct
    );
};
