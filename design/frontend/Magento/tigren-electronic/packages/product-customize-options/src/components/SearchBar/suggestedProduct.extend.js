module.exports = (targetables, targetablePath) => {
    const suggestedProductComponent = targetables.reactComponent(
        targetablePath
    );
    suggestedProductComponent.insertAfterSource(
        `price, url_suffix`,
        `,value, stock_status, options`
    );
};
