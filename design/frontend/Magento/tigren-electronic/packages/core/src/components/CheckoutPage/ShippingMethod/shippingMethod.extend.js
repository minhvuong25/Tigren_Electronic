module.exports = (targetables, targetablePath) => {
    const shippingMethod = targetables.reactComponent(targetablePath);
    shippingMethod.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ShippingMethod/shippingMethod.module.css'"
    );
    shippingMethod.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
