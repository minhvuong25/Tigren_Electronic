module.exports = (targetables, targetablePath) => {
    const shippingMethod = targetables.reactComponent(targetablePath);
    shippingMethod.removeJSX('CompletedView');
    shippingMethod.removeJSX('UpdateModal');
    shippingMethod.addImport(
        "ShippingMethodDone from '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingMethod/shippingMethodDone.js'"
    );
    shippingMethod.insertAfterSource(
        `<div className={classes.done} data-cy="ShippingMethod-done">`,
        `
        <ShippingMethodDone
            pageIsUpdating={pageIsUpdating}
            updateFormInitialValues={updateFormInitialValues}
            handleSubmit={handleSubmit}
            shippingMethods={shippingMethods}
            isLoading={isLoading}
        />
            `
    );
};
