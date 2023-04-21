module.exports = (targetables, targetablePath) => {
    const itemGallery = targetables.reactComponent(targetablePath);

    itemGallery.insertAfterSource(
        `const addButton = isSupportedProductType`,
        ` || item.__typename == "VirtualProduct" `
    );
};
