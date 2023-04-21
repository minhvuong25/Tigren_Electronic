module.exports = targetables => {
    const productSortComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductSort/productSort.js'
    );
    productSortComponent.addImport(
        `extendClasses from 'src/components/ProductSort/productSort.module.css'`
    );
    productSortComponent.addImport(
        `SortModal from 'src/components/ProductSort/sortModal.js';`
    );
    productSortComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<FormattedMessage
                            id={'productSort.sortByButton'}
                            defaultMessage={'Sort by'}
                        />`,
            ``,
            {
                remove: 159
            }
        )
        .insertBeforeSource(
            `<Button`,
            `<span className={classes.desktopText}>
                    <span className={classes.sortbyText}>
                        <FormattedMessage
                            id={'productSort.sortByButton'}
                            defaultMessage={'Sort by'}
                        />
                    </span>
                </span>`
        );
};
