import React from 'react';
import defaultClasses from './noAddress.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import imgNoAddress from '@tigrensolutions/core/src/static/images/address.png';
import { FormattedMessage } from 'react-intl';

const NoAddress = props => {
    const classes = useStyle(defaultClasses);
    return (
        <div className={classes.root}>
            <div>
                <img
                    src={imgNoAddress}
                    alt={'no address'}
                    className={classes.img}
                />
                <div className={classes.wrapText}>
                    <h3>
                        <FormattedMessage
                            id={'addressBookPage.noAddress'}
                            defaultMessage={"You don't have a saved address."}
                        />
                    </h3>
                    <h5>
                        <FormattedMessage
                            id={'addressBookPage.clickToAddress'}
                            defaultMessage={
                                'Please click the button below to add your address.'
                            }
                        />
                    </h5>
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default NoAddress;
