module.exports = targetables => {
    const CategoryContentComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/RootComponents/Category/categoryContent.js'
    );

    CategoryContentComponent.addImport(
        `extendClasses from 'src/RootComponents/Category/category.module.css'`
    );
    CategoryContentComponent.addImport(
        `SortModalOpenButton from 'src/components/ProductSort/sortModalOpenButton.js';`
    );
    CategoryContentComponent.addImport(
        `SortModal from 'src/components/ProductSort/sortModal.js';`
    );
    CategoryContentComponent.insertAfterSource(
        `defaultClasses, {}`,
        ', extendClasses'
    );
    CategoryContentComponent.insertBeforeSource(`{maybeSortButton}`, ``, {
        remove: 17
    })
    .insertBeforeSource(
        `const maybeSortButton = shouldShowSortButtons ? (`,
        `
         const SortModalButton = <SortModalOpenButton sortProps={sortProps} />
         const sortModal = <SortModal sortProps={sortProps} />
         `
    )
    .insertBeforeSource(`categoryResultsHeading}`, `maybeSortButton`, {
        remove: 22
    }).removeJSX('div className={classes.categoryHeader}')
    .insertBeforeSource(
        `<div className={classes.heading}>`,
        `<div className={classes.categoryHeaderContainer}>
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
                )}`
    )
    .insertAfterSource(
        `{maybeSortButton}`,
        `
                {SortModalButton}
                {sortModal}`
    );
};
