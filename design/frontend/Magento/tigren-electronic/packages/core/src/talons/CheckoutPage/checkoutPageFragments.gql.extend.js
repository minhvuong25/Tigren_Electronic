module.exports = (targetables, targetablePath) => {
    const checkoutPageFragment = targetables.reactComponent(targetablePath);

    checkoutPageFragment.insertAfterSource(
        `fragment CheckoutPageFragment on Cart {`,
        `
        messages {
            code: type
            message: text
        }`
    );
};
