module.exports = targetables => {
    const filterModalComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/FilterModal/filterModal.js'
    );
    filterModalComponent.addImport(
        `extendClasses from 'src/components/FilterModal/filterModal.module.css'`
    );
    filterModalComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
