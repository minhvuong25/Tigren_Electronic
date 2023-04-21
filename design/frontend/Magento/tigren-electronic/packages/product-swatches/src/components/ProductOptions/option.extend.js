module.exports = (targetables, targetablePath) => {
    const optionComponent = targetables.reactComponent(targetablePath);

    optionComponent.insertAfterSource(
        `import defaultClasses from `,
        `'@tigrensolutions/product-swatches/src/components/ProductOptions/option.module.css'`,
        {
            remove: 21
        }
    );

    optionComponent.setJSXProps(`ValueList`, {
        inStockVariants: `{props.inStockVariants}`,
        optionSelections: `{props.optionSelections}`,
        optionCodes: `{props.optionCodes}`,
        attribute_id: `{props.attribute_id}`
    });

    optionComponent.removeJSX(`dl className={classes.selection}`);

    optionComponent.insertBeforeSource(
        `getListComponent(attribute_code, values)`,
        `getListComponent(props)`,
        {
            remove: 40
        }
    );
    optionComponent.insertBeforeSource(
        `const getListComponent = (attribute_code, values)`,
        `const getListComponent = (options)`,
        {
            remove: 49
        }
    );
    optionComponent.addImport(
        `GetOptionType from '@tigrensolutions/product-swatches/src/components/getOptionType.js'`
    );
    optionComponent.insertBeforeSource(
        `getOptionType({ attribute_code, values })`,
        `GetOptionType(options)`,
        {
            remove: 41
        }
    );
};
