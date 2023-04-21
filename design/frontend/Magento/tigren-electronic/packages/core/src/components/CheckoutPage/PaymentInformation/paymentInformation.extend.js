module.exports = (targetables, targetablePath) => {
    const paymentInformation = targetables.reactComponent(targetablePath);
    paymentInformation.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/PaymentInformation/paymentInformation.module.css'"
    );
    paymentInformation.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
