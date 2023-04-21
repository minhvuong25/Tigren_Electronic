module.exports = (targetables, targetablePath) => {
    const priceComponent = targetables.reactComponent(targetablePath);
    priceComponent.addImport(
        `ProductPrice from '@tigrensolutions/base/src/components/ProductPrice/productPrice'`
    );
    priceComponent.insertAfterSource(`, currencyCode`, `, type`);

    priceComponent.insertBeforeSource(
        `return <Fragment>{children}</Fragment>;`,
        `if(type === 'full') {
        const {
            product,
            optionSelections,
            customizeOptions,
            optionCodes,
            layout,
            showTitle
        } = props;

        return <ProductPrice
            product={product}
            optionSelections={optionSelections}
            customizeOptions={customizeOptions}
            optionCodes={optionCodes}
            layout={layout}
            showTitle={showTitle}
        />
    }
`
    );
};
