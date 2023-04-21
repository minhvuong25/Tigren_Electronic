module.exports = targetables => {
    const shippingAddressComponent = targetables.reactComponent(
        '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingInformation/shippingAddress.js'
    );
    shippingAddressComponent.addImport(
        `extendsClasses from 'extend/tigren/advanced-checkout/src/components/ShippingAddress/shippingAddress.module.css'`
    );
    shippingAddressComponent
        .insertAfterSource(
            `useStyle(defaultClasses, moduleClasses, propClasses`,
            `, extendsClasses`
        )
        .insertBeforeSource(
            `shippingInformation.cardTitle`,
            `shippingInformation.editTitle`,
            {
                remove: 29
            }
        )
        .insertBeforeSource(
            `shippingInformation.cardTitle`,
            `shippingInformation.editTitle`,
            {
                remove: 29
            }
        );
    const shippingMethodDoneComponent = targetables.reactComponent(
        '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingMethod/shippingMethodDone.js'
    );
    shippingMethodDoneComponent.insertBeforeSource(
        `shippingMethod.heading`,
        `checkoutPage.shippingMethodStep`,
        {
            remove: 22
        }
    );
};
