const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = targetables => {
    if (isModuleAvailable('@tigrensolutions/core')) {
        const HeaderComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Header/header.js'
        );
        HeaderComponent.addImport(
            `OrderAndReturnsButton from '@tigrensolutions/order-and-returns/src/components/OrderAndReturnsButton'`
        );
        HeaderComponent.insertAfterSource(
            '<div className={classes.switchers}>',
            `
                <OrderAndReturnsButton/>`
        );
    }
};
