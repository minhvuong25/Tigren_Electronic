import { useCallback, useMemo, useState } from 'react';
import DEFAULT_OPERATIONS from './password.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useQuery } from '@apollo/client';

/**
 * Returns props necessary to render a Password component.
 *
 * @returns {PasswordProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { usePassword } from '@magento/peregrine/lib/talons/Password/usePassword.js';
 */
export const usePassword = (props = {}) => {
    const [visible, setVisbility] = useState(false);

    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const { getStoreConfigQuery } = operations;
    const { data: getStoreConfigs, loading } = useQuery(getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const minimumPasswordLength =
        parseInt(getStoreConfigs?.storeConfig?.minimum_password_length) || 8;

    const togglePasswordVisibility = useCallback(() => {
        setVisbility(!visible);

        // TODO: Clicking the "toggle visibility" button does not focus the
        // input, which means `onBlur` will not be called. To work around this
        // we would need to somehow focus the input after this toggle, but that
        // probably requires passing a ref down to informed.
    }, [visible]);

    const handleBlur = useCallback(() => {
        setVisbility(false);
    }, []);

    const [passwordText, setPasswordText] = useState();
    const handleChangePassword = useCallback(
        e => {
            const value = e.target.value;
            setPasswordText(value);
        },
        [setPasswordText]
    );

    return {
        handleBlur,
        togglePasswordVisibility,
        visible,
        handleChangePassword,
        passwordText,
        minimumPasswordLength,
        loading
    };
};

/** JSDocs type definitions */

/**
 * Object type returned by the {@link usePassword} talon.
 * It provides props data to use when rendering the password component.
 *
 * @typedef {Object} PasswordProps
 *
 * @property {Function} handleBlur Callback to invoke when field is blurred
 * @property {Function} togglePasswordVisibility Callback function to toggle password visibility
 * @property {Boolean} visible If true password should be visible. Hidden if false.
 */
