import React, { useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';

import { useIntl } from 'react-intl';
import defaultClasses from './passwordStrengthBar.module.css';

import getPasswordStrength from '@tigrensolutions/core/src/util/getPasswordStrength';

const PasswordStrengthBar = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { passwordText, minimumPasswordLength } = props;

    const { formatMessage } = useIntl();

    const veryStrongText = formatMessage({
        id: 'passwordStrengthBar.veryStrong',
        defaultMessage: 'Very Strong'
    });
    const strongText = formatMessage({
        id: 'passwordStrengthBar.strong',
        defaultMessage: 'Strong'
    });
    const mediumText = formatMessage({
        id: 'passwordStrengthBar.medium',
        defaultMessage: 'Medium'
    });
    const weekText = formatMessage({
        id: 'passwordStrengthBar.week',
        defaultMessage: 'Weak'
    });
    const noPasswordText = formatMessage({
        id: 'passwordStrengthBar.noPassword',
        defaultMessage: 'No Password'
    });

    const statusTexts = [
        veryStrongText,
        strongText,
        mediumText,
        weekText,
        noPasswordText
    ];
    const statusClasses = [
        classes.veryStrong,
        classes.strong,
        classes.medium,
        classes.week,
        classes.noPassword
    ];

    const strengthLevel = useMemo(() => {
        return getPasswordStrength(passwordText, minimumPasswordLength);
    }, [passwordText]);

    return (
        <div className={classes.root}>
            <p className={`${classes.status} ${statusClasses[strengthLevel]}`}>
                <span>
                    <span className={classes.label}>
                        {formatMessage({
                            id: 'passwordStrengthBar.password',
                            defaultMessage: 'Password Strength'
                        })}
                    </span>
                    <span>{statusTexts[strengthLevel]}</span>
                </span>
            </p>
        </div>
    );
};

PasswordStrengthBar.propTypes = {
    classes: shape({ root: string })
};
PasswordStrengthBar.defaultProps = {};
export default PasswordStrengthBar;
