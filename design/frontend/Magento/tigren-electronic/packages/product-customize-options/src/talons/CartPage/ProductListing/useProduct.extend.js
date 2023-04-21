module.exports = (targetables, targetablePath) => {
    const useProduct = targetables.reactComponent(targetablePath);

    useProduct
        .insertAfterSource(
            `configurable_options: options = [],`,
            `
        simple_customizable,
        configurable_customizable,
        `
        )
        .insertAfterSource(
            `unitPrice,
        urlKey,`,
            `
        simpleCustomizable: simple_customizable,
        configurableCustomizable: configurable_customizable,
        `
        );
};
