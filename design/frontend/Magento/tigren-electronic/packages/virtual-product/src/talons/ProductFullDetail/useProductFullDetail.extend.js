module.exports = (targetables, targetablePath) => {
    const useProductFullDetail = targetables.reactComponent(
        `@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js`
    );

    useProductFullDetail.addImport(
        `ADD_VIRTUAL_MUTATION from '@tigrensolutions/virtual-product/src/talons/addVirtualProductToCart.gql.js';`
    );
    useProductFullDetail
        .insertAfterSource(
            ` const {
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation,`,
            `
        addVirtualProductToCartMutation,
        `
        )
        .insertBeforeSource(
            `const [
        addSimpleProductToCart`,
            `

    const [
        addVirtualProductToCart,
        { error: errorAddingVirtualProduct, loading: isAddVirtualLoading }
    ] = useMutation(
        addVirtualProductToCartMutation ||
            ADD_VIRTUAL_MUTATION.addVirtualProductToCartMutation
    );

    `
        )
        .insertAfterSource(
            `(isSupportedProductType`,
            ` || productType === 'VirtualProduct'`
        )
        .insertBeforeSource(
            `} else {
                    console.error(`,
            ` else if (productType === 'VirtualProduct') {
                        try {
                            await addVirtualProductToCart({
                                variables
                            });
                            showSuccessMessage();
                        } catch {
                            return;
                        }
                    }
                `
        )
        .insertAfterSource(
            `deriveErrorMessage([`,
            `
                errorAddingVirtualProduct,
                `
        )
        .insertAfterSource(
            ` errorAddingConfigurableProduct,
            errorAddingProductToCart,
            errorAddingSimpleProduct`,
            `,
            errorAddingVirtualProduct
        `
        )
        .insertAfterSource(
            `isAddSimpleLoading ||`,
            `
            isAddVirtualLoading ||
            `
        );
};
