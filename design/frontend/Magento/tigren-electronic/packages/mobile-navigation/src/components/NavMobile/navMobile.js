import React, { Fragment, useMemo } from 'react';
import cb from 'classnames';
import { Menu, Home, Search, User, ShoppingCart } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { useNavMobile } from '../../talons/useNavMobile';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

import SearchPopup from '../SearchPopup';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './navMobile.module.css';
import { useWindowSize } from '@magento/peregrine';

const NavMobile = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 767;

    const { itemCount } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });
    const itemCountDisplay = itemCount > 9 ? '9+' : itemCount;
    const itemCounter = itemCount ? (
        <span className={classes.counter}>{itemCountDisplay}</span>
    ) : null;

    const {
        isSignedIn,
        selectedNav,
        goToHomePage,
        openLogin,
        goToCartPage,
        openMenu,
        goToMyAccount,
        handleSearchTriggerClick,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useNavMobile({
        isMobile
    });

    const child = useMemo(() => {
        return (
            <div className={classes.root}>
                <button
                    className={cb(classes.home, {
                        [classes.active]: selectedNav === 'home'
                    })}
                    priority="high"
                    onClick={goToHomePage}
                >
                    <Icon size={20} src={Home} />
                </button>
                <button
                    className={cb(classes.search, {
                        [classes.active]: selectedNav === 'search'
                    })}
                    priority="high"
                    onClick={handleSearchTriggerClick}
                    ref={searchTriggerRef}
                >
                    <Icon size={20} src={Search} />
                </button>
                <button
                    className={cb(classes.category, {
                        [classes.active]: selectedNav === 'category'
                    })}
                    priority="high"
                    onClick={openMenu}
                >
                    <Icon size={20} src={Menu} />
                </button>
                <button
                    className={cb(classes.cart, {
                        [classes.active]: selectedNav === 'cart'
                    })}
                    priority="high"
                    onClick={goToCartPage}
                >
                    <span className={classes.count}>
                        <Icon size={20} src={ShoppingCart} />
                        {itemCounter}
                    </span>
                </button>
                <button
                    className={cb(classes.account, {
                        [classes.active]: selectedNav === 'customer'
                    })}
                    priority="high"
                    onClick={() => {
                        if (isSignedIn) {
                            goToMyAccount();
                        } else {
                            openLogin();
                        }
                    }}
                >
                    <Icon size={20} src={User} />
                </button>
            </div>
        );
    }, [
        selectedNav,
        itemCounter,
        isSignedIn,
        openLogin,
        goToHomePage,
        goToCartPage,
        goToMyAccount,
        searchTriggerRef,
        handleSearchTriggerClick
    ]);

    if (!isMobile) {
        return null;
    }

    return (
        <Fragment>
            {child}
            <SearchPopup isSearchOpen={isSearchOpen} searchRef={searchRef} />
        </Fragment>
    );
};

export default NavMobile;
