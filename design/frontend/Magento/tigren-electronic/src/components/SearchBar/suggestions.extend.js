module.exports = targetables => {
    const suggestions = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchBar/suggestions.js'
    );
    suggestions.addImport(
        'extendClasses from "src/components/SearchBar/suggestions.module.css"'
    );
    suggestions
        .insertAfterSource(`props.classes`, `, extendClasses`)
        .insertAfterSource(
            `<div className={classes.categories}>`,
            `
            <h2 className={classes.heading}>
                <span>
                    <FormattedMessage
                        id={'Suggestions.result'}
                        defaultMessage={'{count} items'}
                        values={{
                            count: resultCount
                        }}
                    />
                </span>
            </h2>
            `
        )
        .insertBeforeSource(
            `<div className={classes.products}>`,
            `{!isShowCategories && (
                <h2 className={classes.heading}>
                <span>
                    <FormattedMessage
                        id={'Suggestions.result'}
                        defaultMessage={'{count} items'}
                        values={{
                            count: resultCount
                        }}
                    />
                </span>
            </h2>
            )}`
        )
        .insertBeforeSource(
            `<SuggestedProducts`,
            `<h2 className={classes.heading}>
                <span>
                    <FormattedMessage
                        id={'searchBar.heading'}
                        defaultMessage={'Product Suggestions'}
                    />
                </span>
            </h2>`
        )
};
