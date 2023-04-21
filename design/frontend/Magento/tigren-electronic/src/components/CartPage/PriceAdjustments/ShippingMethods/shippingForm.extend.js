module.exports = targetables => {
    const shippingFormComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods/shippingForm.js'
    );
    shippingFormComponent.addImport(
        `extendClasses from 'src/components/CartPage/PriceAdjustments/ShippingMethods/shippingForm.module.css'`
    );
    shippingFormComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
