import { useMemo } from 'react';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import { useIntl } from 'react-intl';

export const useFormError = props => {
    const { errors, showDefaultMessage } = props;
    const { formatMessage } = useIntl();

    const derivedErrorMessage = useMemo(() => {
        if (showDefaultMessage) {
            const defaultErrorMessage = formatMessage({
                id: 'formError.errorMessage',
                defaultMessage:
                    'An error has occurred. Please check the input and try again.'
            });
            return deriveErrorMessage(errors, defaultErrorMessage);
        } else {
            return deriveErrorMessage(errors);
        }
    }, [errors, formatMessage]);

    return {
        errorMessage: derivedErrorMessage
    };
};
