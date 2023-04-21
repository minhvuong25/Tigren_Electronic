module.exports = targetables => {
    const editModalComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/editModal.js'
    );
    editModalComponent.addImport(
        `extendClasses from 'src/components/CheckoutPage/ShippingInformation/editModal.module.css'`
    );
    editModalComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
};
