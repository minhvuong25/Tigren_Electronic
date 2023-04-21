module.exports = (targetables, targetablePath) => {
    const useProductTalon = targetables.reactComponent(
        `@magento/peregrine/lib/talons/RootComponents/Product/useProduct.js`
    );
    useProductTalon.insertBeforeSource(` } = props;`, `, url_key`);
    useProductTalon.insertAfterSource(
        `const urlKey = `,
        `url_key || (productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug)`,
        {
            remove: 60
        }
    );
};
