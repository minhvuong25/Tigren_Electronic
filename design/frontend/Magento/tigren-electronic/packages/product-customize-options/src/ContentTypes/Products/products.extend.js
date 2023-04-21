module.exports = (targetables, targetablePath) => {
    const PageBuilderItemGQL = targetables.reactComponent(
        `@magento/pagebuilder/lib/ContentTypes/Products/products.js`
    );

    PageBuilderItemGQL.insertAfterSource(
        'items {',
        `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
    );
};
