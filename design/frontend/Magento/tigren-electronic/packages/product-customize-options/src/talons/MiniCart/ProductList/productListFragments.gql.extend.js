module.exports = (targetables, targetablePath) => {
    const productListFragments = targetables.reactComponent(targetablePath);

    productListFragments.insertAfterSource(
        'items {',
        `
            ... on SimpleCartItem {
                simple_customizable: customizable_options {
                    label
                    values {
                        label
                        value
                    }
                }
            }`
    );

    productListFragments.insertAfterSource(
        `value_label
                }`,
        `
            configurable_customizable: customizable_options {
                id
                label
                values{
                    label
                    value
                }
            }`
    );
};
