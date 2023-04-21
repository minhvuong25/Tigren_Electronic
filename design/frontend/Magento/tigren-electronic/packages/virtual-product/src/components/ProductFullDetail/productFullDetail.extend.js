module.exports = (targetables, targetablePath) => {
    const productFullDetail = targetables.reactComponent(targetablePath);

    productFullDetail.insertAfterSource(
        `const cartActionContent = isSupportedProductType`,
        ` || product.__typename == 'VirtualProduct' `
    );
};
