import React, { useRef } from 'react';
import { arrayOf, bool, instanceOf, shape, string } from 'prop-types';

import { useFormError } from '@tigrensolutions/core/src/talons/FormError/useFormError';
import { useScrollIntoView } from '@magento/peregrine/lib/hooks/useScrollIntoView';

import { useStyle } from '@magento/venia-ui/lib/classify';
import ErrorMessage from '@magento/venia-ui/lib/components/ErrorMessage';
import defaultClasses from './formError.module.css';

const FormError = props => {
    const {
        classes: propClasses,
        errors,
        scrollOnError,
        showDefaultMessage
    } = props;

    const talonProps = useFormError({ errors, showDefaultMessage });
    const { errorMessage } = talonProps;

    const errorRef = useRef(null);

    useScrollIntoView(errorRef, scrollOnError && errorMessage);

    const classes = useStyle(defaultClasses, propClasses);

    return errorMessage ? (
        <ErrorMessage classes={classes} ref={errorRef}>
            {errorMessage}
        </ErrorMessage>
    ) : null;
};

export default FormError;

FormError.propTypes = {
    classes: shape({
        root: string,
        errorMessage: string
    }),
    errors: arrayOf(instanceOf(Error)),
    scrollOnError: bool
};

FormError.defaultProps = {
    scrollOnError: true,
    showDefaultMessage: false
};
