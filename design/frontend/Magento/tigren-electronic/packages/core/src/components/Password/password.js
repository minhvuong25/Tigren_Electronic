import React from 'react';
import { string, bool, shape, func } from 'prop-types';
import { Eye, EyeOff } from 'react-feather';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { usePassword } from '@tigrensolutions/core/src/talons/Password/usePassword';

import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import PasswordStrengthBar from '@tigrensolutions/core/src/components/PasswordStrengthBar';
import combinePassword from './combinePassword';
import defaultClasses from './password.module.css';

const Password = props => {
    const {
        classes: propClasses,
        label,
        fieldName,
        isToggleButtonHidden,
        autoComplete,
        validate,
        isRequired,
        strengthBar,
        ...otherProps
    } = props;

    const talonProps = usePassword();
    const {
        handleBlur,
        togglePasswordVisibility,
        visible,
        handleChangePassword,
        passwordText,
        loading,
        minimumPasswordLength
    } = talonProps;
    const classes = useStyle(defaultClasses, propClasses);

    const passwordButton = (
        <Button
            className={classes.passwordButton}
            onClick={togglePasswordVisibility}
            type="button"
        >
            {visible ? <Eye /> : <EyeOff />}
        </Button>
    );

    const fieldType = visible ? 'text' : 'password';

    const rootClass = strengthBar ? classes.strengthBarRoot : classes.root;
    if (loading) {
        return null;
    }
    return (
        <Field
            label={label}
            classes={{ root: rootClass }}
            isRequired={isRequired}
        >
            <TextInput
                after={!isToggleButtonHidden && passwordButton}
                autoComplete={autoComplete}
                field={fieldName}
                type={fieldType}
                validate={combinePassword(validate, minimumPasswordLength)}
                onBlur={handleBlur}
                onChange={handleChangePassword}
                {...otherProps}
            />
            {strengthBar && (
                <PasswordStrengthBar
                    passwordText={passwordText}
                    minimumPasswordLength={minimumPasswordLength}
                />
            )}
        </Field>
    );
};

Password.propTypes = {
    autoComplete: string,
    classes: shape({
        root: string
    }),
    label: string,
    fieldName: string,
    isToggleButtonHidden: bool,
    validate: func
};

Password.defaultProps = {
    isToggleButtonHidden: true,
    validate: isRequired,
    isRequired: true
};

export default Password;
