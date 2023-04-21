module.exports = (targetables, targetablePath) => {
    const optionsComponent = targetables.reactComponent(targetablePath);

    optionsComponent.insertAfterSource(
        `selectedValues = []`,
        `, ...additionalProps`
    );
    optionsComponent.insertAfterSource(
        `<Option`,
        `
            {...additionalProps}`
    );
};
