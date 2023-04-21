import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { FormattedMessage } from 'react-intl';

import defaultClasses from './address.module.css';

const Address = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);
    const { address } = props;

    if (!address) {
        return (
            <div className={classes.root}>
                <span>
                    <FormattedMessage
                        id="address.noAddress"
                        defaultMessage="You have no addresses"
                    />
                </span>
            </div>
        );
    }

    const {
        firstname = '',
        middlename = '',
        lastname = '',
        city,
        street,
        telephone,
        region: { region },
        postcode,
        country_name
    } = address;

    const nameString = [firstname, middlename, lastname]
        .filter(name => !!name)
        .join(' ');

    const additionalAddressString = `${city}, ${region} ${postcode} ${country_name}`;

    const streetRows = street.map((row, index) => {
        return (
            <span className={classes.streetRow} key={index}>
                {row}
            </span>
        );
    });

    return (
        <div className={classes.root}>
            <span className={classes.name}>{nameString}</span>

            <span className={classes.additionalAddress}>
                {streetRows}
                {', '}

                {additionalAddressString}
            </span>

            <span className={classes.telephone}>{telephone}</span>
        </div>
    );
};

export default Address;

Address.propTypes = {
    classes: shape({
        root: string
    })
};

Address.defaultProps = {};
