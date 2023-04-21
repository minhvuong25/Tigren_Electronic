import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAddressBookPage } from '@tigrensolutions/core/src/talons/AddressBookPage/useAddressBookPage';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Button from '@magento/venia-ui/lib/components/Button';
import { Plus } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';

import AddressCard from './addressCard';
import AddEditDialog from './addEditDialog';
import NoAddress from './NoAddress/noAddress';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './addressBookPage.module.css';

const AddressBookPage = props => {
    const talonProps = useAddressBookPage();
    const {
        confirmDeleteAddressId,
        customerAddresses,
        formErrors,
        formProps,
        handleAddAddress,
        handleCancelDeleteAddress,
        handleCancelForm,
        handleConfirmDeleteAddress,
        handleConfirmForm,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress,
        isFormBusy,
        isFormEditMode,
        isFormOpen,
        isLoading,
        formApi,
        setFormApi
    } = talonProps;

    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes);

    const PAGE_TITLE = formatMessage({
        id: 'addressBookPage.addressBookText',
        defaultMessage: 'Address Book'
    });

    const addressBookElements = useMemo(() => {
        return Array.from(customerAddresses).map(addressEntry => {
            const boundEdit = () => handleEditAddress(addressEntry);
            const boundDelete = () => handleDeleteAddress(addressEntry.id);
            const isConfirmingDelete =
                confirmDeleteAddressId === addressEntry.id;

            return (
                <AddressCard
                    address={addressEntry}
                    isConfirmingDelete={isConfirmingDelete}
                    isDeletingCustomerAddress={isDeletingCustomerAddress}
                    key={addressEntry.id}
                    onCancelDelete={handleCancelDeleteAddress}
                    onConfirmDelete={handleConfirmDeleteAddress}
                    onDelete={boundDelete}
                    onEdit={boundEdit}
                    classes={{
                        root: classes.addressItem,
                        contentContainer: classes.addressContentContainer,
                        actionContainer: classes.addressActionContainer,
                        deleteButton: classes.deleteButton
                    }}
                />
            );
        });
    }, [
        confirmDeleteAddressId,
        customerAddresses,
        handleCancelDeleteAddress,
        handleConfirmDeleteAddress,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress
    ]);

    const btnAddNewAddress = (
        <Button
            classes={{
                root_highPriority: classes.addButton
            }}
            priority="high"
            key="addAddressButton"
            onClick={handleAddAddress}
        >
            <Icon size={16} src={Plus} />
            <FormattedMessage
                id={'addressBookPage.addDialogTitle'}
                defaultMessage={'Add New Address'}
            />
        </Button>
    );

    const content = useMemo(() => {
        if (isLoading) {
            return (
                <div className={classes.shimmerContainer}>
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                </div>
            );
        }

        if (addressBookElements.length > 0) {
            return (
                <div className={classes.blockContent}>
                    <div className={classes.additionalAddress}>
                        <div className={classes.listAddress}>
                            <div className={classes.header}>
                                <span>
                                    <FormattedMessage
                                        id="addressBookPage.name"
                                        defaultMessage="Name"
                                    />
                                </span>
                                <span>
                                    <FormattedMessage
                                        id="addressBookPage.address"
                                        defaultMessage="Address"
                                    />
                                </span>
                            </div>
                            {addressBookElements}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <NoAddress>{btnAddNewAddress}</NoAddress>;
        }
    }, [isLoading, addressBookElements, btnAddNewAddress]);

    return (
        <div className={classes.root}>
            <StoreTitle>{PAGE_TITLE}</StoreTitle>
            {isFormOpen ? (
                <AddEditDialog
                    formErrors={formErrors}
                    formProps={formProps}
                    isBusy={isFormBusy}
                    isEditMode={isFormEditMode}
                    isOpen={isFormOpen}
                    onCancel={handleCancelForm}
                    onConfirm={handleConfirmForm}
                    formApi={formApi}
                    setFormApi={setFormApi}
                    hasAddress={
                        customerAddresses && customerAddresses.length > 0
                    }
                    isHadAddress={customerAddresses.length > 0}
                />
            ) : (
                <div className={classes.content}>
                    <div className={classes.additionalAddresses}>
                        <div className={classes.blockTitle}>
                            <h1>{PAGE_TITLE}</h1>
                            {addressBookElements.length > 0 && (
                                <div className={classes.actions}>
                                    {btnAddNewAddress}
                                </div>
                            )}
                        </div>
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressBookPage;
