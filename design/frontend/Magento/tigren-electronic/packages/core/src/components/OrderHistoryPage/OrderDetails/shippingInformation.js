import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './shippingInformation.module.css';

const ShippingInformation = props => {
    const { data, classes: propsClasses } = props;
    const classes = useStyle(defaultClasses, propsClasses);

    let shippingContentElement;

    if (data) {
        const {
            city,
            firstname,
            lastname,
            postcode,
            region,
            street,
            telephone,
            country_name
        } = data;

        const additionalAddressString = `${city}, ${region} ${postcode} ${country_name}`;
        const fullName = `${firstname} ${lastname}`;
        const streetRows = street.map((row, index) => {
            return (
                <span className={classes.streetRow} key={index}>
                    {row}
                </span>
            );
        });

        shippingContentElement = (
            <div className={classes.info}>
                <span className={classes.name}>{fullName}</span>
                {streetRows}
                <div className={classes.additionalAddress}>
                    {additionalAddressString}
                </div>
                <span className={classes.telephone}>{telephone}</span>
            </div>
        );
    } else {
        shippingContentElement = (
            <FormattedMessage
                id="orderDetails.noShippingInformation"
                defaultMessage="No shipping information"
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <FormattedMessage
                    id="orderDetails.shippingInformationLabel"
                    defaultMessage="Shipping Information"
                />
            </div>
            {shippingContentElement}
        </div>
    );
};

export default ShippingInformation;

ShippingInformation.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        name: string,
        streetRow: string,
        additionalAddress: string
    }),
    data: shape({
        city: string,
        country_code: string,
        firstname: string,
        lastname: string,
        postcode: string,
        region: string,
        street: arrayOf(string),
        telephone: string
    })
};
