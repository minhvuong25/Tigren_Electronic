module.exports = (targetables, targetablePath) => {
    const autocomplete = targetables.reactComponent(targetablePath);

    autocomplete.insertAfterSource(
        `items {`,
        `
                sku
                `
    );
};
