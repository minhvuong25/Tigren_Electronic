module.exports = (targetables, targetablePath) => {
    const itemOrderDetail = targetables.reactComponent(targetablePath);
    itemOrderDetail.insertAfterSource(
        '= orderHistoryState',
        ' || []'
    );
    itemOrderDetail.insertBeforeSource('${product_url_key}${productURLSuffix}', '/');
    itemOrderDetail.insertAfterJSX(
        `Button className={classes.buyAgainButton}`,
        `<div className={classes.priceTotal}><Price currencyCode={currency} value={unitPrice * quantity_ordered} /></div>`
    );

    itemOrderDetail.addImport(
        "moduleClasses from '@tigrensolutions/thank-you-page/src/components/CheckoutSuccess/OrderDetails/itemSuccess.module.css'"
    );
    itemOrderDetail.insertBeforeSource(' props.classes', ' moduleClasses,');
};
