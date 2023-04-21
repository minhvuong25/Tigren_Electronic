module.exports = targetables => {
    const searchPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchPage/searchPage.js'
    );
    searchPageComponent.addImport(
        `extendClasses from 'src/components/SearchPage/searchPage.module.css'`
    );
    searchPageComponent.addImport(
        `ProductListMode from '@tigrensolutions/core/src/components/ProductListMode';`
    );
    searchPageComponent.addImport(`{ Link } from 'react-router-dom';`);
    searchPageComponent.addImport(`{useWindowSize} from '@magento/peregrine';`);
    searchPageComponent.addImport(
        `SortModalOpenButton from 'src/components/ProductSort/sortModalOpenButton.js';`
    );
    searchPageComponent.addImport(
        `SortModal from 'src/components/ProductSort/sortModal.js';`
    );
    searchPageComponent.addImport(
        `SearchBar from '@tigrensolutions/core/src/components/SearchBar';`
    );
    searchPageComponent
        .insertBeforeSource(`, props.classes`, ',extendClasses')
        .insertBeforeSource(
            `const [currentSort] = sortProps;`,
            `
            const [productListMode, setProductListMode] = useState('grid');`
        )
        .insertAfterSource(
            ` const { formatMessage } = useIntl();`,
            `
            const { isMobile ,isPhablet } = useWindowSize();
            `
        )
        .insertBeforeSource(
            `const maybeSortContainer = shouldShowSortButtons`,
            `const productListModeContent = shouldShowSortButtons ? (
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
    ) : null;`
        )
        .insertAfterSource(
            `items={data.products.items}`,
            `
        productListMode={productListMode}`
        )
        .insertAfterSource(
            `items={Array.from({ length: 12 }).fill(null)}`,
            `
        productListMode={productListMode}`
        )
        .insertAfterSource(
            `isNotFoundProduct,`,
            `
        productListMode,`
        )
        .insertBeforeSource(
            `{maybeFilterButtons}`,
            `
        {maybeSortButton}
        `
        )
        .insertAfterSource(`{maybeFilterButtons}`, ``, { remove: 46 })
        .insertAfterSource(
            `const shouldShowSortShimmer = !productsCount && loading;`,
            `    
         const SortModalButton = shouldShowSortButtons ? <SortModalOpenButton sortProps={sortProps} /> : null;
         const sortModal = shouldShowSortButtons ? <SortModal sortProps={sortProps} /> : null;
         `
        )
        .insertBeforeSource(
            `{maybeFilterButtons}`,
            `
            {SortModalButton}
            {sortModal}
           `
        )
        .insertAfterSource(
            `{maybeFilterButtons}`,
            `
            {productListModeContent}

           `
        )
        .insertAfterSource(
            `<div className={classes.heading}>`,
            `
        <Link className={classes.navigate} to="/">
            </Link>
        <div className={classes.page}>
                {formatMessage(
                    {
                        id: 'searchPage.searchPage',
                        defaultMessage: 'Search'
                    }
                )}
        </div>`
        )
        .insertBeforeSource(
            `<div className={classes.searchInfo}>`,
            `
            { isMobile || isPhablet ? ( <SearchBar isOpen={true} isSearchPage={true} /> ) : ""} `
        );
};
