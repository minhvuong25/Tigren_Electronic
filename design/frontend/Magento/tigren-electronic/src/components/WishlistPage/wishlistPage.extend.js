module.exports = targetables => {
    const wishlistPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/WishlistPage/wishlistPage.js'
    );
    wishlistPageComponent.addImport(
        `extendClasses from 'src/components/WishlistPage/wishlistPage.module.css'`
    );
    wishlistPageComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(`let content;`, `let buttonClearAll = null;`);
};
