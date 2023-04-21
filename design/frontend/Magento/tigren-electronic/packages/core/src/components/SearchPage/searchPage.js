import React, {
    Fragment,
    Suspense,
    useCallback,
    useMemo,
    useState
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useSearchPage } from '@magento/peregrine/lib/talons/SearchPage/useSearchPage';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import Gallery, {
    GalleryShimmer
} from '@tigrensolutions/core/src/components/Gallery';
import ProductSort, {
    ProductSortShimmer
} from '@magento/venia-ui/lib/components/ProductSort';
import defaultClasses from './searchPage.module.css';
import SortedByContainer, {
    SortedByContainerShimmer
} from '@magento/venia-ui/lib/components/SortedByContainer';
import FilterModalOpenButton, {
    FilterModalOpenButtonShimmer
} from '@magento/venia-ui/lib/components/FilterModalOpenButton';
import { FilterSidebarShimmer } from '@magento/venia-ui/lib/components/FilterSidebar';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { Meta, Title } from '@magento/venia-ui/lib/components/Head';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import CurrentFilters from '@magento/venia-ui/lib/components/FilterModal/CurrentFilters';
import NoProductsFound from './NoProductsFound';

const FilterModal = React.lazy(() =>
    import('@magento/venia-ui/lib/components/FilterModal')
);
const FilterSidebar = React.lazy(() =>
    import('@tigrensolutions/core/src/components/FilterSidebar/filterSidebar')
);
const SearchPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useSearchPage();
    const {
        data,
        error,
        filters,
        loading,
        pageControl,
        searchCategory,
        searchTerm,
        sortProps
    } = talonProps;

    const { formatMessage } = useIntl();
    const [currentSort] = sortProps;

    const productsCount =
        data && data.products && data.products.total_count
            ? data.products.total_count
            : 0;

    const isNotFoundProduct = !loading && productsCount === 0;

    const content = useMemo(() => {
        if (!data && loading) {
            return (
                <Fragment>
                    <section className={classes.gallery}>
                        <GalleryShimmer
                            items={Array.from({ length: 12 }).fill(null)}
                            isCategoryPage={true}
                        />
                    </section>
                    <section className={classes.pagination} />
                </Fragment>
            );
        }

        if (!data && error) {
            return <NoProductsFound term={searchTerm} />;
        }

        if (isNotFoundProduct) {
            return <NoProductsFound searchTerm={searchTerm} />;
        }

        if (!data) {
            return null;
        }

        if (data.products.items.length === 0) {
            return <NoProductsFound iterm={searchTerm} />;
        } else {
            return (
                <Fragment>
                    <section className={classes.gallery}>
                        <Gallery
                            items={data.products.items}
                            isCategoryPage={true}
                        />
                    </section>
                    <section className={classes.pagination}>
                        <Pagination pageControl={pageControl} />
                    </section>
                </Fragment>
            );
        }
    }, [
        classes.noResult,
        classes.pagination,
        error,
        loading,
        isNotFoundProduct,
        data,
        pageControl
    ]);

    const shouldShowFilterButtons = filters && filters.length;
    const shouldShowFilterShimmer = filters === null;

    // Filter
    const [currentFilterProps, setCurrentFilterProps] = useState({});
    const handleCallbackCurrentFilterProps = useCallback(values => {
        setCurrentFilterProps(values);
    }, []);

    // If there are no products we can hide the sort button.
    const shouldShowSortButtons = productsCount;
    const shouldShowSortShimmer = !productsCount && loading;

    const currentFilter = useMemo(() => {
        const {
            handleReset,
            filterApi,
            filterNames,
            filterState,
            handleApply
        } = currentFilterProps;

        if (!filterState || !filterState.size) return null;

        const clearAll = filterState.size ? (
            <div className={classes.action}>
                <LinkButton type="button" onClick={handleReset}>
                    <FormattedMessage
                        id={'filterModal.action'}
                        defaultMessage={'Clear all'}
                    />
                </LinkButton>
            </div>
        ) : null;

        return (
            <>
                <h3>
                    <FormattedMessage
                        id="categoryContent.filterBy"
                        defaultMessage="Filter by"
                    />
                    {': '}
                </h3>
                <CurrentFilters
                    filterApi={filterApi}
                    filterNames={filterNames}
                    filterState={filterState}
                    onRemove={handleApply}
                />
                {clearAll}
            </>
        );
    }, [currentFilterProps]);

    const maybeFilterButtons = shouldShowFilterButtons ? (
        <FilterModalOpenButton filters={filters} />
    ) : shouldShowFilterShimmer ? (
        <FilterModalOpenButtonShimmer />
    ) : null;

    const maybeFilterModal = shouldShowFilterButtons ? (
        <FilterModal
            filters={filters}
            onCallbackCurrentFilterProps={handleCallbackCurrentFilterProps}
        />
    ) : null;

    const maybeSidebar = shouldShowFilterButtons ? (
        <FilterSidebar
            filters={filters}
            onCallbackCurrentFilterProps={handleCallbackCurrentFilterProps}
        />
    ) : shouldShowFilterShimmer ? (
        <FilterSidebarShimmer />
    ) : null;

    const maybeSortButton = shouldShowSortButtons ? (
        <ProductSort sortProps={sortProps} />
    ) : shouldShowSortShimmer ? (
        <ProductSortShimmer />
    ) : null;

    const maybeSortContainer = shouldShowSortButtons ? (
        <SortedByContainer currentSort={currentSort} />
    ) : shouldShowSortShimmer ? (
        <SortedByContainerShimmer />
    ) : null;

    const searchResultsHeading = loading ? (
        <Shimmer width={5} />
    ) : !data ? null : searchTerm ? (
        <>
            <FormattedMessage
                id={'searchPage.searchTermResult'}
                values={{
                    highlight: chunks => (
                        <span className={classes.headingHighlight}>
                            {chunks}
                        </span>
                    ),
                    category: searchCategory,
                    term: searchTerm
                }}
                defaultMessage={
                    'Showing results for: <highlight>{term}</highlight>'
                }
            />
        </>
    ) : (
        <FormattedMessage
            id={'searchPage.searchTermEmpty'}
            defaultMessage={'Showing all results:'}
        />
    );

    const itemCountHeading =
        data && !loading && productsCount > 0 ? (
            <span className={classes.totalPages}>
                {formatMessage(
                    {
                        id: 'searchPage.totalPages',
                        defaultMessage: `items`
                    },
                    { totalCount: productsCount }
                )}
            </span>
        ) : loading ? (
            <Shimmer width={5} />
        ) : null;

    const metaLabel = [`Search results for: `, `'`, searchTerm, `'`]
        .filter(Boolean)
        .join('');

    return (
        <div className={classes.container}>
            {currentFilter && (
                <div className={classes.currentFilterContainer}>
                    {currentFilter}
                </div>
            )}
            <article className={classes.root}>
                <div className={classes.sidebar}>
                    <Suspense fallback={<FilterSidebarShimmer />}>
                        {maybeSidebar}
                    </Suspense>
                </div>

                <div className={classes.searchContent}>
                    <div className={classes.heading}>
                        <div className={classes.searchInfo}>
                            {!isNotFoundProduct && (
                                <>
                                    {searchResultsHeading}
                                    {itemCountHeading}
                                </>
                            )}
                        </div>
                        <div className={classes.headerButtons}>
                            {maybeFilterButtons}
                            {maybeSortButton}
                        </div>
                        {maybeSortContainer}
                    </div>

                    {content}
                    <Suspense fallback={null}>{maybeFilterModal}</Suspense>
                </div>
                <Title>{metaLabel}</Title>
                <Meta name="title" content={metaLabel} />
                <Meta name="description" content={metaLabel} />
            </article>
        </div>
    );
};

export default SearchPage;

SearchPage.propTypes = {
    classes: shape({
        noResult: string,
        root: string,
        totalPages: string
    })
};
