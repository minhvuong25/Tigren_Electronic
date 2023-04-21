module.exports = targetables => {
    const searchBar = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchBar/searchBar.js'
    );
    searchBar.addImport(
        'extendClasses from "src/components/SearchBar/searchBar.module.css"'
    );
    searchBar
        .insertBeforeSource(`, props.classes`, ',extendClasses')
        .insertBeforeSource('} = props', ',isSearchPage')
        .insertBeforeSource(
            'classes.container',
            'isSearchPage ? classes.searchPageBar :'
        );
    const searchBarVenia = targetables.reactComponent(
        '@magento/venia-ui/lib/components/SearchBar/searchBar.js'
    );
    searchBarVenia.addImport(
        `PopularSearchTerm from 'src/components/SearchBar/popularSearchTerm.js';`
    );

    searchBarVenia.insertAfterSource(
        `</Form>
            </div>`,
        `<PopularSearchTerm />`
    );
    const searchField = targetables.reactComponent(
        '@magento/venia-ui/lib/components/SearchBar/searchField.js'
    );
    searchField.addImport(`{ useIntl } from 'react-intl';`);
    searchField
        .insertBeforeSource(
            `const resetButton = value ? (`,
            `
            const { formatMessage } = useIntl();
            `
        )
        .insertAfterSource(
            `<TextInput`,
            `
            placeholder={formatMessage({
                id: 'searchField.placeholderSearchBar',
                defaultMessage:
                    'What are you looking for ?'
            })}
                                    `
        );
};
