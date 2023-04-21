import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';

import { useCompareContext } from '@tigrensolutions/compare/src/context';
import { assignCompareListMutation } from '@tigrensolutions/compare/src/talons/compareList.gql';

const ExtendCompare = () => {
    const [
        ,
        { removeCompare, assignCompareList: assignCompareListAction }
    ] = useCompareContext();
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    const [assignCompareList] = useMutation(assignCompareListMutation);

    const assignCompare = useCallback(() => {
        assignCompareListAction({
            assignCompareList,
            formatMessage,
            addToast
        });
    }, []);

    return {
        removeCompare,
        assignCompare
    };
};

export default ExtendCompare;
