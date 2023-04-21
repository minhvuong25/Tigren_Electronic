module.exports = targetables => {
    const tileComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Pagination/tile.js'
    );
    tileComponent.addImport(
        `extendClasses from 'src/components/Pagination/tile.module.css'`
    );
    tileComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
