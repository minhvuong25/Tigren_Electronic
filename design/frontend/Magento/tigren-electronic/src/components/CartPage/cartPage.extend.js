module.exports = targetables => {
    const cartPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CartPage/cartPage.js'
    );
    cartPageComponent.addImport(
        `extendClasses from 'src/components/CartPage/cartPage.module.css'`
    );
    cartPageComponent.addImport(
        `PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.js'`
    );

    cartPageComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<Breadcrumbs`,
            `<Breadcrumbs
                staticPart={formatMessage({
                    id: 'cartPage.title',
                    defaultMessage: 'Cart'
                })}
            />`,
            { remove: 187 }
        )
        .insertBeforeSource(
            `const productListing = hasItems ? (`,
            `const priceAdjustments = hasItems ? (
        <PriceAdjustments setIsCartUpdating={setIsCartUpdating} />
    ) : null;`
        )
        .insertBeforeSource(
            `{summaryContainer}`,
            `<div className={classes.container}>`
        )
        .insertBeforeSource(
            `{summaryContainer}`,
            `<div className={classes.price_adjustments}>
                    {priceAdjustments}
               </div>`
        )
        .insertAfterSource(`{summaryContainer}`, `</div>`);
};
