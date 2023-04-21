module.exports = targetables => {
    const quantityComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity.js'
    );
    quantityComponent.addImport(
        `extendClasses from 'src/components/ProductFullDetail/quantity.module.css'`
    );
    quantityComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendClasses`
    );
};
