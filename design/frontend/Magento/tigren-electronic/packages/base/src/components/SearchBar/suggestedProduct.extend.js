module.exports = (targetables, targetablePath) => {
    const suggestedProductComponent = targetables.reactComponent(
        targetablePath
    );

    suggestedProductComponent.addImport(
        `AddToCartbutton from '@magento/venia-ui/lib/components/Gallery/addToCartButton.js';`
    );

    suggestedProductComponent
        .insertBeforeSource(
            `<Link`,
            `
        <div className={classes.item}>
        `
        )
        .insertAfterSource(
            `</Link>`,
            `
    <AddToCartbutton item={props} urlSuffix={url_suffix} />
</div>`
        );
};
