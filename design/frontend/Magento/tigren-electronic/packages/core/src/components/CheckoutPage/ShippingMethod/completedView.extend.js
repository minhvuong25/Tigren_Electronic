module.exports = (targetables, targetablePath) => {
    const shippingMethod = targetables.reactComponent(targetablePath);
    shippingMethod.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ShippingMethod/completedView.module.css'"
    );
    shippingMethod.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
