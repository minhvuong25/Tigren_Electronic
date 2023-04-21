module.exports = targetables => {
    const productListModeComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/ProductListMode/productListMode.js'
    );
    productListModeComponent.addImport(
        `extendClasses from 'src/components/ProductListMode/productListMode.module.css'`
    );
    productListModeComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(`<Icon src={gridIcon} attrs={iconAttrs} />`, ``, {
            remove: 41
        })
        .insertBeforeSource(`<Icon src={listIcon} attrs={iconAttrs} />`, ``, {
            remove: 41
        });
};
