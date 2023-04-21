module.exports = (targetables, targetablePath) => {
    const addToCartButton = targetables.reactComponent(targetablePath);
    addToCartButton.addImport(
        "customClasses from '@tigrensolutions/core/src/components/Gallery/addToCartButton.module.css'"
    );
    addToCartButton.insertAfterSource(
        'useStyle(defaultClasses',
        ', customClasses'
    );
};
