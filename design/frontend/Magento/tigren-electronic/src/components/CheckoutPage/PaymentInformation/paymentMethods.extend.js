module.exports = targetables => {
    const paymentMethodComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js'
    );
    paymentMethodComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/PaymentInformation/paymentMethods.module.css'`
    );

    paymentMethodComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
};
