const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const checkoutPageComponent = targetables.reactComponent(targetablePath);
    checkoutPageComponent.addImport(
        "ShippingMethodButton from '@tigrensolutions/multistep-checkout/src/components/ShippingMethodButton/shippingMethodButton.js'"
    );

    checkoutPageComponent.addImport(
        "ShippingAddressButton from '@tigrensolutions/multistep-checkout/src/components/ShippingAddressButton/shippingAddressButton.js'"
    );
    checkoutPageComponent.addImport(
        `StepBar from '@tigrensolutions/multistep-checkout/src/components/StepBar/stepBar.js'`
    );

    checkoutPageComponent.addImport("{ useRef } from 'react'");

    checkoutPageComponent.insertAfterSource(
        'const talonProps = useCheckoutPage();',
        `
        const refForm = useRef({
            current: {
                isLoading: true
            }
        });
                `
    );

    checkoutPageComponent
        .setJSXProps('ShippingMethod', { ref: '{refForm}' })
        .setJSXProps('ShippingInformation', { refForm: '{refForm}' });

    checkoutPageComponent.insertAfterSource(
        '<OrderSummary isUpdating={isUpdating} />',
        `
            <ShippingAddressButton
                shippingInformationData={shippingInformationData}
                setShippingInformationData={setShippingInformationData}
                refForm={refForm}
                checkoutStep={checkoutStep}
                setCheckoutStep={setCheckoutStep}
            />
            <ShippingMethodButton
                refForm={refForm}
                shippingMethodData={shippingMethodData}
                setShippingMethodData={setShippingMethodData}
                checkoutStep={checkoutStep}
                setCheckoutStep={setCheckoutStep}
                isUpdating={isUpdating}
            />`
    );

    checkoutPageComponent.addImport(
        "multistepCheckoutClasses from '@tigrensolutions/multistep-checkout/src/components/CheckoutPage/checkoutPage.module.css'"
    );
    if (isModuleAvailable(`@tigrensolutions/core`)) {
        checkoutPageComponent.insertAfterSource(
            'customClasses,',
            ' multistepCheckoutClasses,'
        );
    } else {
        checkoutPageComponent.insertAfterSource(
            'defaultClasses,',
            ' multistepCheckoutClasses,'
        );
    }

    checkoutPageComponent.insertBeforeSource(
        'const CheckoutPage = props => {',
        `const ConditionalWrapper = props => (props.condition ? props.children : null);

`
    );

    checkoutPageComponent
        .insertAfterSource(
            `setCheckoutStep,`,
            `
            handlePreviousStep,
            setPrevious,
            shippingInformationData,
            setShippingInformationData,
            shippingMethodData,
            setShippingMethodData,
            `
        )
        .insertAfterSource(
            `onSave={setShippingInformationDone}`,
            ` shippingInformationData={shippingInformationData}
                setShippingInformationData={setShippingInformationData}`
        )
        .insertAfterSource(
            `<ShippingMethod
                    pageIsUpdating={isUpdating}`,
            `
                setCheckoutStep={setCheckoutStep}
                checkoutStep={checkoutStep}
                shippingMethodData={shippingMethodData}
                setShippingMethodData={setShippingMethodData}`
        )
        .insertBeforeSource(`>=`, `===`, {
            remove: 2
        })
        .surroundJSX(
            'ShippingInformation',
            'ConditionalWrapper condition={checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS}'
        );

    checkoutPageComponent
        .insertBeforeSource(
            `const placeOrderButton =`,
            `
            const previousButton =
            checkoutStep !== CHECKOUT_STEP.REVIEW ? (
                checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS ? (
                <Link className={classes.cartLink} to={'/checkout/cart'}>
                    <FormattedMessage
                        id={'checkoutPage.returnToCart'}
                        defaultMessage={'Return to Cart'}
                    />
                </Link>
            ) : (
                <Button
                    onClick={handlePreviousStep}
                    priority="high"
                    className={classes.previous_button}
                    data-cy="CheckoutPage-previousButton"

                >
                    <FormattedMessage
                        id={'checkoutPage.previousStep'}
                        defaultMessage={'Previous step'}
                    />
                </Button>
            ) ) : null;`
        )
        .insertAfterSource(`{placeOrderButton}`, `{previousButton}`)
        .insertAfterSource(
            `{headerText}
                    </h1>`,
            `<StepBar checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep} setPrevious={setPrevious}  />`
        )
        .insertAfterSource(
            ` let headerText;`,
            `
        const isShippingInformation =
            checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS
                ? classes.shipping_information_container
                : classes.hidden;
        const isShippingMethod =
            checkoutStep === CHECKOUT_STEP.SHIPPING_METHOD
                ? classes.shipping_method_container
                : classes.hidden;
        `
        );
    checkoutPageComponent
        .setJSXProps('div className={classes.shipping_information_container}', {
            className: `{isShippingInformation}`
        })
        .setJSXProps('div className={classes.shipping_method_container}', {
            className: `{isShippingMethod}`
        });
};
