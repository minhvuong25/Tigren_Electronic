module.exports = (targetables, targetablePath) => {
    const itemOrderDetails = targetables.reactComponent(targetablePath);

    itemOrderDetails.insertBeforeSource(
        `} = props;`,
        `,
        bundle_options`
    );

    const orderBundleItems = itemOrderDetails.addImport(
        `OrderBundleItems from '@tigrensolutions/bundle-product/src/components/OrderBundleItems'`
    );

    itemOrderDetails.insertAfterSource(
        `<Link to={itemLink}>{product_name}</Link>
            </div>`,
        `<${orderBundleItems} bundleOptions={bundle_options} classes={classes} />`
    );
};
