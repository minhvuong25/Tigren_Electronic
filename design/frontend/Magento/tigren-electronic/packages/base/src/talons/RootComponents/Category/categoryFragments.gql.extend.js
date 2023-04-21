module.exports = (targetables, targetablePath) => {
    const categoryPageQuery = targetables.reactComponent(targetablePath);

    categoryPageQuery.insertBeforeSource(
        `maximum_price {
                    regular_price {`,
        `
                minimum_price {
                    minimum_final_price_excl_tax {
                        currency
                        value
                    }
                    regular_price {
                        currency
                        value
                    }
                    final_price {
                        currency
                        value
                    }
                    discount {
                        percent_off
                        amount_off
                    }
                }
                `
    );
    categoryPageQuery.insertAfterSource(
        'maximum_price {',
        `
                    maximum_final_price_excl_tax {
                        currency
                        value
                    }
                    final_price {
                        currency
                        value
                    }
                    discount {
                        amount_off
                        percent_off
                    }`
    );
};
