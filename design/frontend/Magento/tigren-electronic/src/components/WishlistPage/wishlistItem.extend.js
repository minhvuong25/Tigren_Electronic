module.exports = targetables => {
    const wishlistComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/WishlistPage/wishlistItem.js'
    );
    wishlistComponent.addImport(
        `extendClasses from 'src/components/WishlistPage/wishlistItem.module.css'`
    );
    wishlistComponent.addImport(
        `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton';`
    );
    wishlistComponent.insertAfterSource(`props.classes`, ', extendClasses');
    wishlistComponent
        .insertBeforeSource(
            `{addToCart}`,
            `<AddToCompareButton product={item} classes={classes}/>`
        )
        .insertBeforeSource(
            `<Icon size={16} src={Trash2} /> {removeProductAriaLabel}`,
            `<Icon size={20} src={Trash2} />`,
            {
                remove: 56
            }
        );
};
