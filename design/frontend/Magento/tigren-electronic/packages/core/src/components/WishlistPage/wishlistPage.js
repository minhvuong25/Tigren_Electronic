import React, { Fragment, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useWishlistPage } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistPage';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Wishlist from './wishlist';
import defaultClasses from './wishlistPage.module.css';
import { GalleryShimmer } from '../Gallery';

const GALLERY_ITEMS_COUNT = 8;

const WishlistPage = props => {
    const talonProps = useWishlistPage();
    const {
        errors,
        loading,
        shouldRenderVisibilityToggle,
        wishlists
    } = talonProps;
    const { formatMessage } = useIntl();
    const error = errors.get('getCustomerWishlistQuery');

    const classes = useStyle(defaultClasses, props.classes);
    const WISHLIST_DISABLED_MESSAGE = formatMessage({
        id: 'wishlistPage.wishlistDisabledMessage',
        defaultMessage: 'The wishlist is not currently available.'
    });
    const wishlistElements = useMemo(() => {
        if (wishlists.length === 0) {
            return <Wishlist />;
        }

        return wishlists.map((wishlist, index) => (
            <Wishlist
                key={wishlist.id}
                isCollapsed={index !== 0}
                data={wishlist}
                shouldRenderVisibilityToggle={shouldRenderVisibilityToggle}
            />
        ));
    }, [shouldRenderVisibilityToggle, wishlists]);

    if (loading && !error) {
        return (
            <Fragment>
                <h1 className={classes.heading}>
                    <FormattedMessage
                        values={{ count: wishlists.length }}
                        id={'wishlistPage.headingText'}
                        defaultMessage={'My Wish List'}
                    />
                </h1>
                <div className={classes.skeleton}>
                    <GalleryShimmer
                        items={new Array(GALLERY_ITEMS_COUNT).fill(null)}
                    />
                </div>
            </Fragment>
        );
    }

    let content;
    if (error) {
        const derivedErrorMessage = deriveErrorMessage([error]);
        const errorElement =
            derivedErrorMessage === WISHLIST_DISABLED_MESSAGE ? (
                <p>
                    <FormattedMessage
                        id={'wishlistPage.disabledMessage'}
                        defaultMessage={
                            'Sorry, this feature has been disabled.'
                        }
                    />
                </p>
            ) : (
                <p className={classes.fetchError}>
                    <FormattedMessage
                        id={'wishlistPage.fetchErrorMessage'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </p>
            );

        content = <div className={classes.errorContainer}>{errorElement}</div>;
    } else {
        content = <Fragment>{wishlistElements}</Fragment>;
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.heading}>
                <FormattedMessage
                    values={{ count: wishlists.length }}
                    id={'wishlistPage.headingText'}
                    defaultMessage={'My Wish List'}
                />
            </h1>
            {content}
        </div>
    );
};

export default WishlistPage;
