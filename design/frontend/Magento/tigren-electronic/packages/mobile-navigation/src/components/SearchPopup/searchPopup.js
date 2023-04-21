import React, { Suspense } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import defaultClasses from './searchPopup.module.css';
import { Route } from 'react-router-dom';
import { useIntl } from 'react-intl';

const SearchBar = React.lazy(() =>
    import('@magento/venia-ui/lib/components/SearchBar')
);

const SearchPopup = props => {
    const { classes: propClasses, isSearchOpen, searchRef } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const { formatMessage } = useIntl();

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;
    return (
        <Dialog
            isOpen={isSearchOpen}
            shouldShowButtons={false}
            classes={{
                dialog: classes.rootDialog,
                headerText: classes.headerText,
                contents: classes.contents
            }}
            title={formatMessage({
                id: 'searchTrigger.search',
                defaultMessage: 'Search'
            })}
            disableForm={true}
        >
            <div className={classes.content_search}>{searchBar}</div>
        </Dialog>
    );
};

export default SearchPopup;
