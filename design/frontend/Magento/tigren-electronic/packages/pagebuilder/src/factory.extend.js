module.exports = (targetables, targetablePath) => {
    const pageBuilderFactory = targetables.reactComponent(targetablePath);
    pageBuilderFactory.addImport(
        `isOutdated from '@tigrensolutions/pagebuilder/src/util/isOutdated'`
    );
    pageBuilderFactory.insertBeforeSource(
        `const contentTypeConfig =`,
        `const { isOutdated } = props;
    if (isOutdated) {
        return null;
    }

    `
    );
};
