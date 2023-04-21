module.exports = (targetables, targetablePath) => {
    const AddToCartButton = targetables.reactComponent(targetablePath);

    AddToCartButton.insertAfterSource(
        `const { item, urlSuffix`,
        ` ,isRequiredOption `
    ).insertAfterSource(
        `const talonProps = useAddToCartButton({
        item,
        urlSuffix`,
        `,
        isRequiredOption
    `
    );
};
