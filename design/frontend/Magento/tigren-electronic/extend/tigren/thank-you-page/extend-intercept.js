module.exports = targetables => {
    const checkoutCreateAccountComponent = targetables.reactComponent(
        '@tigrensolutions/thank-you-page/src/components/CheckoutCreateAccount/checkoutCreateAccount.js'
    );
    checkoutCreateAccountComponent.addImport(
        `extendsClasses from 'extend/tigren/thank-you-page/src/components/CheckoutCreateAccount/checkoutCreateAccount.module.css'`
    );
    checkoutCreateAccountComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
};
