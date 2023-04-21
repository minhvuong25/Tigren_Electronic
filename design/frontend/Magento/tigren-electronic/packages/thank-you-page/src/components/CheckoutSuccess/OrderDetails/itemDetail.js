import React from 'react';
import Items from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/items';
import { useOrderRow } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderRow';
import defaultClasses from './itemDetail.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';

const ItemDetails = props => {
    const { items, classes: propClasses } = props;
    const talonProps = useOrderRow({ items });
    const { imagesData, loading } = talonProps;
    const classes = useStyle(defaultClasses, propClasses);

    if (loading) {
        return null;
    }
    return <Items data={{ imagesData, items }} classes={classes} />;
};

export default ItemDetails;
