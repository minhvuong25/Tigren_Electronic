import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';
import { Form } from 'informed';
import { useResetPassword } from '@tigrensolutions/core/src/talons/MyAccount/useResetPassword';
import { useStyle } from '@magento/venia-ui/lib/classify';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import { validateConfirmPassword } from '@tigrensolutions/base/src/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Password from '@tigrensolutions/core/src/components/Password/password.js';
import resetPasswordOperations from './resetPassword.gql';
import Breadcrumbs from '@tigrensolutions/core/src/components/Breadcrumbs';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import defaultClasses from './resetPassword.module.css';

const ResetPassword = props => {
    const { classes: propClasses } = props;
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, propClasses);
    const talonProps = useResetPassword({ ...resetPasswordOperations });
    const { loading, handleSubmit } = talonProps;

    const PAGE_TITLE = formatMessage({
        id: 'resetPassword.pageTitleText',
        defaultMessage: 'Reset Password'
    });

    if (loading) {
        return fullPageLoadingIndicator;
    }

    return (
        <Fragment>
            <Breadcrumbs staticPart={PAGE_TITLE} />
            <StoreTitle>{PAGE_TITLE}</StoreTitle>
            <div className={classes.root}>
                <Form className={classes.container} onSubmit={handleSubmit}>
                    <h1 className={classes.heading}>{PAGE_TITLE}</h1>
                    <Password
                        autoComplete="new-password"
                        fieldName="newPassword"
                        isToggleButtonHidden={true}
                        label={formatMessage({
                            id: 'resetPassword.newPasswordText',
                            defaultMessage: 'New Password'
                        })}
                        validate={combine([
                            isRequired,
                            [hasLengthAtLeast, 8],
                            validatePassword
                        ])}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        strengthBar={true}
                    />

                    <Password
                        autoComplete="new-password"
                        fieldName="confirm"
                        isToggleButtonHidden={true}
                        label={formatMessage({
                            id: 'global.confirmNewPassword',
                            defaultMessage: 'Confirm New Password'
                        })}
                        validate={combine([
                            [validateConfirmPassword, 'newPassword']
                        ])}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        strengthBar={false}
                    />

                    <Button
                        className={classes.submitButton}
                        type="submit"
                        priority="high"
                        disabled={loading}
                    >
                        <FormattedMessage
                            id="resetPassword.savePassword"
                            defaultMessage="Save Password"
                        />
                    </Button>
                </Form>
            </div>
        </Fragment>
    );
};
export default ResetPassword;
ResetPassword.propTypes = {
    classes: shape({
        container: string,
        description: string,
        errorMessage: string,
        heading: string,
        invalidToken: string,
        invalidTokenContainer: string,
        password: string,
        root: string,
        submitButton: string,
        successMessage: string,
        successMessageContainer: string
    })
};
