module.exports = (targetables, targetablePath) => {
    const OrderItemComonent = targetables.reactComponent(targetablePath);

    const customizeOptionsOrderItem = OrderItemComonent.addImport(
        `CustomizeOptionOrderItem from '@tigrensolutions/product-customize-options/src/components/OptionsOrderItems/customizeOptionsItem.js'`
    );

    OrderItemComonent.insertBeforeSource(
        `<ProductOptions`,
        `<${customizeOptionsOrderItem} classes={classes} customizeOptions={props.customize_options}/>
                        `
    );
};
