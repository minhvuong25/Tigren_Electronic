module.exports = (targetables, targetablePath) => {
    const billingAddress = targetables.reactComponent(targetablePath);

    billingAddress.insertAfterSource(
        `query getSelectedShippingAddress($cartId: String!) {
        cart(cart_id: $cartId) {`,
        `
            is_virtual
            items {
                uid
                product {
                    uid
                    name
                    sku
                    __typename
                }
                quantity
            }

            `
    );
};
