import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { func, string, shape } from 'prop-types';
import { Edit2 as EditIcon } from 'react-feather';

import { useStyle } from '@magento/venia-ui/lib/classify';
import AddressBook from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook';
import Card from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/card';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformation.module.css';
import moduleClasses from './shippingAddress.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Icon from '@magento/venia-ui/lib/components/Icon';

const ShippingAddress = props => {
    const {
        classes: propClasses,
        onSuccess,
        toggleActiveContent,
        doneEditing,
        handleEditShipping,
        isSignedIn,
        shippingData
    } = props;

    const classes = useStyle(defaultClasses, moduleClasses, propClasses);

    const contents = isSignedIn ? (
        <Fragment>
            <h5 className={classes.cardTitle} data-cy="shipping-done-title">
                <FormattedMessage
                    id={'shippingInformation.cardTitle'}
                    defaultMessage={'Shipping Information'}
                />
            </h5>
            <AddressBook
                activeContent={'addressBook'}
                toggleActiveContent={toggleActiveContent}
                onSuccess={onSuccess}
                doneEditing={doneEditing}
            />
        </Fragment>
    ) : (
        <Fragment>
            <h5 className={classes.cardTitle}>
                <FormattedMessage
                    id={'shippingInformation.cardTitle'}
                    defaultMessage={'Shipping Information'}
                />
            </h5>
            <div className={classes.cardContent}>
                <Card shippingData={shippingData} />
                <LinkButton
                    onClick={handleEditShipping}
                    className={classes.editButton}
                    data-cy="ShippingInformation-editButton"
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.editIcon }}
                    />
                    <span className={classes.editText}>
                        <FormattedMessage
                            id={'global.editButton'}
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
            </div>
        </Fragment>
    );

    return (
        <div className={classes.cardHeaderEdit} data-cy="shippingInformation">
            {contents}
        </div>
    );
};

export default ShippingAddress;

ShippingAddress.propTypes = {
    classes: shape({
        cardHeader: string,
        cartTitle: string,
        editWrapper: string,
        editTitle: string,
        editButton: string,
        editIcon: string,
        editText: string
    }),
    onSave: func.isRequired,
    onSuccess: func.isRequired
};
