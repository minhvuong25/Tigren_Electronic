module.exports = (targetables, targetablePath) => {
    const productFulldetailComponent = targetables.reactComponent(
        targetablePath
    );

    productFulldetailComponent.addImport(
        `ProductBundleForm from '@tigrensolutions/bundle-product/src/components/ProductBundleForm'`
    );

    productFulldetailComponent.insertAfterSource(
        `<Form
                className={`,
        '`${classes.root} ${product.__typename === "BundleProduct" ? classes.bundleItem: ""}`',
        { remove: 12 }
    );

    productFulldetailComponent.insertBeforeSource(
        `<Button
            data-cy="ProductFullDetail-addToCartButton"`,
        ` product.__typename === "BundleProduct" ? <a href={'#bundleForm'} className={classes.customize}><FormattedMessage
                id="productFullDetail.customizeAndAddItemToCart"
                defaultMessage="Customize and Add to Cart"
            /></a> :
            `
    );

    productFulldetailComponent.insertAfterSource(
        `breadcrumbCategoryId,`,
        `
        storeCurrency,`
    );

    productFulldetailComponent.insertAfterSource(
        `</Form>`,
        `
        {product.__typename === "BundleProduct" && product.items && (
            <ProductBundleForm
                product={product}
                storeCurrency={storeCurrency}
            />
        )}
        `
    );
};
