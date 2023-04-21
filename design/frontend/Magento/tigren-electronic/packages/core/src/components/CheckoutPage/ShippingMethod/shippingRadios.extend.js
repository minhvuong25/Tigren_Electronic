module.exports = (targetables, targetablePath) => {
    const shippingRadios = targetables.reactComponent(targetablePath);
    shippingRadios.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ShippingMethod/shippingRadios.module.css'"
    );
    shippingRadios.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
