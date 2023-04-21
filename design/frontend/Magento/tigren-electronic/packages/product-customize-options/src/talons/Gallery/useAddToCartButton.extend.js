module.exports = (targetables, targetablePath) => {
    const UseAddToCartButton = targetables.reactComponent(targetablePath);

    UseAddToCartButton.insertAfterSource(
        `const { item, urlSuffix } = props;`,
        `
    const { options } = item;
    const isRequiredOption = (() => {
        if (!options || !options.length) return false;
        return options.reduce((prev, cur) => {
            return prev && cur.required;
        }, true);
    })();
    `
    )
        .insertBeforeSource(
            `productType === 'SimpleProduct'`,
            `!isRequiredOption && `
        )
        .insertAfterSource(
            `productType === 'ConfigurableProduct'`,
            ` || isRequiredOption`
        )
        .insertBeforeSource("${item.url_key}${urlSuffix || ''}`", `/`);
};
