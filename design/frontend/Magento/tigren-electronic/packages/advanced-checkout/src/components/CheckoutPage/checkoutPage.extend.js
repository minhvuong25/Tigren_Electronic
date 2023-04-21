module.exports = (targetables, targetablePath) => {
    const checkoutPageComponent = targetables.reactComponent(targetablePath);

    checkoutPageComponent.insertAfterSource(
        `const placeOrderButton =
            checkoutStep === `,
        `CHECKOUT_STEP.PAYMENT`,
        {
            remove: 20
        }
    );

    checkoutPageComponent.addImport("{ useHistory } from 'react-router-dom'");

    checkoutPageComponent.insertBeforeSource(
        'if (orderNumber && orderDetailsData) {',
        `
        const history = useHistory();
        if ( typeof talonProps.loadingStoreConfig !== 'undefined' && !talonProps.loadingStoreConfig &&
            typeof talonProps.allowGuestCheckout !== 'undefined' && !talonProps.allowGuestCheckout &&
            isGuestCheckout
        ) {
            history.push('/customer/account/login');
        }
        `
    );

    checkoutPageComponent.addImport(
        "moduleClasses from '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/advancedCheckoutPage.module.css'"
    );
    checkoutPageComponent.insertAfterSource(
        'useStyle(defaultClasses,',
        ' moduleClasses, '
    );

    //Summary content
    //show item on step 1
    //show coupon on step 1
    checkoutPageComponent
        .insertBeforeSource('{priceAdjustmentsSection}', '', { remove: 25 })
        .insertBeforeSource('{reviewOrderButton}', '', { remove: 19 })
        .insertBeforeSource(`{itemsReview}`, ``, {
            remove: 13
        })
        .insertAfterSource('{orderSummary}', '', { remove: 35 });

    checkoutPageComponent
        .insertBeforeSource(
            '<OrderSummary isUpdating={isUpdating} />',
            `
                <div className={classes.price_adjustments_container}>
                    <PriceAdjustments setPageIsUpdating={setIsUpdating} />
                </div>
                <div className={classes.summary_bottom_container}>
                    <h2 className={classes.titleSummary}>
                        <FormattedMessage
                            id={'checkoutPage.orderSummary'}
                            defaultMessage={'Order Summary'}
                        />
                    </h2>
                    <div className={classes.items_review_container}>
                        <ItemsReview />
                    </div>
                    `
        )
        .insertAfterSource(
            '<OrderSummary isUpdating={isUpdating} />',
            `{placeOrderButton}
                </div>`
        );

    //add class Loading
    checkoutPageComponent.insertAfterSource(
        'orderDetailsLoading ||',
        `
        reviewOrderButtonClicked ||
            isUpdating ||
            !isPaymentAvailable ||`
    );
    checkoutPageComponent
        .insertBeforeSource(
            'const checkoutContentClass =',
            ` const isLoadingClass = reviewOrderButtonClicked ||
            isUpdating ||
            placeOrderLoading ||
            orderDetailsLoading ||
            placeOrderButtonClicked;

        const loadingClass = isLoadingClass ? classes.loading : '';
`
        )
        .insertAfterSource(
            'div className={checkoutContentClass',
            " + ' ' + loadingClass"
        );

    checkoutPageComponent.setJSXProps('PaymentInformation', {
        setPageIsUpdating: '{setIsUpdating}'
    });

    //auto show Summary
    checkoutPageComponent.insertAfterSource(
        'const shouldRenderPriceSummary = ',
        'true',
        { remove: 72 }
    );

    checkoutPageComponent.insertBeforeSource('{addressBookElement}', '', {
        remove: 20
    });
};
