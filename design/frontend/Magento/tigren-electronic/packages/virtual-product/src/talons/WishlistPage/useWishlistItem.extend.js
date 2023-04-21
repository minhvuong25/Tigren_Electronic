const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const useWishlistItem = targetables.reactComponent(targetablePath);

    useWishlistItem.insertAfterSource(
        `const SUPPORTED_PRODUCT_TYPES = ['SimpleProduct', 'ConfigurableProduct'`,
        `, 'VirtualProduct'`
    );
};
