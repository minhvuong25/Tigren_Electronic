const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const useBillingAddress = targetables.reactComponent(targetablePath);

    useBillingAddress
        .insertAfterSource(
            `shippingAddressCountry = shippingAddressData
        ? `,
            `shippingAddressData.cart.shippingAddresses.length > 0 &&
        `
        )
        .insertBeforeSource(
            `const isBillingAddressSame`,
            `
    const isVirtual = useMemo(() => {
        const virtual = shippingAddressData?.cart?.items?.filter(item => {
            return item?.product?.__typename !== 'VirtualProduct';
        });
        return virtual?.length === 0;
    });

    `
        )
        .insertAfterSource(
            `const isBillingAddressSame = isBillingAddressSameData`,
            ` || isVirtual`
        )
        .insertBeforeSource(
            `isBillingAddressSameData.cart.isBillingAddressSame`,
            ` isBillingAddressSameData &&
            isBillingAddressSameData.cart &&
            `
        )
        .insertAfterSource(
            `isBillingAddressSameData.cart.isBillingAddressSame`,
            ` && !isVirtual
            ? isBillingAddressSameData.cart.isBillingAddressSame
            : false `
        )
        .insertBeforeSource(
            `initialValues,`,
            `
    isVirtual,
    `
        );

    if (isModuleAvailable(`@tigrensolutions/advanced-checkout`)) {
        useBillingAddress.insertAfterSource(
            `if (isSignedIn`,
            ' && customerAddresses?.length > 0'
        );
    }

    if (isModuleAvailable(`@tigrensolutions/split-cart`)) {
        useBillingAddress.insertAfterSource(
            `item?.product?.__typename !== 'VirtualProduct'`,
            ` && item?.available_to_checkout === 1`
        );
    }
};
