module.exports = targetables => {
    const shippingMethodsComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods/shippingMethods.js'
    );
    shippingMethodsComponent.addImport(
        `extendClasses from 'src/components/CartPage/PriceAdjustments/ShippingMethods/shippingMethods.module.css'`
    );
    shippingMethodsComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
