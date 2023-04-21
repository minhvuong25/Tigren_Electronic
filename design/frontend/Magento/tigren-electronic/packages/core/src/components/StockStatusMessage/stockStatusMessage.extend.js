module.exports = (targetables, targetablePath) => {
    const stockStatusMessage = targetables.reactComponent(targetablePath);
    stockStatusMessage.wrapWithFile(
        `@tigrensolutions/core/src/components/StockStatusMessage/wrapStockStatusMessage.js`
    );
};
