module.exports = targetables => {
    const orderDetailsComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/orderDetails.js'
    );
    orderDetailsComponent.addImport(
        `extendClasses from 'src/components/OrderHistoryPage/OrderDetails/orderDetails.module.css'`
    );
    orderDetailsComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
};
