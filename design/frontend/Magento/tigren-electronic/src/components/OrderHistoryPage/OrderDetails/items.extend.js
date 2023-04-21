module.exports = targetables => {
    const itemsComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/items.js'
    );
    itemsComponent.addImport(
        `extendClasses from 'src/components/OrderHistoryPage/OrderDetails/items.module.css'`
    );
    itemsComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
