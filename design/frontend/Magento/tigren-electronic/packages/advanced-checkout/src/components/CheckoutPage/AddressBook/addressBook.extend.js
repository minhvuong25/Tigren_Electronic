module.exports = (targetables, targetablePath) => {
    const addressBook = targetables.reactComponent(targetablePath);
    addressBook.removeJSX('div className={classes.buttonContainer}');
    addressBook.removeJSX('h1 className={classes.headerText}');
    addressBook.addImport(
        "moduleClasses from '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/AddressBook/addressBook.module.css'"
    );
    addressBook.insertAfterSource(
        'useStyle(defaultClasses,',
        ' moduleClasses,'
    );

    addressBook.insertBeforeSource(
        'const addressElements = useMemo(() => {',
        `const contentClass = isLoading ? classes.contentLoading : classes.content;
        `
    );
    addressBook.insertAfterSource(
        'div className={classes.content',
        " + ' ' + contentClass"
    );

    //move add button
    addressBook
        .insertAfterSource('return [...addresses', '', { remove: 18 })
        .insertAfterSource('{addressElements}</div>', '{addAddressButton}');
};
