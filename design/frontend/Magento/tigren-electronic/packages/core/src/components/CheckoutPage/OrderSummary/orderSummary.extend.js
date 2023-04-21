module.exports = (targetables, targetablePath) => {
    const orderSummary = targetables.reactComponent(targetablePath);
    orderSummary.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/OrderSummary/orderSummary.module.css'"
    );
    orderSummary.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
