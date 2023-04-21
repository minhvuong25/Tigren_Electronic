module.exports = targetables => {
    const cmsBlock = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CmsBlock/cmsBlock.js'
    );

    cmsBlock.setJSXProps('BlockChild', {
        disableLazyLoad: '{props.disableLazyLoad}'
    });
};
