module.exports = (targetables, targetablePath) => {
    const wishListPageQuery = targetables.reactComponent(targetablePath);

    wishListPageQuery.insertAfterSource(
        `name`,
        `
            url_key
            `
    );

    wishListPageQuery.insertAfterSource(
        `product {`,
        `
                url_suffix
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
    );
};
