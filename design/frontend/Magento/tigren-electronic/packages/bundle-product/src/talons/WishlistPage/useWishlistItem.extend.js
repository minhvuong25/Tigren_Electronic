const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const useWishlistItem = targetables.reactComponent(targetablePath);

    useWishlistItem.insertAfterSource(
        `const SUPPORTED_PRODUCT_TYPES = ['SimpleProduct', 'ConfigurableProduct'`,
        `, 'BundleProduct'`
    );
    if (!isModuleAvailable(`@tigrensolutions/product-customize-options`)) {
        useWishlistItem.addImport(`{ useHistory } from 'react-router-dom';`);
        useWishlistItem.addImport(
            `getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';`
        );
        useWishlistItem.insertBeforeSource(
            ` const handleAddToCart = useCallback(async () => {`,
            `
    const history = useHistory();
    `
        );
        const productLink = `const productLink = getProductUrl({ product, url_suffix: props.productUrlSuffix });`;

        useWishlistItem.insertAfterSource(
            `const { label: imageLabel, url: imageURL } = image;`,
            `
     ${productLink}
    `
        );
    }
    useWishlistItem.insertAfterSource(
        `try {`,
        `
                if(item.product && item.product.__typename === "BundleProduct"){
                    return history.push(productLink);
                }
                    `
    );
};
