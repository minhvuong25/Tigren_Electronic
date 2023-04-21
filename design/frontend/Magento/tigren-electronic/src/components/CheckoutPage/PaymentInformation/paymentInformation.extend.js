module.exports = targetables => {
    const paymentInformationComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation.js'
    );
    paymentInformationComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/PaymentInformation/paymentInformation.module.css'`
    );

    paymentInformationComponent
        .insertAfterSource(`customClasses, propClasses`, ', extendClasses')
        .insertBeforeSource(
            `checkoutPage.paymentInformation`,
            `checkoutPage.paymentInformationStep`,
            {
                remove: 31
            }
        );
};
