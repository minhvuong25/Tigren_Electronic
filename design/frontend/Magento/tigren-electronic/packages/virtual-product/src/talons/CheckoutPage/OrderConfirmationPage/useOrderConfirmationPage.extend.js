const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablesPath) => {
    const useOrderConfirmationPage = targetables.reactComponent(
        targetablesPath
    );

    useOrderConfirmationPage.insertBeforeSource(
        `const shippingMethod`,
        `
    const isVirtual =
        cart?.items?.filter(item => {
            return item?.product?.__typename !== 'VirtualProduct';
        }).length == 0;
    if (isVirtual) {
        return {
            isVirtual: isVirtual,
            email: cart.email,
            totalItemQuantity: cart?.total_quantity,
            city: '',
            country: '',
            firstname: '',
            lastname: '',
            postcode: '',
            region: '',
            street: []
        };
    }

    `
    );
    if (isModuleAvailable(`@tigrensolutions/split-cart`)) {
        useOrderConfirmationPage.insertAfterSource(
            `item?.product?.__typename !== 'VirtualProduct'`,
            ` && item?.available_to_checkout === 1`
        );
    }
};
