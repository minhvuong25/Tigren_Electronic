module.exports = targetables => {
    const paginationComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Pagination/pagination.js'
    );
    paginationComponent.addImport(
        `extendClasses from 'src/components/Pagination/pagination.module.css'`
    );
    paginationComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
