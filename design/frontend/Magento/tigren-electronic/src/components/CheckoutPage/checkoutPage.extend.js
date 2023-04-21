module.exports = targetables => {
    const checkoutPageComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.js'
    );
    checkoutPageComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/checkoutPage.module.css'`
    );

    checkoutPageComponent.insertAfterSource(`, propClasses`, ', extendClasses');
    checkoutPageComponent
        .insertAfterSource(
            `const placeOrderButton =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (`,
            `<div className={classes.place_order}>`
        )
        .insertAfterSource(
            `<FormattedMessage
                        id={'checkoutPage.placeOrder'}
                        defaultMessage={'Place Order'}
                    />
                </Button>`,
            `</div>`
        );
};
