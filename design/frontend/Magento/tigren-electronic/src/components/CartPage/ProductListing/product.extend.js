module.exports = targetables => {
    const productComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CartPage/ProductListing/product.js'
    );
    productComponent.addImport(
        `extendClasses from 'src/components/CartPage/ProductListing/product.module.css'`
    );
    productComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertAfterSource(
            `{editItemSection}`,
            `<button className={classes.remove} onClick={handleRemove}>
                        <span>
                            {formatMessage({
                                id: 'global.removeButton',
                                defaultMessage: 'remove'
                            })}
                        </span>
                    </button>`
        )
        .insertBeforeSource(`<div className={classes.sku}>`, ``, {
            remove: 401
        })
        .insertBeforeSource(
            `<ProductOptions`,
            `<div className={classes.sku}>
                            <span>
                                {formatMessage({
                                    id: 'global.sku',
                                    defaultMessage: 'SKU'
                                })}
                                {': '}
                            </span>
                            {sku}
                        </div>`
        )
        .insertAfterSource(
            `<div className={classes.delete}>`,
            `{editItemSection}
        <AddToListButton
                                {...addToWishlistProps}
                                icon={HeartIcon}
                            />`
        );
};
