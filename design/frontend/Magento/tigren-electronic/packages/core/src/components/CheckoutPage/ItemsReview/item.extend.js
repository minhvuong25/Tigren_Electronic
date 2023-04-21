module.exports = (targetables, targetablePath) => {
    const item = targetables.reactComponent(targetablePath);
    item.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ItemsReview/item.module.css'"
    );
    item.insertAfterSource('useStyle(defaultClasses', ', customClasses');
};
