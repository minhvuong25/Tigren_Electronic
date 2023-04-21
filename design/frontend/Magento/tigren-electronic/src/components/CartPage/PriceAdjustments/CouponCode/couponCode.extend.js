module.exports = targetables => {
    const couponCodeComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CartPage/PriceAdjustments/CouponCode/couponCode.js'
    );
    couponCodeComponent.addImport(
        `extendClasses from 'src/components/CartPage/PriceAdjustments/CouponCode/couponCode.module.css'`
    );
    couponCodeComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
