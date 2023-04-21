const {
    bundleCartItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql');
module.exports = (targetables, targetablePath) => {
    const minicartItemFragment = targetables.reactComponent(targetablePath);
    minicartItemFragment.insertAfterSource(
        `stock_status`,
        `
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                `
    );

    minicartItemFragment.insertAfterSource(`items {`, bundleCartItems);

    minicartItemFragment.insertAfterSource(`items {`, bundleCustomizeOptions);
};
