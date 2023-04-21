module.exports = targetables => {
    const columnComponent = targetables.reactComponent(
        '@magento/pagebuilder/lib/ContentTypes/Column/column.js'
    );
    columnComponent.addImport(
        `extendClasses from 'src/pagebuilder/ContentTypes/Column/column.module.css'`
    );
    columnComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendClasses`
    );
};
