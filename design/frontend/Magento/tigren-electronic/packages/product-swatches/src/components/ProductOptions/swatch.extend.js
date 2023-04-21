module.exports = (targetables, targetablePath) => {
    const swatchComponent = targetables.reactComponent(targetablePath);

    swatchComponent.insertAfterSource(
        `import defaultClasses from `,
        `'@tigrensolutions/product-swatches/src/components/ProductOptions/swatch.module.css'`,
        {
            remove: 21
        }
    );

    const iconDisabled = swatchComponent.addImport(
        `IconDisabled from '@tigrensolutions/product-swatches/src/components/ProductOptions/iconDisabled.js'`
    );
    swatchComponent.replaceJSX(
        `Icon`,
        `${iconDisabled} isDisabled={props.isDisabled}`
    );
    swatchComponent.setJSXProps(`button`, {
        disabled: `{props.isDisabled}`
    });
};
