module.exports = targetables => {
    const orderTotalComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/orderTotal.js'
    );
    orderTotalComponent.addImport(
        `extendClasses from 'src/components/OrderHistoryPage/OrderDetails/orderTotal.module.css'`
    );
    orderTotalComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
};
