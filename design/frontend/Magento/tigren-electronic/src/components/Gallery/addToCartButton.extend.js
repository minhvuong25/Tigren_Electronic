module.exports = targetables => {
    const addToCartButtonComponent = targetables.reactComponent(
        '@tigrensolutions/product-swatches/src/components/ProductSwatches/addToCartButton.js'
    );
    addToCartButtonComponent.addImport(
        `extendClasses from 'src/components/Gallery/addToCartButton.module.css'`
    );
    addToCartButtonComponent
        .insertAfterSource(
            `useStyle(defaultClasses, props.classes`,
            `,extendClasses`
        )
        .insertBeforeSource(`<QuantityFields`, ``, {
            remove: 276
        });
};
