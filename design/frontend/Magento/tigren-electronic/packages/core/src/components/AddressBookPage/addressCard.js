import React from 'react';
import { FormattedMessage } from 'react-intl';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import defaultClasses from './addressCard.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const AddressCard = props => {
    const {
        address,
        classes: propClasses,
        isConfirmingDelete,
        isDeletingCustomerAddress,
        onCancelDelete,
        onConfirmDelete,
        onEdit,
        onDelete
    } = props;

    const {
        city,
        default_shipping,
        default_billing,
        firstname,
        middlename = '',
        lastname,
        postcode,
        region: { region },
        street,
        telephone,
        country_name
    } = address;

    const classes = mergeClasses(defaultClasses, propClasses);

    const streetRows = street.map((row, index) => {
        return (
            <span className={classes.streetRow} key={index}>
                {row}
            </span>
        );
    });

    const nameString = [firstname, middlename, lastname]
        .filter(name => !!name)
        .join(' ');
    const additionalAddressString = `${city}, ${region} ${postcode} ${country_name}`;

    const deleteButtonElement =
        !default_shipping && !default_billing ? (
            <LinkButton
                classes={{ root: classes.deleteButton }}
                onClick={onDelete}
            >
                <span className={classes.actionLabel}>
                    <FormattedMessage
                        id="global.deleteButton"
                        defaultMessage="Delete"
                    />
                </span>
            </LinkButton>
        ) : null;

    return (
        <div className={classes.root}>
            <span className={classes.name}>{nameString}</span>

            <div className={classes.address}>
                <div className={classes.detail}>
                    <span className={classes.additionalAddress}>
                        {streetRows}, {additionalAddressString}
                    </span>

                    <span className={classes.telephone}>{telephone}</span>
                </div>

                <div className={classes.badgeContainer}>
                    {default_shipping && (
                        <div className={classes.badge}>
                            <FormattedMessage
                                id="addressBookPage.defaultShipping"
                                defaultMessage={'Default shipping'}
                            />
                        </div>
                    )}

                    {default_billing && (
                        <div className={classes.badge}>
                            <FormattedMessage
                                id="addressBookPage.defaultBilling"
                                defaultMessage={'Default billing'}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.actionContainer}>
                <LinkButton
                    classes={{ root: classes.editButton }}
                    onClick={onEdit}
                >
                    <span className={classes.actionLabel}>
                        <FormattedMessage
                            id="global.editButton"
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
                {deleteButtonElement}
                <Dialog
                    confirmTranslationId={'addressCard.delete'}
                    confirmText={'Delete address'}
                    cancelTranslationId={'global.cancelButton'}
                    cancelText={'Cancel'}
                    isOpen={isConfirmingDelete}
                    onCancel={onCancelDelete}
                    onConfirm={onConfirmDelete}
                    shouldDisableAllButtons={isDeletingCustomerAddress}
                    layout={'deleteAddress'}
                    customClass={'confirm_remove_address'}
                    classes={{
                        header: classes.headerDialog,
                        body: classes.body,
                        dialog: classes.rootDialog,
                        buttons: classes.dialogButtons
                    }}
                >
                    <div className={classes.textDelete}>
                        <FormattedMessage
                            id={'addressCard.textDelete'}
                            defaultMessage={
                                'Are you sure you want to delete this address?'
                            }
                        />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default AddressCard;

AddressCard.propTypes = {
    address: shape({
        city: string,
        country_code: string,
        default_shipping: bool,
        firstname: string,
        lastname: string,
        postcode: string,
        region: shape({
            region_code: string,
            region: string
        }),
        street: arrayOf(string),
        telephone: string
    }).isRequired,
    classes: shape({
        actionContainer: string,
        actionLabel: string,
        additionalAddress: string,
        contentContainer: string,
        country: string,
        defaultBadge: string,
        defaultCard: string,
        deleteButton: string,
        editButton: string,
        flash: string,
        linkButton: string,
        name: string,
        root: string,
        root_updated: string,
        streetRow: string,
        telephone: string
    }),
    countryName: string,
    isConfirmingDelete: bool,
    isDeletingCustomerAddress: bool,
    onCancelDelete: func,
    onConfirmDelete: func,
    onDelete: func,
    onEdit: func
};
