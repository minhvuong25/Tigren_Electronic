module.exports = (targetables, targetablePath) => {
    const miniCartItem = targetables.reactComponent(targetablePath);

    miniCartItem.insertAfterSource(
        `quantity,
        configurable_options,
        `,
        `
        simple_customizable,
        configurable_customizable,`
    );

    miniCartItem.insertAfterSource(
        'options={configurable_options}',
        `
                configurableCustomizable={configurable_customizable}
                simpleCustomizable={simple_customizable}`
    );
};
