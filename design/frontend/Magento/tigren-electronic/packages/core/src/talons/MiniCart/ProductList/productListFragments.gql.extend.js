module.exports = (targetables, targetablesPath) => {
    const miniCartProductFragments = targetables.reactComponent(
        targetablesPath
    );

    miniCartProductFragments
        .insertAfterSource(
            `product {`,
            `
            url_rewrites {
                url
            }`
        )
        .insertAfterSource(
            'items {',
            `
            id
            messages {
                code: type
                message: text
            }
            `
        );
};
