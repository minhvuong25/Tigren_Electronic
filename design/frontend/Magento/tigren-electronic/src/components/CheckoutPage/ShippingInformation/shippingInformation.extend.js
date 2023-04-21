module.exports = targetables => {
    const shippingInformationComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformation.js'
    );
    shippingInformationComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/ShippingInformation/shippingInformation.module.css'`
    );

    shippingInformationComponent.insertAfterSource(
        `customClasses, propClasses`,
        ', extendClasses'
    );
};
