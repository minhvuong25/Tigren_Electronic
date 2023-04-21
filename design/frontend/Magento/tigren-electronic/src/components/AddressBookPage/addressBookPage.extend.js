module.exports = targetables => {
    const addressBookPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/AddressBookPage/addressBookPage.js'
    );
    addressBookPageComponent.addImport(
        `extendClasses from 'src/components/AddressBookPage/addressBookPage.module.css'`
    );
    addressBookPageComponent.addImport(
        `Address from '@tigrensolutions/core/src/components/MyAccount/Dashboard/address.js'`
    );
    addressBookPageComponent.addImport(
        `LinkButton from '@magento/venia-ui/lib/components/LinkButton';`
    );
    addressBookPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
    addressBookPageComponent
        .insertBeforeSource(
            `const btnAddNewAddress = (`,
            `const defaultBillingAddress = (customerAddresses || []).find(
        address => address.default_billing
    );

    const defaultShippingAddress = (customerAddresses || []).find(address => address.default_shipping);
    const boundEditDefaultBillingAddress = () => handleEditAddress(defaultBillingAddress);
    const boundEditDefaultShippingAddress = () => handleEditAddress(defaultShippingAddress);`
        )
        .insertBeforeSource(
            `<div className={classes.additionalAddresses}>`,
            `
                <div className={classes.groupTitle}>
                    <h3>
                        <FormattedMessage
                            id="addressBookPage.accountInformation"
                            defaultMessage="Account Information"
                        />
                    </h3>
                </div>
                 <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.defaultBilling"
                                defaultMessage="Default Billing Address"
                            />
                        </h3>
                        <div className={classes.content}>
                            <Address address={defaultBillingAddress} />
                            { defaultBillingAddress && <LinkButton
                                classes={{ root: classes.editButton }}
                                onClick={boundEditDefaultBillingAddress}
                            >
                                 <span className={classes.iconEdit} />
                                <span className={classes.actionLabel}>
                                    <FormattedMessage
                                        id="global.editButton"
                                        defaultMessage={'Edit'}
                                    />
                                </span>
                            </LinkButton>
                            }
                        </div>
                    </div>
                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.shippingAddress"
                                defaultMessage="Default Shipping Address"
                            />
                        </h3>
                        <div className={classes.content}>
                            <Address address={defaultShippingAddress} />
                            { defaultShippingAddress && <LinkButton
                                classes={{ root: classes.editButton }}
                                onClick={boundEditDefaultShippingAddress}
                            >
                                 <span className={classes.iconEdit} />
                                <span className={classes.actionLabel}>
                                    <FormattedMessage
                                        id="global.editButton"
                                        defaultMessage={'Edit'}
                                    />
                                </span>
                            </LinkButton>
                            }
                        </div>
                    </div>
                </div>`
        )
        .insertBeforeSource(`<Icon size={16} src={Plus} />`, ``, {
            remove: 29
        });
};
