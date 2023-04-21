module.exports = targetables => {
    const priceSummaryComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CartPage/PriceSummary/priceSummary.js'
    );
    priceSummaryComponent.addImport(
        `extendClasses from 'src/components/CartPage/PriceSummary/priceSummary.module.css'`
    );
    priceSummaryComponent.addImport(`{ Link } from 'react-router-dom';`);
    priceSummaryComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `productListing.productPrice`,
            `priceSummary.lineItemLabel`,
            {
                remove: 27
            }
        )
        .insertAfterSource(
            `{proceedToCheckoutButton}`,
            `<Link className={classes.link} to="/">
                <FormattedMessage id="global.continue"
                        defaultMessage="Continue Shopping" />
            </Link>`
        )
        .insertAfterSource(
            `isLoading,`,
            `
            totalQuantity,
            `
        )
        .insertBeforeSource(
            `{formatMessage({
                                id: 'priceSummary.lineItemLabel',
                                defaultMessage: 'Product Price'
                            })}`,
            `<FormattedMessage
                        id="priceSummary.lineItemLabel"
                        defaultMessage="Subtotal ({totalQuantity} items)"
                        values={{
                                    totalQuantity: totalQuantity
                                }}
                    />`,
            {
                remove: 178
            }
        );
    const priceSummary = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js'
    );
    priceSummary
        .insertAfterSource(
            `isLoading,`,
            `
            totalQuantity,
            `
        )
        .insertBeforeSource(
            `id={'priceSummary.lineItemLabel'}`,
            `id="priceSummary.lineItemLabel"
                        defaultMessage="Subtotal ({totalQuantity} items)"
                        values={{
                                    totalQuantity: totalQuantity
                                }}`,
            {
                remove: 93
            }
        );
};
