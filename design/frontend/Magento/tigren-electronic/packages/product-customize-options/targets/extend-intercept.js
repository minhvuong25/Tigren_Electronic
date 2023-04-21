const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

const isCompareModuleAvailable = isModuleAvailable('@tigrensolutions/compare');
const isProductBundleModuleAvailable = isModuleAvailable(
    '@tigrensolutions/bundle-product'
);

const {
    CustomizableProductInterface
} = require('@tigrensolutions/product-customize-options/targets/custom.graphql');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    const productFullDetailGqlCe = targetables.esModule(
        `@magento/peregrine/lib/talons/ProductFullDetail/productFullDetail.gql.ce.js`
    );

    productFullDetailGqlCe.insertBeforeSource(
        `$parentSku: String!`,
        `
        $customizableOptions: [CustomizableOptionInput]
        `
    );

    productFullDetailGqlCe.insertBeforeSource(
        `parent_sku: $parentSku`,
        `
        customizable_options: $customizableOptions
        `
    );

    productFullDetailGqlCe.insertAfterSource(
        `mutation addSimpleProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!`,
        `
        $customizableOptions: [CustomizableOptionInput]
        `
    );

    productFullDetailGqlCe.insertAfterSource(
        `[{ data: { quantity: $quantity, sku: $sku }`,
        `
                        customizable_options: $customizableOptions
                        `
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const useProductFullDetail = targetables.esModule(
            '@tigrensolutions/core/src/talons/ProductFullDetail/useProductFullDetail.js'
        );
        useProductFullDetail.wrapWithFile(
            'useProductFullDetail',
            '@tigrensolutions/product-customize-options/src/talons/ProductFullDetail/wrapUseProductFullDetail.js'
        );
        useProductFullDetail.addImport(
            `{ appendCustomizeOptionsToPayload } from '@tigrensolutions/product-customize-options/src/util/appendCustomizeOptionsToPayload';`
        );
        useProductFullDetail
            .insertAfterSource(
                'const handleAddToCart = useCallback(',
                `
        async (formValues, customizeOptions) => {`,
                { remove: 30 }
            )
            .insertBeforeSource(
                '// Use the proper mutation for the type.',
                `
                    appendCustomizeOptionsToPayload(
                        variables,
                        customizeOptions
                    );
    `
            );

        const productFullDetailGqlCe = targetables.esModule(
            '@tigrensolutions/core/src/talons/ProductFullDetail/productFullDetail.gql.ce.js'
        );
        productFullDetailGqlCe.insertBeforeSource(
            '$parentSku: String!',
            `
        $customizableOptions: [CustomizableOptionInput]
        `
        );
        productFullDetailGqlCe.insertBeforeSource(
            'parent_sku: $parentSku',
            `
        customizable_options: $customizableOptions
        `
        );
        productFullDetailGqlCe.insertAfterSource(
            `mutation addSimpleProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!`,
            `
        $customizableOptions: [CustomizableOptionInput]
        `
        );
        productFullDetailGqlCe.insertAfterSource(
            '[{ data: { quantity: $quantity, sku: $sku }',
            `
                        customizable_options: $customizableOptions
                        `
        );

        const productDetailFragment = targetables.esModule(
            '@tigrensolutions/core/src/talons/RootComponents/Product/productDetailFragment.gql.js'
        );
        productDetailFragment.insertAfterSource(
            `on ProductInterface {`,
            `
        base_price
        special_price`
        );
        productDetailFragment.insertAfterSource(
            'stock_status',
            CustomizableProductInterface
        );

        const productListingFragments = targetables.esModule(
            '@tigrensolutions/core/src/talons/CartPage/ProductListing/productListingFragments.gql.js'
        );
        productListingFragments.addImport(
            `{ ProductOptionsFragments } from '@tigrensolutions/product-customize-options/src/talons/ProductOptionsFragments.gql'`
        );
        productListingFragments
            .insertAfterSource(
                `product {`,
                `
                ...ProductOptionsFragments
                `
            )
            .insertBeforeSource('`;', '${ProductOptionsFragments}');
        productListingFragments.insertAfterSource(
            'items {',
            `
            ... on SimpleCartItem {
                simple_customizable: customizable_options {
                    label
                    values {
                        label
                        value
                    }
                }
            }
            ... on VirtualCartItem {
                simple_customizable: customizable_options {
                    label
                    values {
                        label
                        value
                    }
                }
            }
            `
        );
        productListingFragments.insertAfterSource(
            `value_label
                }`,
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

        const productFullDetail = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );
        productFullDetail.addImport(
            `mergeOperations from '@magento/peregrine/lib/util/shallowMerge';`
        );
        productFullDetail.addImport(
            `defaultOperations from '@tigrensolutions/core/src/talons/ProductFullDetail/productFullDetail.gql.ce';`
        );
        productFullDetail.addImport(
            `{ fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';`
        );
        productFullDetail.insertAfterSource(
            "import Image from '@magento/venia-ui/lib/components/Image';",
            `
const CustomizeOptions = React.lazy(() =>
    import('@tigrensolutions/product-customize-options/src/components/ProductCustomizeOptions')
);`
        );
        productFullDetail.insertAfterSource(
            'const { product } = props;',
            `
    const operations = mergeOperations(defaultOperations, props.operations);
    const { addSimpleProductToCartMutation, addConfigurableProductToCartMutation } = operations;`
        );
        productFullDetail.insertAfterSource(
            'const talonProps = useProductFullDetail({ product',
            `,
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation`
        );
        productFullDetail.insertAfterSource(
            `productDetails,
        wishlistButtonProps`,
            `,
        customizeOptions,
        handleCustomizeOptionChange`
        );
        productFullDetail.insertBeforeSource(
            'const options = isProductConfigurable(product) ? (',
            `const maybeCustomizeOptions =
        product && product.options && product.type_id !== 'bundle'? (
            <Suspense fallback={fullPageLoadingIndicator}>
                <CustomizeOptions
                    isProduct={true}
                    product={product}
                    options={product.options}
                    onOptionChange={handleCustomizeOptionChange}
                />
            </Suspense>
        ) : null;`
        );
        productFullDetail.setJSXProps(`Price type={'full'}`, {
            customizeOptions: `{customizeOptions}`
        });
        productFullDetail.insertAfterSource(
            '<section className={classes.options}>{options}',
            `{maybeCustomizeOptions}`
        );

        const product = targetables.reactComponent(
            '@tigrensolutions/core/src/components/CartPage/ProductListing/product.js'
        );
        product.insertAfterSource(
            `productType,
        sku`,
            `,
        configurableCustomizable,
        simpleCustomizable`
        );
        product.insertAfterSource(
            'options={options}',
            `
        configurableCustomizable={configurableCustomizable}
        simpleCustomizable={simpleCustomizable}`
        );

        const miniCartItem = targetables.reactComponent(
            '@tigrensolutions/core/src/components/MiniCart/ProductList/item.js'
        );
        miniCartItem.insertAfterSource(
            `quantity,
        configurable_options,`,
            `
        simple_customizable,
        configurable_customizable,`
        );
        miniCartItem.insertAfterSource(
            'options={configurable_options}',
            `
                configurableCustomizable={configurable_customizable}
                simpleCustomizable={simple_customizable}`
        );

        const OrderItemComonent = targetables.reactComponent(
            `@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/item.js`
        );

        const customizeOptionsOrderItem = OrderItemComonent.addImport(
            `CustomizeOptionOrderItem from '@tigrensolutions/product-customize-options/src/components/OptionsOrderItems/customizeOptionsItem.js'`
        );
        OrderItemComonent.insertBeforeSource(
            `<ProductOptions`,
            `<${customizeOptionsOrderItem} classes={classes} customizeOptions={props.customize_options}/>
                        `
        );

        const orderHistoryPageFragment = targetables.esModule(
            `@tigrensolutions/core/src/talons/OrderHistoryPage/orderHistoryPage.gql.js`
        );
        orderHistoryPageFragment.insertBeforeSource(
            `selected_options {`,
            `customize_options {
                    label
                    value
                }
                `
        );

        //add gql check option required
        const autoCompleteComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/SearchBar/autocomplete.js'
        );
        autoCompleteComponent.insertAfterSource(
            `items {`,
            `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        const searchPageQuery = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/SearchPage/searchPage.gql.js'
        );
        searchPageQuery.insertAfterSource(
            `items {
                id`,
            `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        const PageBuilderItemGQL = targetables.esModule(
            '@magento/pagebuilder/lib/ContentTypes/Products/products.js'
        );
        PageBuilderItemGQL.insertAfterSource(
            'items {',
            `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        const categoryPageQuery = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/RootComponents/Category/categoryFragments.gql.js'
        );
        categoryPageQuery.insertAfterSource(
            `items {
            id`,
            `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        // to product link in wishlist page
        const wishListPageQuery = targetables.reactComponent(
            `@tigrensolutions/core/src/talons/WishlistPage/wishlistItemFragments.gql.js`
        );

        wishListPageQuery.insertAfterSource(
            `product {`,
            `
                url_suffix
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        const useWishlistItem = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/WishlistPage/useWishlistItem.js'
        );
        useWishlistItem.insertBeforeSource(
            'const handleAddToCart = useCallback(async () => {',
            `const { options } = product;
    const isRequiredOption = (() => {
        if (!options || !options.length) return false;
        return options.some(option => {
            return option.required == true;
        });
    })();

            `
        );
        useWishlistItem.insertAfterSource(
            'if (!isProductConfigurable(product)',
            ' && !isRequiredOption '
        );

        // to product page if product has option required
        const useAddToCartButtonTalons = targetables.esModule(
            `@tigrensolutions/core/src/talons/Gallery/useAddToCartButton.js`
        );

        useAddToCartButtonTalons.insertBeforeSource(
            'const handleAddToCart = useCallback(async () => {',
            ` const { options } = item;
    const isRequiredOption = (() => {
        if (!options || !options.length) return false;
        return options.some(option => {
            return option.required == true;
        });
    })();

    `
        );

        useAddToCartButtonTalons
            .insertAfterSource(
                "if (productType === 'simple'",
                ' && !isRequiredOption'
            )
            .insertAfterSource(
                "else if (productType === 'configurable'",
                ' || isRequiredOption'
            );
        const useProductCustomizeOptions = targetables.reactComponent(
            `@tigrensolutions/product-customize-options/src/hook/useProductCustomizeOptions.js`
        );
        useProductCustomizeOptions.insertAfterSource(
            `import PRODUCT_DETAIL_GQL from '@`,
            `tigrensolutions/core/src`,
            { remove: 21 }
        );
    }

    if (isModuleAvailable('@tigrensolutions/order-and-returns')) {
        const orderAndReturnGql = targetables.esModule(
            `@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns/ordersAndReturns.gql.js`
        );
        orderAndReturnGql.insertBeforeSource(
            `selected_options {`,
            `customize_options {
                    label
                    value
                }
                `
        );
    }

    if (isModuleAvailable('@tigrensolutions/compare')) {
        const compareListQuery = targetables.reactComponent(
            '@tigrensolutions/compare/src/talons/productDetailFragment.gql.js'
        );
        compareListQuery.insertAfterSource(
            `id
        uid`,
            `
                url_suffix
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
        );

        const compareListItem = targetables.reactComponent(
            '@tigrensolutions/compare/src/components/ComparePage/CompareProduct/item.js'
        );

        compareListItem.insertAfterSource(
            `const { name, small_image } = item;`,
            `
        const { options } = item;
        const isRequiredOption = (() => {
        if (!options || !options.length) return false;
        return options.reduce((prev, cur) => {
            return prev && cur.required;
        }, true);
    })();`
        );
        compareListItem.setJSXProps(`AddToCartButton`, {
            isRequiredOption: `{isRequiredOption}`
        });
    }

    const productLink = `const productLink = getProductUrl({ product, url_suffix: props.productUrlSuffix });`;

    if (isModuleAvailable('@tigrensolutions/product-swatches')) {
        const useProductSwatches = targetables.esModule(
            `@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js`
        );
        useProductSwatches.addImport(`{ useHistory } from 'react-router-dom';`);
        useProductSwatches.addImport(
            `import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';`
        );
        useProductSwatches.insertAfterSource(
            `}, [product]);`,
            `

    const productUrlSuffix = '.html';

    ${productLink}

    const history = useHistory();

    `
        );
        useProductSwatches.insertBeforeSource(
            'const handleAddToCart = useCallback(',
            `
        const { options: customize_option } = product;
        const isRequiredOption = (() => {
            if (!customize_option || !customize_option.length) return false;
            return customize_option.some(option => {
                return option.required == true;
            });
        })();`
        );
        useProductSwatches.insertAfterSource(
            'async (formValues = {}) => {',
            `
            if (isRequiredOption) {
                const actionLink =
                    '/' + getProductUrl({ product, url_suffix: props.productUrlSuffix ||
                    product.url_suffix });
                return history.push(actionLink);
            }`
        );
    }

    if (isModuleAvailable('@tigrensolutions/thank-you-page')) {
        const checkoutSuccessGql = targetables.esModule(
            `@tigrensolutions/thank-you-page/src/talons/CheckoutSuccess/checkoutSuccess.gql.js`
        );
        checkoutSuccessGql.insertAfterSource(
            `items {`,
            `
                customize_options {
                    label
                    value
                }
                `
        );
    }
    if (isModuleAvailable('@tigrensolutions/quick-view')) {
        const quickViewModal = targetables.reactComponent(
            `@tigrensolutions/quick-view/src/components/QuickViewModal/quickViewModal.js`
        );
        quickViewModal.addImport(
            `{ useProductCustomizeOptions } from '@tigrensolutions/product-customize-options/src/hook/useProductCustomizeOptions'`
        );
        quickViewModal.addImport(
            `{ fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator'`
        );
        quickViewModal
            .insertAfterSource(
                `import defaultClasses from './quickViewModal.module.css';`,
                `
        const CustomizeOptions = React.lazy(() =>
            import('@tigrensolutions/product-customize-options/src/components/ProductCustomizeOptions')
        );`
            )
            .insertBeforeSource(
                `} = talonProps;`,
                `,
        addToast
    `
            )
            .insertAfterSource(
                `} = talonProps;`,
                `

    const {
        handleCustomizeOptionChange,
        handleSubmitOption,
        isMissingCustomizeOptions
    } = useProductCustomizeOptions({
        isDisabledAddToCart,
        handleSubmit,
        product,
        handleClose,
        optionSelections,
        selectedVariant,
        optionCodes,
        addToast
    });
    `
            )
            .insertBeforeSource(
                `const dialogContent`,
                `
            const maybeCustomizeOptions =
                product && product.options && product.type_id !== 'bundle' ? (
                    <Suspense fallback={fullPageLoadingIndicator}>
                        <CustomizeOptions
                            isProduct={true}
                            product={product}
                            options={product.options}
                            onOptionChange={handleCustomizeOptionChange}
                        />
                    </Suspense>
                ) : null;
            `
            )
            .insertBeforeSource(
                `<h3 className={classes.quantityLabel`,
                `
                        <section className={classes.options}>
                            {maybeCustomizeOptions}
                        </section>
                        `
            );
        quickViewModal.setJSXProps(`Dialog`, {
            onConfirm: `{handleSubmitOption}`
        });
        const useQuickView = targetables.reactComponent(
            `@tigrensolutions/quick-view/src/talons/QuickViewModal/useQuickView.js`
        );
        useQuickView.insertAfterSource(
            `productDetails,
        handleClose`,
            `,
        addToast
    `
        );
    }

    if (isModuleAvailable('@tigrensolutions/cross-sell-products')) {
        const crossSellProductsGql = targetables.esModule(
            `@tigrensolutions/cross-sell-products/src/talons/CrossSellProducts/crossSellProducts.gql.js`
        );
        crossSellProductsGql.insertAfterSource(
            `crosssell_products {`,
            CustomizableProductInterface
        );
    }

    if (isModuleAvailable('@tigrensolutions/up-sell-products')) {
        const upSellProductsGql = targetables.esModule(
            `@tigrensolutions/up-sell-products/src/talons/upSellProducts.gql.js`
        );
        upSellProductsGql.insertAfterSource(
            `upsell_products {`,
            CustomizableProductInterface
        );
    }

    if (isModuleAvailable('@tigrensolutions/related-products')) {
        const relatedProductsGql = targetables.esModule(
            `@tigrensolutions/related-products/src/talons/relatedProducts.gql.js`
        );
        relatedProductsGql.insertAfterSource(
            `related_products {`,
            CustomizableProductInterface
        );
    }

    if (isModuleAvailable('@tigrensolutions/success-popup-message')) {
        const useProductCustomizeOptions = targetables.reactComponent(
            `@tigrensolutions/product-customize-options/src/hook/useProductCustomizeOptions.js`
        );
        useProductCustomizeOptions.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useProductCustomizeOptions
            .insertBeforeSource(
                `const handleCustomizeOptionChange`,
                `const { toggleSuccessPopup } = useSuccessPopupContext();

    `
            )
            .insertAfterSource(
                `await addSimpleProductToCart({
                            variables
                        });`,
                `
                        toggleSuccessPopup(product);
                        `
            )
            .insertAfterSource(
                `await addConfigurableProductToCart({
                            variables
                        });`,
                `
                        toggleSuccessPopup(product);
                        `
            );
    }
};
