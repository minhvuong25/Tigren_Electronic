module.exports = (targetables, targetablesPath) => {
    const productDetailFragment = targetables.reactComponent(targetablesPath);
    productDetailFragment.insertBeforeSource(
        `stock_status
                    price {`,
        `
                    price_range {
                        maximum_price {
                            final_price {
                                currency
                                value
                            }
                            regular_price {
                                currency
                                value
                            }
                            discount {
                                amount_off
                                percent_off
                            }
                        }
                    }
                    `
    );
};
