module.exports = (targetables, targetablePath) => {
    const billingAddress = targetables.reactComponent(targetablePath);

    billingAddress
        .insertAfterSource(
            `shippingAddressCountry,`,
            `
        isVirtual,
        `
        )
        .insertAfterSource(
            `<Checkbox`,
            `
                    disabled={isVirtual}
                    `
        );
};
