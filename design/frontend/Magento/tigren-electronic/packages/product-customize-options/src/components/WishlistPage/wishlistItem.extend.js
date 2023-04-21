module.exports = (targetables, targetablePath) => {
    const wishListItemComponent = targetables.reactComponent(targetablePath);

    wishListItemComponent.insertAfterSource(
        `const rootClass = isRemovalInProgress
        ? classes.root_disabled
        : classes.root;`,
        `

    const { options } = product;
    const isRequiredOption = (() => {
        if (!options || !options.length) return false;
        return options.reduce((prev, cur) => {
            return prev && cur.required;
        }, true);
    })();

    `
    );
};
