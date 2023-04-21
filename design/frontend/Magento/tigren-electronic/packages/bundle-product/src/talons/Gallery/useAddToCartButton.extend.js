module.exports = (targetables, targetablePath) => {
    const useAddToCartButton = targetables.reactComponent(targetablePath);

    useAddToCartButton.insertAfterSource(
        `const UNSUPPORTED_PRODUCT_TYPES = [`,
        ``,
        {
            remove: 21
        }
    );

    useAddToCartButton.insertAfterSource(
        `if (productType === 'ConfigurableProduct'`,
        ` || productType === 'BundleProduct'`
    );
};
