module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderImage = targetables.reactComponent(targetablePath);

    magentoPageBuilderImage.insertAfterSource(
        `import resourceUrl from '@magento/peregrine/lib/util/makeUrl';`,
        `
const availableLoadings = ['eager', 'lazy'];
`
    );
    magentoPageBuilderImage.insertAfterSource(
        `paddingLeft,`,
        `
        loading,`
    );
    magentoPageBuilderImage.insertAfterSource(
        `style={imageStyles}`,
        `
                    loading={
                        availableLoadings.includes(loading) ? loading : 'lazy'
                    }`,
        { remove: 35 }
    );
};
