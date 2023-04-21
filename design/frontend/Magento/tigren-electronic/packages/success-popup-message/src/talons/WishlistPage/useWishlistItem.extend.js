module.exports = (targetables, targetablePath) => {
    const useWishlistItem = targetables.reactComponent(targetablePath);
    useWishlistItem.addImport(
        `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
    );

    useWishlistItem.insertAfterSource(
        `const { label: imageLabel, url: imageURL } = image;`,
        `

    const { toggleSuccessPopup } = useSuccessPopupContext();

    `
    );

    useWishlistItem.insertAfterSource(
        `await addWishlistItemToCart();`,
        `
                toggleSuccessPopup(item);
            `
    );
};
