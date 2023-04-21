module.exports = (targetables, targetablesPath) => {
    const productListFragments = targetables.reactComponent(targetablesPath);

    productListFragments.insertAfterSource(
        `items {`,
        `... on VirtualCartItem {
                simple_customizable: customizable_options {
                    label
                    values {
                        label
                        value
                    }
                }
            }`
    );
};
