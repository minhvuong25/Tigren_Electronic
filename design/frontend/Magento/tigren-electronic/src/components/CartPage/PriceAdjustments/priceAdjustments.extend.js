module.exports = targetables => {
    const priceAdjustmentsComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.js'
    );
    priceAdjustmentsComponent.addImport(
        `extendClasses from 'src/components/CartPage/PriceAdjustments/priceAdjustments.module.css'`
    );
    priceAdjustmentsComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<Section
                    id={'coupon_code'}`,
            ``,
            {
                remove: 515
            }
        );
};
