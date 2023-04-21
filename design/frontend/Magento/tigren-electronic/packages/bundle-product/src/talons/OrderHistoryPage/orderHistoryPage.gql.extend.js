const {
    bundleOrderItems
} = require('@tigrensolutions/bundle-product/targets/custom.graphql.js');

module.exports = (targetables, targetablePath) => {
    const orderHistoryPageFragment = targetables.reactComponent(targetablePath);

    orderHistoryPageFragment.insertBeforeSource(
        `product_name`,
        bundleOrderItems
    );
};
