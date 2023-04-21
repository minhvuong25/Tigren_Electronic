module.exports = (targetables, targetablePath) => {
    const addressForm = targetables.reactComponent(targetablePath);
    addressForm.wrapWithFile(
        '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingInformation/AddressForm/wrapAddressForm.js'
    );
};
