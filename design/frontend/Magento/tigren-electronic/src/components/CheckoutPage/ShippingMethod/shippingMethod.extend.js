module.exports = targetables => {
    const shippingMethodComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod/shippingMethod.js'
    );
    shippingMethodComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/ShippingMethod/shippingMethod.module.css'`
    );

    shippingMethodComponent.insertAfterSource(
        `customClasses, props.classes`,
        ', extendClasses'
    );
    shippingMethodComponent.insertBeforeSource(
        `shippingMethod.heading`,
        `checkoutPage.shippingMethodStep`,
        {
            remove: 22
        }
    );
};
