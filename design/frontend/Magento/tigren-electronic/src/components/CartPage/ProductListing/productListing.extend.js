module.exports = targetables => {
    const productListingComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CartPage/ProductListing/productListing.js'
    );
    productListingComponent.addImport(
        `extendClasses from 'src/components/CartPage/ProductListing/productListing.module.css'`
    );
    productListingComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(`<div className={classes.delete}>`, '', {
            remove: 257
        });
};
