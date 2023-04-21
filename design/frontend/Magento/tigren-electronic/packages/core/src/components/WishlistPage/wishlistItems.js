import React, { Fragment, useMemo } from 'react';
import { useWishlistItems } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItems';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './wishlistItems.module.css';
import WishlistItem from './wishlistItem';

const WishlistItems = props => {
    const { items, wishlistId, refreshWishlist } = props;

    const talonProps = useWishlistItems();
    const { handleOpenAddToCartDialog } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const itemElements = useMemo(() => {
        return items.map(item => {
            return (
                <WishlistItem
                    key={item.id}
                    item={item}
                    refreshWishlist={refreshWishlist}
                    onOpenAddToCartDialog={handleOpenAddToCartDialog}
                    wishlistId={wishlistId}
                />
            );
        });
    }, [handleOpenAddToCartDialog, items, wishlistId]);

    return (
        <Fragment>
            <div className={classes.root}>{itemElements}</div>
        </Fragment>
    );
};

export default WishlistItems;
