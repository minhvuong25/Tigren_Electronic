module.exports = targetables => {
    const usePriceSummary = targetables.reactComponent(
        '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary.js'
    );

    usePriceSummary.wrapWithFile(
        'usePriceSummary',
        'src/talons/CartPage/PriceSummary/wrapUsePriceSummary.js'
    );
    const usePriceSummaryCore = targetables.reactComponent(
        '@tigrensolutions/core/src/talons/CartPage/PriceSummary/usePriceSummary'
    );

    usePriceSummaryCore.wrapWithFile(
        'usePriceSummary',
        'src/talons/CartPage/PriceSummary/wrapUsePriceSummary.js'
    );
};
