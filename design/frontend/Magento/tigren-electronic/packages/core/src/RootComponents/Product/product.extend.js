module.exports = targetables => {
    const productComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/Product/product.js'
    );
    productComponent.insertBeforeSource(` } = props;`, `, url_key`);
    productComponent.insertAfterSource(
        `useProduct({`,
        `
        url_key,`
    );
    productComponent.insertBeforeSource(
        `{product.name}`,
        `{product.meta_title}`,
        { remove: 14 }
    );
};
