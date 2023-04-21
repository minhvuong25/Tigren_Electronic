import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useWishlist } from '@tigrensolutions/core/src/talons/WishlistPage/useWishlist';
import { bool, int, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import WishlistItems from './wishlistItems';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import defaultClasses from './wishlist.module.css';
import { GalleryShimmer } from '../Gallery';
import imgNoList from '@tigrensolutions/core/src/static/images/no-wishlist.png';

/**
 * A single wishlist container.
 *
 * @param {Object} props.data the data for this wishlist
 * @param {boolean} props.shouldRenderVisibilityToggle whether or not to render the visiblity toggle
 * @param {boolean} props.isCollapsed whether or not is the wishlist unfolded
 */

const GALLERY_ITEMS_COUNT = 8;

const Wishlist = props => {
    const { data, isCollapsed } = props;
    const { id, items_count: itemsCount } = data;

    const talonProps = useWishlist({ id, itemsCount, isCollapsed });
    const {
        isOpen,
        items,
        isLoading,
        pageControl,
        totalPagesFromData,
        refreshWishlist
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const contentClass = isOpen ? classes.content : classes.content_hidden;

    const pagination = totalPagesFromData ? (
        <Pagination pageControl={pageControl} />
    ) : null;

    const contentMessageElement = itemsCount ? (
        <Fragment>
            <WishlistItems
                items={items}
                wishlistId={id}
                refreshWishlist={refreshWishlist}
            />
            <div className={classes.pagination}>{pagination}</div>
        </Fragment>
    ) : (
        <div className={classes.wrapNoWishlist}>
            <img
                alt={'no wishlist'}
                className={classes.noWishlist}
                src={imgNoList}
            />
            <p className={classes.emptyListText}>
                <FormattedMessage
                    id={'wishlist.emptyListText'}
                    defaultMessage={'You have no items in your wish list.'}
                />
            </p>
        </div>
    );

    if (isLoading) {
        return (
            <div className={classes.root}>
                <GalleryShimmer
                    items={new Array(GALLERY_ITEMS_COUNT).fill(null)}
                />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={contentClass}>{contentMessageElement}</div>
        </div>
    );
};

Wishlist.propTypes = {
    classes: shape({
        root: string,
        header: string,
        content: string,
        content_hidden: string,
        emptyListText: string,
        name: string,
        nameContainer: string,
        visibilityToggle: string,
        visibilityToggle_hidden: string,
        visibility: string,
        buttonsContainer: string,
        loadMore: string
    }),
    shouldRenderVisibilityToggle: bool,
    isCollapsed: bool,
    data: shape({
        id: int,
        items_count: int,
        name: string,
        visibility: string
    })
};

Wishlist.defaultProps = {
    data: {
        items_count: 0,
        items_v2: []
    }
};

export default Wishlist;
