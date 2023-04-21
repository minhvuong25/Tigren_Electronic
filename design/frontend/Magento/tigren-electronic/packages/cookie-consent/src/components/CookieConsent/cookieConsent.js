import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './cookieConsent.module.css';
import { FormattedMessage, useIntl } from 'react-intl';

const ContactPopup = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    return (
        <CookieConsent
            cookieName={'cookie_accepted'}
            location="bottom"
            buttonText={formatMessage({
                id: 'global.accept',
                defaultMessage: 'Accept'
            })}
            containerClasses={classes.root}
            contentClasses={classes.content}
            buttonClasses={classes.button}
            buttonWrapperClasses={classes.buttonContainer}
            disableStyles={true}
            expires={150}
        >
            <span className={classes.text}>
                <FormattedMessage
                    id="app.cookieConsent"
                    defaultMessage={
                        'We use Cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from.'
                    }
                />
            </span>
        </CookieConsent>
    );
};

export default ContactPopup;
