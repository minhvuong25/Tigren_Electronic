module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderButtonItem = targetables.reactComponent(
        targetablePath
    );
    magentoPageBuilderButtonItem.insertAfterSource(
        `openInNewTab = false,`,
        `
        color,
        backgroundColor,
        `
    );
    magentoPageBuilderButtonItem.insertAfterSource(
        `const dynamicInnerStyles = {`,
        `
        color,
        backgroundColor,`
    );
};
