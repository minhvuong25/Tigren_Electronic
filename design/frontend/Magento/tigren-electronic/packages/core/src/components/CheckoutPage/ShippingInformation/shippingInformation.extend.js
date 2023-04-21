module.exports = (targetables, targetablePath) => {
    const shippingInformation = targetables.reactComponent(targetablePath);

    shippingInformation.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ShippingInformation/shippingInformation.module.css'"
    );
    shippingInformation.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
