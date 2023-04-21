module.exports = targetables => {
    const priceSummaryGqlCoreComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/talons/CartPage/PriceSummary/priceSummaryFragments.gql.js'
    );
    priceSummaryGqlCoreComponent.insertBeforeSource(
        `items {`,
        `
        total_quantity
        `
    );
    const priceSummaryGqlComponent = targetables.reactComponent(
        '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql.js'
    );
    priceSummaryGqlComponent.insertBeforeSource(
        `items {`,
        `
        total_quantity
        `
    );
};
