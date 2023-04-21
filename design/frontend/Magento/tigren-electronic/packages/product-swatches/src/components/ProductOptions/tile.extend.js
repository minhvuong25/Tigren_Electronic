module.exports = (targetables, targetablePath) => {
    const tileComponent = targetables.reactComponent(targetablePath);

    tileComponent.insertAfterSource(
        `import defaultClasses from `,
        `'@tigrensolutions/product-swatches/src/components/ProductOptions/tile.module.css'`,
        {
            remove: 19
        }
    );

    tileComponent.setJSXProps(`button`, {
        disabled: `{props.isDisabled}`
    });
};
