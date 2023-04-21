module.exports = targetables => {
    const relatedProductsComponent = targetables.reactComponent(
        '@tigrensolutions/related-products/src/components/relatedProducts.js'
    );
    relatedProductsComponent.addImport(
        `extendsClasses from 'extend/tigren/related-products/src/components/RelatedProducts/relatedProducts.module.css'`
    );
    relatedProductsComponent.insertAfterSource(
        `useStyle(defaultClasses, props.classes`,
        `, extendsClasses`
    );
};
