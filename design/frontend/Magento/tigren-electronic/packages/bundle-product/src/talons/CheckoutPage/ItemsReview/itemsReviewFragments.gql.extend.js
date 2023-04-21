const {
    bundleCartItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const itemReviewFragment = targetables.reactComponent(targetablePath);

    itemReviewFragment.insertBeforeSource(`product {`, bundleCartItems);

    itemReviewFragment.insertAfterSource(`items {`, bundleCustomizeOptions);
};
