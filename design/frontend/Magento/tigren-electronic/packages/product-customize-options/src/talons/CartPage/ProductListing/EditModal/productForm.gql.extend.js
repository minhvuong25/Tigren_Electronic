module.exports = (targetables, targetablePath) => {
    const productFormGql = targetables.reactComponent(targetablePath);
    productFormGql
        .insertAfterSource(
            `$parentSku: String!`,
            `
        $customizableOptions: [CustomizableOptionInput]
        `
        )
        .insertBeforeSource(
            `parent_sku: $parentSku`,
            `
                        customizable_options: $customizableOptions
                        `
        );
};
