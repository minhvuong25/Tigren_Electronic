import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';
import SearchTrigger from '@tigrensolutions/core/src/components/Header/searchTrigger';
import CartTrigger from '@tigrensolutions/core/src/components/Header/cartTrigger';
import NavTrigger from '@tigrensolutions/core/src/components/Header/navTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import AccountTrigger from '@tigrensolutions/core/src/components/Header/accountTrigger';
import Logo from '@tigrensolutions/base/src/components/Logo';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';

import defaultClasses from './header.module.css';

const MegaMenu = React.lazy(() =>
    import('@magento/venia-ui/lib/components/MegaMenu')
);

const SearchBar = React.lazy(() =>
    import('@tigrensolutions/core/src/components/SearchBar')
);

// check if bot or headless chrome, the website won't get cart to avoid perf accretion
const isBotOrHeadless = window.isBotOrHeadless === true;

const Header = props => {
    const { beforeHtml, afterHtml, afterHeaderTopHtml } = props;
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchTriggerRef,
        searchRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);

    const { isMobile, isPhablet } = useWindowSize();

    const rootClass = isSearchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <div className={classes.messagePromo}>
                <CmsBlockGroup
                    identifiers={'pbh-header-promo'}
                    dynamicJS={true}
                    disableLazyLoad={true}
                />
            </div>
            {!isMobile && (
                <div className={classes.switchersContainer}>
                    <div className={classes.switchers}>
                        <div className={classes.headerLink}>
                            <CmsBlockGroup
                                identifiers={`pbh-header-link`}
                                dynamicJS={true}
                                disableLazyLoad={true}
                            />
                        </div>
                        <div className={classes.switchActions}>
                            <div className={classes.current}>
                                <CurrencySwitcher />
                            </div>
                            <StoreSwitcher />
                        </div>
                    </div>
                </div>
            )}

            {beforeHtml}
            <header className={rootClass}>
                {afterHeaderTopHtml}
                <div className={`${classes.toolbar} ${classes.toolbarMobile}`}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                        <Link
                            to={resourceUrl('/')}
                            className={classes.logoLink}
                        >
                            <Logo
                                height={26}
                                width={118}
                                classes={{ logo: classes.logo }}
                            />
                        </Link>
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <div className={classes.actions}>
                        {isMobile || isPhablet ? (
                            <div className={classes.searchBar}>
                                <SearchTrigger
                                    onClick={handleSearchTriggerClick}
                                    searchTriggerRef={searchTriggerRef}
                                    isSearchOpen={isSearchOpen}
                                    searchBarFallback={searchBarFallback}
                                    searchRef={searchRef}
                                />
                            </div>
                        ) : (
                            <div className={classes.searchBar}>
                                <Suspense fallback={null}>
                                    <SearchBar isOpen={true} ref={searchRef} />
                                </Suspense>
                            </div>
                        )}
                        <div className={classes.accountActions}>
                            <AccountTrigger />
                        </div>
                        <div className={classes.secondaryActions}>
                            {!isBotOrHeadless && (
                                <CartTrigger isShowMiniCart={true} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.headerBottom}>
                    <div className={classes.content}>
                        <div className={classes.menuBar}>
                            <Suspense fallback={null}>
                                <MegaMenu
                                    menuType="horizontal"
                                    menuKey="main-menu"
                                />
                            </Suspense>
                        </div>
                        <div className={classes.messagePromo}>
                            <CmsBlockGroup
                                identifiers={'pbh-header-promo'}
                                dynamicJS={true}
                                disableLazyLoad={true}
                            />
                        </div>
                    </div>
                </div>
                <PageLoadingIndicator absolute />
            </header>
            {afterHtml}
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
