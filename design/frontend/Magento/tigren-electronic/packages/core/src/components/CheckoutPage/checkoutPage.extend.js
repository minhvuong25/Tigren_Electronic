module.exports = (targetables, targetablePath) => {
    const checkoutPage = targetables.reactComponent(targetablePath);
    checkoutPage.addImport(
        "customClasses from '@tigrensolutions/core/src/components/CheckoutPage/checkoutPage.module.css'"
    );
    checkoutPage.insertBeforeSource('propClasses)', ' customClasses, ');
    checkoutPage.setJSXProps(`StockStatusMessage`, {
        cart: '{talonProps.cart}'
    });
};
