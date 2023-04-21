module.exports = targetables => {
    const noProductsFoundComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchPage/NoProductsFound/noProductsFound.js'
    );
    noProductsFoundComponent.addImport(
        `extendClasses from 'src/components/NoProductsFound/noProductsFound.module.css'`
    );
    noProductsFoundComponent.addImport(
        `noProductFound from 'src/components/NoProductsFound/noProductsFound.png';`
    );
    noProductsFoundComponent.addImport(
        `Button from '@magento/venia-ui/lib/components/Button';`
    );
    noProductsFoundComponent.addImport(`{ Link } from 'react-router-dom';`);
    noProductsFoundComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(`src={noProductsFound}`, `src={noProductFound}`, {
            remove: 21
        })
        .insertBeforeSource(
            `'Search results of <highlight>{searchTerm}</highlight> product not found.'`,
            `'No matching results'`,
            {
                remove: 74
            }
        )
        .insertBeforeSource(
            `const headerText = formatMessage(`,
            `
    const noResultText = formatMessage(
        {
            id: 'searchPageNotFound.noResult',
            defaultMessage:
                'Your search <highlight>{searchTerm}</highlight> did not match any results'
        },
        {
            searchTerm,
            highlight: chunks => <strong>"{chunks}"</strong>
        }
    );`
        )
        .insertBeforeSource(
            `'Please check the spelling of your search again.'`,
            `'Please check the spelling or try again with a less specific term'`,
            { remove: 49 }
        )
        .insertAfterSource(
            `</p>
            </div>`,
            `
        <Button
            priority={'high'}
            type={'button'}
            className={classes.button}
        >
        <Link className={classes.link} to="/">
                    <FormattedMessage
                        id={'global.homePage'}
                        defaultMessage={'HOME PAGE'}
                    />
                </Link>
                </Button>`
        )
        .insertBeforeSource(`<p>`, `<p>{noResultText}</p>`);
};
