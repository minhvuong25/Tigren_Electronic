module.exports = (targetables, targetablesPath) => {
    const itemsReviewFragments = targetables.reactComponent(targetablesPath);

    itemsReviewFragments.insertBeforeSource(
        `product {`,
        `
        prices {
                price_including_tax {
                    currency
                    value
                }
                price {
                    currency
                    value
                }
            }
            `
    );
};
