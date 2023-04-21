import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory, Link } from 'react-router-dom';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './failure.module.css';
import { Util } from '@magento/peregrine';
import Button from '@magento/venia-ui/lib/components/Button';
import { useUserContext } from '@magento/peregrine/lib/context/user';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();
const orderNumber = storage.getItem('lastOrderNumber');
import checkoutFail from '@tigrensolutions/failure-page/src/static/images/image-checkout-fail@2x.png';

const CheckoutFailure = props => {
    const { formatMessage } = useIntl();
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();
    const goToHomePage = () => {
        history.push('/');
    };

    const classes = mergeClasses(defaultClasses, props.classes);

    const title = formatMessage({
        id: 'CheckoutFailure.failureTitle',
        defaultMessage: 'Purchase order failed.'
    });
    const linkToRedirect = isSignedIn ? `/order-history` : `/sign-in`;
    return (
        <div className={classes.root}>
            <img src={checkoutFail} alt={title} className={classes.image} />
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.listOrder}>
                {formatMessage({
                    id: 'CheckoutFailure.failureList',
                    defaultMessage: 'Order Id'
                })}
                {': '}
                <Link to={linkToRedirect}>
                    <span>#{orderNumber}</span>
                </Link>
            </p>
            <p className={classes.message}>
                {formatMessage({
                    id: 'CheckoutFailure.failureMessage',
                    defaultMessage:
                        'Something went wrong. Please make another purchase.'
                })}
            </p>
            <div className={classes.action}>
                <Button priority="warning" type="button" onClick={goToHomePage}>
                    <span>
                        {formatMessage({
                            id: 'errorView.goHome',
                            defaultMessage: 'Back to Homepage'
                        })}
                    </span>
                </Button>
                <Button priority="high" type="button" onClick={goToHomePage}>
                    <span>
                        {formatMessage({
                            id: 'CheckoutFailure.payAgain',
                            defaultMessage: 'Pay again'
                        })}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default CheckoutFailure;
