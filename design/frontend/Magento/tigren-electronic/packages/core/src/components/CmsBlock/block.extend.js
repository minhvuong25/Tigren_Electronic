module.exports = targetables => {
    const block = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CmsBlock/block.js'
    );

    block.insertAfterSource('const Block = ({ content', `, disableLazyLoad`);

    block.setJSXProps('RichContent', {
        disableLazyLoad: '{disableLazyLoad}'
    });
};
