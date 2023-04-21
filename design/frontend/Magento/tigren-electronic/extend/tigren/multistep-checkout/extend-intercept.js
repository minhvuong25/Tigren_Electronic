module.exports = targetables => {
    const shippingAddressButtonComponent = targetables.reactComponent(
        '@tigrensolutions/multistep-checkout/src/components/ShippingAddressButton/shippingAddressButton.js'
    );
    shippingAddressButtonComponent.addImport(
        `extendsClasses from 'extend/tigren/multistep-checkout/src/components/ShippingAddressButton/shippingAddressButton.module.css'`
    );
    shippingAddressButtonComponent
        .insertAfterSource(
            `useStyle(defaultClasses, props.classes`,
            `, extendsClasses`
        )
        .insertBeforeSource(
            `<Button`,
            `<div className={classes.shipping_address}>`
        )
        .insertAfterSource(`</Button>`, `</div>`);

    const shippingMethodButtonComponent = targetables.reactComponent(
        '@tigrensolutions/multistep-checkout/src/components/ShippingMethodButton/shippingMethodButton.js'
    );
    shippingMethodButtonComponent.addImport(
        `extendsClasses from 'extend/tigren/multistep-checkout/src/components/ShippingMethodButton/shippingMethodButton.module.css'`
    );
    shippingMethodButtonComponent
        .insertAfterSource(
            `useStyle(defaultClasses, props.classes`,
            `, extendsClasses`
        )
        .insertBeforeSource(
            `<Button`,
            `<div className={classes.shipping_method}>`
        )
        .insertAfterSource(`</Button>`, `</div>`);
};
