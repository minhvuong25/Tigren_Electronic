const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    if (isModuleAvailable('@tigrensolutions/core')) {
        const useProductFullDetail = targetables.esModule(
            '@tigrensolutions/core/src/talons/ProductFullDetail/useProductFullDetail.js'
        );

        useProductFullDetail.insertBeforeSource(
            `shortDescription:`,
            `
        typeProduct: product.type_id,
        `
        );

        useProductFullDetail.addImport(
            `ADD_VIRTUAL_MUTATION from '@tigrensolutions/virtual-product/src/talons/addVirtualProductToCart.gql.js';`
        );

        useProductFullDetail.insertBeforeSource(
            `} = props;`,
            `,
        addVirtualProductToCartMutation
        `
        );
        useProductFullDetail.insertBeforeSource(
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
        );

        useProductFullDetail.insertAfterSource(
            `(isSupportedProductType`,
            ` || productType === 'VirtualProduct'`
        );

        useProductFullDetail.insertBeforeSource(
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
        );

        useProductFullDetail.insertAfterSource(
            `deriveErrorMessage([`,
            `
                errorAddingVirtualProduct,
                `
        );

        useProductFullDetail.insertAfterSource(
            `errorAddingConfigurableProduct,
            errorAddingProductToCart,
            errorAddingSimpleProduct`,
            `,
            errorAddingVirtualProduct
        `
        );

        useProductFullDetail.insertAfterSource(
            `isAddSimpleLoading ||`,
            `
            isAddVirtualLoading ||
            `
        );

        const productFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );

        productFullDetailComponent.insertAfterSource(
            `const cartActionContent = isSupportedProductType`,
            ` || product.type_id == 'virtual' `
        );

        //add to cart in Category Page
        const itemGalleryComponent = targetables.reactComponent(
            `@tigrensolutions/core/src/components/Gallery/item.js`
        );
        itemGalleryComponent.insertAfterSource(
            `const addButton = isSupportedProductType`,
            ` || item.__typename == "VirtualProduct" `
        );

        //add to cart in Suggested Product

        const useAddToCartButton = targetables.esModule(
            `@tigrensolutions/core/src/talons/Gallery/useAddToCartButton.js`
        );
        useAddToCartButton
            .insertAfterSource(`const UNSUPPORTED_PRODUCT_TYPES = [`, ``, {
                remove: 20
            })
            .insertAfterSource(
                `productType === 'simple' && !isRequiredOption`,
                ` || productType === 'virtual' &&  !isRequiredOption`
            );
        //add to cart in Wishlist Page
        const wishlistItem = targetables.reactComponent(
            `@tigrensolutions/core/src/components/WishlistPage/wishlistItem.js`
        );

        wishlistItem.insertAfterSource(
            `if (isSupportedProductType`,
            ` || item.product.__typename == 'VirtualProduct'`
        );
    }

    if (isModuleAvailable(`@tigrensolutions/compare`)) {
        const item = targetables.reactComponent(
            `@tigrensolutions/compare/src/components/ComparePage/CompareProduct/item.js`
        );
        item.insertAfterSource(
            `const addButton = isPrint ? null : isSupportedProductType`,
            ` || item.__typename == "VirtualProduct" `
        );
    }

    if (isModuleAvailable(`@tigrensolutions/multistep-checkout`)) {
        const shippingAddressButton = targetables.reactComponent(
            `@tigrensolutions/multistep-checkout/src/components/ShippingAddressButton/shippingAddressButton.js`
        );
        shippingAddressButton
            .insertBeforeSource(
                `} = props`,
                `,
        isVirtual
    `
            )
            .insertAfterSource(`if (shippingInformationData`, ` || isVirtual`)
            .insertAfterSource(
                `shippingInformationData !== {}`,
                ` || isVirtual`
            );

        const ShippingMethodButton = targetables.reactComponent(
            `@tigrensolutions/multistep-checkout/src/components/ShippingMethodButton/shippingMethodButton.js`
        );
        ShippingMethodButton.insertBeforeSource(
            `} = props`,
            `,
        isVirtual
    `
        )
            .insertAfterSource(`if (shippingMethodData`, ` || isVirtual`)
            .insertAfterSource(`shippingMethodData !== {}`, ` || isVirtual`);
    }
};
