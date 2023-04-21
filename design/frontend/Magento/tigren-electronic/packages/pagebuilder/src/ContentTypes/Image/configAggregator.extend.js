module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderImageConfig = targetables.reactComponent(
        targetablePath
    );
    magentoPageBuilderImageConfig.addImport(
        `isOutdated from '@tigrensolutions/pagebuilder/src/util/isOutdated'`
    );
    magentoPageBuilderImageConfig.insertAfterSource(
        `...getMediaQueries(node)`,
        `,
        loading: node.getAttribute('loading'),
        isOutdated: isOutdated(node.getAttribute('active_from'), node.getAttribute('active_to'))`
    );
};
