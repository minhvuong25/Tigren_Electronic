module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderButtonItemConfig = targetables.reactComponent(
        targetablePath
    );
    magentoPageBuilderButtonItemConfig.insertAfterSource(
        `text: node.textContent,`,
        `
        color: node.childNodes[0].style.color,
        backgroundColor: node.childNodes[0].style.backgroundColor,`
    );
};
