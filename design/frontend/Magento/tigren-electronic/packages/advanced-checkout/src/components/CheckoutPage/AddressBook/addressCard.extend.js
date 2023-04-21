module.exports = (targetables, targetablePath) => {
    const addressCard = targetables.reactComponent(targetablePath);

    //check address default shipping or default billing
    addressCard
        .insertAfterSource('classes: propClasses,', 'isBillingAddress,')
        .insertAfterSource('default_shipping,', 'default_billing,');

    addressCard.insertAfterSource(
        'const defaultBadge = ',
        '(!isBillingAddress && default_shipping) || (isBillingAddress && default_billing) ',
        { remove: 16 }
    );

    addressCard.insertBeforeSource(
        'const editButton = ',
        `const deliveryButton = !isSelected ? (
                <button
                    className={classes.deliveryButton}
                    onClick={handleClick}
                    onKeyPress={handleKeyPress}
                >
                    {isBillingAddress ? (
                        <span className={classes.deliveryTitle}>
                            <FormattedMessage
                                id={'addressBook.billingHere'}
                                defaultMessage={'Billing Here'}
                            />
                        </span>
                    ) : (
                        <span className={classes.deliveryTitle}>
                            <FormattedMessage
                                id={'addressBook.deliveryHere'}
                                defaultMessage={'Delivery Here'}
                            />
                        </span>
                    )}

                </button>
            ) : null;
`
    );

    addressCard.insertAfterSource(
        '<button className={classes.editButton} onClick={handleEditAddress}>',
        `
            <FormattedMessage
                    id={'addressBook.Edit'}
                    defaultMessage={'Edit'}
                />`
    );
    addressCard
        .insertBeforeSource(
            '{editButton}',
            `<div className={classes.buttonContainer}>`
        )
        .insertAfterSource('{editButton}', `{deliveryButton}</div>`);

    addressCard
        .insertBeforeSource('{defaultBadge}', '<div>')
        .insertAfterSource('<span>{additionalAddressString}</span>', '</div>');

    addressCard.insertAfterSource('className={rootClass}', '', { remove: 74 });

    addressCard.addImport(
        "moduleClasses from '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/AddressBook/addressCard.module.css'"
    );
    addressCard.insertAfterSource(
        'useStyle(defaultClasses,',
        ' moduleClasses,'
    );

    addressCard.insertAfterSource('<span key={index}>{row}', ', ');

    //Add country name into address template
    addressCard.insertBeforeSource(
        'country_code}',
        'address?.country_name ? address?.country_name : '
    );
};
