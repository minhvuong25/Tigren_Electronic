module.exports = (targetables, targetablePath) => {
    const useWishlistItem = targetables.reactComponent(targetablePath);
    useWishlistItem.addImport(
        `resourceUrl from '@magento/peregrine/lib/util/makeUrl';`
    );

    useWishlistItem.addImport(`{ useHistory } from 'react-router-dom';`);

    useWishlistItem.addImport(
        `import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';`
    );

    useWishlistItem.insertAfterSource(
        `image,
        sku,`,
        `
        url_key,
        options,
        `
    );

    const productLink = `const productLink = getProductUrl({ product });`;
    useWishlistItem.insertAfterSource(
        `const { label: imageLabel, url: imageURL } = image;`,
        `
     ${productLink}
    `
    );

    useWishlistItem.insertBeforeSource(
        ` const handleAddToCart = useCallback(async () => {`,
        `
    const history = useHistory();
    `
    );

    useWishlistItem.insertAfterSource(
        `await addWishlistItemToCart();`,
        `
                }
            `
    );

    useWishlistItem.insertBeforeSource(
        `await addWishlistItemToCart();`,
        `
                if(options && options.length !== 0 ){
                    history.push(productLink);
                }else {
                    `
    );
};
