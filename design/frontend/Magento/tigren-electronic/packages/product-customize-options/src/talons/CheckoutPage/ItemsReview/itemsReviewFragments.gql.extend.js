module.exports = (targetables, targetablePath) => {
    const checkoutReviewItemFragment = targetables.reactComponent(
        targetablePath
    );

    checkoutReviewItemFragment.insertAfterSource(
        `items {`,
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
    checkoutReviewItemFragment.insertAfterSource(
        `... on ConfigurableCartItem {`,
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
