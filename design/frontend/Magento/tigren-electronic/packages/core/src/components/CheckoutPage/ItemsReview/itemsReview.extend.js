module.exports = (targetables, targetablePath) => {
    const itemsReview = targetables.reactComponent(targetablePath);
    itemsReview.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/ItemsReview/itemsReview.module.css'"
    );
    itemsReview.insertAfterSource('useStyle(defaultClasses', ', customClasses');
};
