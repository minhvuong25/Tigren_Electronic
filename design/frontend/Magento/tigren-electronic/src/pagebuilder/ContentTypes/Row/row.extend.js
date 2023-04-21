module.exports = targetables => {
    const rowGroupComponent = targetables.reactComponent(
        '@magento/pagebuilder/lib/ContentTypes/Row/row.js'
    );
    rowGroupComponent.addImport(
        `extendClasses from 'src/pagebuilder/ContentTypes/Row/row.module.css'`
    );
    rowGroupComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendClasses`
    );
};
