import React, {
    Fragment,
    Suspense,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import { FormattedMessage } from 'react-intl';
import { array, number, shape, string } from 'prop-types';

import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import { useCategoryContent } from '@tigrensolutions/core/src/talons/RootComponents/Category';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import FilterModalOpenButton, {
    FilterModalOpenButtonShimmer
} from '@magento/venia-ui/lib/components/FilterModalOpenButton';
import { FilterSidebarShimmer } from '@magento/venia-ui/lib/components/FilterSidebar';
import Gallery, {
    GalleryShimmer
} from '@tigrensolutions/core/src/components/Gallery';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import ProductSort, {
    ProductSortShimmer
} from '@magento/venia-ui/lib/components/ProductSort';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import SortedByContainer, {
    SortedByContainerShimmer
} from '@magento/venia-ui/lib/components/SortedByContainer';
import defaultClasses from './category.module.css';
import NoProductsFound from './NoProductsFound';
import Image from '@magento/venia-ui/lib/components/Image';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import CurrentFilters from '@magento/venia-ui/lib/components/FilterModal/CurrentFilters';

import ProductListMode from '@tigrensolutions/core/src/components/ProductListMode';

const FilterModal = React.lazy(() =>
    import('@magento/venia-ui/lib/components/FilterModal')
);
const FilterSidebar = React.lazy(() =>
    import('@tigrensolutions/core/src/components/FilterSidebar/filterSidebar')
);

const CategoryContent = props => {
    const {
        categoryId,
        data,
        isLoading,
        pageControl,
        sortProps,
        pageSize
    } = props;
    const [currentSort] = sortProps;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        pageSize
    });

    const {
        categoryName,
        categoryDescription,
        filters,
        items,
        totalCount,
        totalPagesFromData,
        categoryMetaTitle,
        currentPageFromData
    } = talonProps;

    // product list mode
    const [productListMode, setProductListMode] = useState('grid');

    const sidebarRef = useRef(null);
    const classes = useStyle(defaultClasses, {});
    const shouldRenderSidebarContent = useIsInViewport({
        elementRef: sidebarRef
    });

    const shouldShowFilterButtons = filters && filters.length;
    const shouldShowFilterShimmer = filters === null;

    // Filter
    const [currentFilterProps, setCurrentFilterProps] = useState({});
    const handleCallbackCurrentFilterProps = useCallback(values => {
        setCurrentFilterProps(values);
    }, []);

    // If there are no products we can hide the sort button.
    const shouldShowSortButtons = totalPagesFromData;
    const shouldShowSortShimmer = !totalPagesFromData && isLoading;

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
            <React.Fragment>
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
            </React.Fragment>
        );
    }, [currentFilterProps]);

    const maybeFilterButtons = shouldShowFilterButtons ? (
        <FilterModalOpenButton
            filters={filters}
            classes={{
                filterButton: classes.filterButton
            }}
        />
    ) : shouldShowFilterShimmer ? (
        <FilterModalOpenButtonShimmer
            classes={{
                filterButtonShimmer: classes.filterButtonShimmer
            }}
        />
    ) : null;

    const filtersModal = shouldShowFilterButtons ? (
        <FilterModal
            filters={filters}
            onCallbackCurrentFilterProps={handleCallbackCurrentFilterProps}
        />
    ) : null;

    const sidebar = shouldShowFilterButtons ? (
        <FilterSidebar
            filters={filters}
            onCallbackCurrentFilterProps={handleCallbackCurrentFilterProps}
        />
    ) : shouldShowFilterShimmer ? (
        <FilterSidebarShimmer />
    ) : null;

    const categoryImage =
        data?.categories?.items &&
        data?.categories?.items[0] &&
        data.categories.items[0].image !== 'false'
            ? data.categories.items[0].image
            : null;

    const maybeSortButton = shouldShowSortButtons ? (
        <ProductSort sortProps={sortProps} />
    ) : shouldShowSortShimmer ? (
        <ProductSortShimmer
            classes={{
                root: classes.productSortShimmer
            }}
        />
    ) : null;

    const productListModeContent = shouldShowSortButtons ? (
        <ProductListMode
            productListMode={productListMode}
            setProductListMode={setProductListMode}
        />
    ) : shouldShowSortShimmer ? (
        <Shimmer
            width={'100px'}
            height={'36px'}
            classes={{ root_button: classes.modeButtonShimmer }}
            type={'button'}
        />
    ) : null;

    const maybeSortContainer = shouldShowSortButtons ? (
        <SortedByContainer currentSort={currentSort} />
    ) : shouldShowSortShimmer ? (
        <SortedByContainerShimmer />
    ) : null;

    const endIndex =
        currentPageFromData * pageSize - (pageSize - (items && items.length));
    const startIndex =
        currentPageFromData === 1 ? 1 : pageSize * (currentPageFromData - 1);

    const categoryResultsHeading =
        totalCount > 0 ? (
            <FormattedMessage
                id={'categoryContent.resultHeading'}
                values={{
                    count: totalCount,
                    startIndex: startIndex,
                    endIndex: endIndex
                }}
                defaultMessage={
                    '{startIndex} - {endIndex} entries / {count} entries'
                }
            />
        ) : isLoading ? (
            <Shimmer width={5} />
        ) : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription} />
    ) : null;

    const content = useMemo(() => {
        if (!totalPagesFromData && !isLoading) {
            return <NoProductsFound categoryId={categoryId} />;
        }

        const gallery = totalPagesFromData ? (
            <Gallery
                items={items}
                isCategoryPage={true}
                productListMode={productListMode}
            />
        ) : (
            <GalleryShimmer
                items={items}
                isCategoryPage={true}
                productListMode={productListMode}
            />
        );

        const pagination = totalPagesFromData ? (
            <Pagination pageControl={pageControl} />
        ) : null;

        return (
            <Fragment>
                <section className={classes.gallery}>{gallery}</section>
                <div className={classes.pagination}>{pagination}</div>
            </Fragment>
        );
    }, [
        categoryId,
        classes.gallery,
        classes.pagination,
        isLoading,
        items,
        pageControl,
        totalPagesFromData,
        productListMode
    ]);

    const shouldHideFilter =
        !totalPagesFromData && !isLoading && filters && filters.length === 0;

    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId} />
            <StoreTitle>{categoryMetaTitle}</StoreTitle>

            <article className={classes.root}>
                <div className={classes.categoryHeader}>
                    <div className={classes.banner}>
                        {categoryImage ? (
                            <Image
                                src={categoryImage}
                                alt={categoryName}
                                className={classes.image}
                                height={'190px'}
                            />
                        ) : null}
                        <h2 className={classes.name}>{categoryName}</h2>
                    </div>
                    {categoryDescriptionElement}
                </div>

                {currentFilter && (
                    <div className={classes.currentFilterContainer}>
                        {currentFilter}
                    </div>
                )}

                <div
                    className={`${classes.contentWrapper} ${
                        shouldHideFilter ? classes.hideFilter : ''
                    }`}
                >
                    <div ref={sidebarRef} className={classes.sidebar}>
                        <Suspense fallback={null}>
                            {shouldRenderSidebarContent ? sidebar : null}
                        </Suspense>
                    </div>
                    <div className={classes.categoryContent}>
                        <div className={classes.heading}>
                            <div className={classes.categoryInfo}>
                                {categoryResultsHeading}
                            </div>
                            <div className={classes.headerButtons}>
                                {productListModeContent}
                                {maybeFilterButtons}
                                {maybeSortButton}
                            </div>
                            {maybeSortContainer}
                        </div>
                        {content}
                        <Suspense fallback={null}>{filtersModal}</Suspense>
                    </div>
                </div>
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        gallery: string,
        pagination: string,
        root: string,
        categoryHeader: string,
        title: string,
        categoryTitle: string,
        sidebar: string,
        categoryContent: string,
        heading: string,
        categoryInfo: string,
        headerButtons: string
    }), // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array,
    pageSize: number
};
