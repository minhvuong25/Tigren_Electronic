import React, { Fragment, useMemo, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, func } from 'prop-types';
import { PlusSquare } from 'react-feather';
import { useBillingAddressBook } from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/BillingAddress/useBillingAddressBook';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './billingAddressBook.module.css';
import AddressCard from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressCard';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const EditModal = React.lazy(() =>
    import('@tigrensolutions/advanced-checkout/src/components/CheckoutPage/BillingAddress/editModal')
);

const BillingAddressBook = props => {
    const { classes: propClasses, onSuccess, customerAddresses } = props;

    const talonProps = useBillingAddressBook(props);

    const {
        activeAddress,
        isLoading,
        selectedAddress,
        handleApplyBillingAddress,
        handleAddBillingAddress,
        handleEditBillingAddress
    } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);

    const addAddressButton = useMemo(
        () => (
            <LinkButton
                className={classes.addButton}
                key="addAddressBillingButton"
                onClick={handleAddBillingAddress}
                disabled={isLoading}
            >
                <Icon
                    size={24}
                    src={PlusSquare}
                    classes={{
                        icon: classes.addIcon
                    }}
                />
                <span className={classes.addText}>
                    <FormattedMessage
                        id={'checkoutPage.addBilling'}
                        defaultMessage={'Add Billing Address'}
                    />
                </span>
            </LinkButton>
        ),
        [classes.addButton, classes.addText, handleAddBillingAddress, isLoading]
    );

    const addressElements = useMemo(() => {
        let defaultIndex;
        const addresses = customerAddresses.map((address, index) => {
            const isSelected = selectedAddress === address.id;

            if (address.default_billing) {
                defaultIndex = index;
            }

            return (
                <AddressCard
                    address={address}
                    isSelected={isSelected}
                    key={address.id}
                    onSelection={handleApplyBillingAddress}
                    onEdit={handleEditBillingAddress}
                    isBillingAddress={true}
                />
            );
        });

        // Position the default address first in the elements list
        if (defaultIndex) {
            [addresses[0], addresses[defaultIndex]] = [
                addresses[defaultIndex],
                addresses[0]
            ];
        }

        return [...addresses];
    }, [
        customerAddresses,
        handleEditBillingAddress,
        selectedAddress,
        isLoading,
        handleApplyBillingAddress
    ]);

    const contentClass = isLoading ? classes.contentLoading : classes.content;

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.list}>
                    <h1 className={classes.billingAddressTitle}>
                        <FormattedMessage
                            id="checkoutPage.billingAddressTitle"
                            defaultMessage="Billing Address"
                        />
                    </h1>
                    <div className={contentClass}>{addressElements}</div>
                    {addAddressButton}
                </div>
            </div>
            <Suspense fallback={null}>
                <EditModal onSuccess={onSuccess} shippingData={activeAddress} />
            </Suspense>
        </Fragment>
    );
};

export default BillingAddressBook;

BillingAddressBook.propTypes = {
    activeContent: string.isRequired,
    classes: shape({
        root: string,
        root_active: string,
        headerText: string,
        buttonContainer: string,
        content: string,
        addButton: string,
        addIcon: string,
        addText: string
    }),
    onSuccess: func.isRequired
};
