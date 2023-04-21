module.exports = targetables => {
    const addEditDialogComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/AddressBookPage/addEditDialog.js'
    );
    addEditDialogComponent.addImport(
        `extendClasses from 'src/components/AddressBookPage/addEditDialog.module.css'`
    );
    addEditDialogComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
