module.exports = targetables => {
    const itemComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/MiniCart/ProductList/item.js'
    );
    itemComponent.addImport(
        `extendClasses from 'src/components/MiniCart/ProductList/item.module.css'`
    );
    itemComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
};
