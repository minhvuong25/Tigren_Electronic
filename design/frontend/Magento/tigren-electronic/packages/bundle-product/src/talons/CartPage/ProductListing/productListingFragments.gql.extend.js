const {
    bundleCartItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const productListingFragment = targetables.reactComponent(targetablePath);

    productListingFragment.insertBeforeSource(`product {`, bundleCartItems);

    productListingFragment.insertAfterSource(`items {`, bundleCustomizeOptions);
};
