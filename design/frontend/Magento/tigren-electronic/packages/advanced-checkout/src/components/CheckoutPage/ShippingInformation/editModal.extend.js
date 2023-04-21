module.exports = (targetables, targetablePath) => {
    const editModal = targetables.reactComponent(targetablePath);

    editModal
        .insertBeforeSource(
            'const bodyElement = isOpen ? (',
            `const isUpdate = !!shippingData && !!shippingData.city;

    const title = !isUpdate ? (
        <FormattedMessage
            id={'checkoutPage.addShipping'}
            defaultMessage={'Add Shipping Address'}
        />
    ) : (
        <FormattedMessage
            id={'checkoutPage.editShippingInfo'}
            defaultMessage={'Edit Shipping Information'}
        />
    );
    `
        )
        .insertAfterSource('<span className={classes.headerText}>', '{title}', {
            remove: 207
        });
};
