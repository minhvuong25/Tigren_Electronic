module.exports = (targetables, targetablesPath) => {
    const checkoutPageFragments = targetables.reactComponent(targetablesPath);

    checkoutPageFragments.insertAfterSource(
        `available_payment_methods {
            code
        }`,
        `
        is_virtual`
    );
};
