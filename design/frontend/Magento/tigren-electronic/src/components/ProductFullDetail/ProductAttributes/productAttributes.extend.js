module.exports = targetables => {
    const productAttributes = targetables.reactComponent(
        '@tigrensolutions/core/src/components/ProductFullDetail/ProductAttributes/productAttributes.js'
    );
    productAttributes.setJSXProps('RichContent', {'disableLazyLoad': '{true}'})
}
