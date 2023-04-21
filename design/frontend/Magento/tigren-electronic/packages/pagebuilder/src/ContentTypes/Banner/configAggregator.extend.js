module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderImageConfig = targetables.reactComponent(
        targetablePath
    );
    magentoPageBuilderImageConfig.addImport(
        `isOutdated from '@tigrensolutions/pagebuilder/src/util/isOutdated'`
    );
    magentoPageBuilderImageConfig.insertAfterSource(
        `...getMediaQueries(minHeightPaddingElement)`,
        `,
        isOutdated: isOutdated(node.getAttribute('active_from'), node.getAttribute('active_to'))`
    );
};
