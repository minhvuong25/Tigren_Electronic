module.exports = targetables => {
    const filterModalComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/FilterModal/filterFooter.js'
    );
    filterModalComponent.addImport(
        `extendClasses from 'src/components/FilterModal/filterFooter.module.css'`
    );
    filterModalComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertAfterSource(
            `data-cy="FilterFooter-button"`,
            `
                className={classes.button}`
        );
};
