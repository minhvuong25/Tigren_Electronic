module.exports = (targetables, targetablePath) => {
    const useAddToCartButton = targetables.reactComponent(
        `@magento/peregrine/lib/talons/Gallery/useAddToCartButton.js`
    );
    useAddToCartButton
        .insertAfterSource(`const UNSUPPORTED_PRODUCT_TYPES = [`, ``, {
            remove: 27
        })
        .insertBeforeSource(
            `productType === 'SimpleProduct'`,
            `( `
        )
        .insertAfterSource(
            `productType === 'SimpleProduct'`,
            ` || productType == "VirtualProduct" )`
        );
};
