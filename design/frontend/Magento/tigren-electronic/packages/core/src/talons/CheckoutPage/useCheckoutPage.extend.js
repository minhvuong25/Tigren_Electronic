module.exports = (targetables, targetablePath) => {
    const useCheckoutPage = targetables.reactComponent(targetablePath);

    useCheckoutPage.insertAfterSource(
        `return {`,
        `
        cart: checkoutData?.cart,`
    );
};
