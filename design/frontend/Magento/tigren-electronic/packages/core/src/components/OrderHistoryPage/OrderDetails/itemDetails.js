import React from 'react';
import Items from './items';
import { useOrderRow } from '@tigrensolutions/core/src/talons/OrderHistoryPage/useOrderRow';

const ItemDetails = props => {
    const { items, itemDefault, isSuccess } = props;
    const talonProps = useOrderRow({ items });
    const { imagesData, loading } = talonProps;

    if (loading) {
        return null;
    }
    return (
        <Items
            data={{ items }}
            imagesData={imagesData}
            itemDefault={itemDefault}
            isSuccess={isSuccess}
        />
    );
};

export default ItemDetails;
