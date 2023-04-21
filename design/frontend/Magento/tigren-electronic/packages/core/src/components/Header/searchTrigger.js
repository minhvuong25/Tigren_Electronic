import React, { Fragment, Suspense, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { Route, useLocation } from 'react-router-dom';
import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';
import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './searchTrigger.module.css';

const SearchBar = React.lazy(() =>
    import('@tigrensolutions/core/src/components/SearchBar')
);

const SearchTrigger = props => {
    const {
        active,
        onClick,
        isSearchOpen,
        searchTriggerRef,
        searchRef,
        layout
    } = props;
    const location = useLocation();

    const talonProps = useSearchTrigger({
        onClick
    });

    const { handleClick } = talonProps;
    const { formatMessage } = useIntl();
    const { isMobile } = useWindowSize();

    const classes = useStyle(defaultClasses, props.classes);

    const searchClass = active ? classes.open : classes.root;
    const searchButtonClass = isSearchOpen ? classes.searchOpen : '';
    const searchMobileClass =
        layout && layout === 'navSearchMobile' ? classes.navSearchMobile : '';

    const searchBar = isSearchOpen ? (
        <Suspense fallback={null}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const searchText = formatMessage({
        id: 'global.search',
        defaultMessage: 'Search'
    });

    // Close dialog when redirect to other page.
    useEffect(() => {
        if (isMobile && isSearchOpen) {
            handleClick();
        }
    }, [location]);

    return (
        <Fragment>
            {searchBar}
            <button
                className={`${searchClass} ${searchMobileClass} ${searchButtonClass}`}
                aria-label={searchText}
                onClick={handleClick}
                ref={searchTriggerRef}
            >
                {searchText}
            </button>
        </Fragment>
    );
};

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;
