const { Targetables } = require('@magento/pwa-buildpack');
/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */

const {
    bundleProduct,
    bundleCartItems,
    bundleOrderItems,
    bundleCustomizeOptions
} = require('@tigrensolutions/bundle-product/targets/custom.graphql.js');

const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

module.exports = targets => {
    const targetables = Targetables.using(targets);

    const isSupportedProductType = targetables.esModule(
        `@magento/peregrine/lib/util/isSupportedProductType.js`
    );
    isSupportedProductType.insertAfterSource(
        `const SUPPORTED_PRODUCT_TYPES = ['SimpleProduct', 'ConfigurableProduct'`,
        `,'BundleProduct'`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const productFulldetailFragment = targetables.esModule(
            '@tigrensolutions/core/src/talons/RootComponents/Product/productDetailFragment.gql'
        );

        productFulldetailFragment.insertAfterSource(
            `review_count`,
            bundleProduct
        );

        const productFulldetailComponent = targetables.reactComponent(
            `@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js`
        );
        productFulldetailComponent.addImport(
            `ProductBundleForm from '@tigrensolutions/bundle-product/src/components/ProductBundleForm'`
        );
        productFulldetailComponent.insertAfterSource(
            `<Form className={`,
            '`${classes.root} ${product.type_id === "bundle" ? classes.bundleItem: ""}`',
            { remove: 12 }
        );
        productFulldetailComponent.insertBeforeSource(
            `<Button disabled={isAddToCartDisabled} priority={'high'} type="submit">`,
            ` product.type_id === 'bundle' ? <a href={'#bundleForm'} className={classes.customize}><FormattedMessage
                id="productFullDetail.customizeAndAddItemToCart"
                defaultMessage="Customize and Add to Cart"
            /></a> :
            `
        );
        productFulldetailComponent.insertBeforeSource(
            `<div className={classes.information}>`,
            `{product.type_id === 'bundle' && product.items && (
                <ProductBundleForm
                    product={product}
                    storeCurrency={storeCurrency}
                />
            )}`
        );

        // to product page if product type = bundle
        const useAddToCartButtonTalons = targetables.esModule(
            `@tigrensolutions/core/src/talons/Gallery/useAddToCartButton.js`
        );
        useAddToCartButtonTalons.insertAfterSource(
            "else if (productType === 'configurable'",
            " || productType === 'bundle'"
        );

        useAddToCartButtonTalons.insertAfterSource(
            'const isUnsupportedProductType = ',
            "productType !== 'bundle' && "
        );

        const useWishlistItem = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/WishlistPage/useWishlistItem.js'
        );
        useWishlistItem.insertAfterSource(
            'const SUPPORTED_PRODUCT_TYPES = [',
            "'BundleProduct', "
        );

        useWishlistItem.insertAfterSource(
            'if (!isProductConfigurable(product)',
            " && productType !== 'BundleProduct' "
        );

        const productListingFragment = targetables.esModule(
            `@tigrensolutions/core/src/talons//CartPage/ProductListing/productListingFragments.gql.js`
        );
        productListingFragment.insertBeforeSource(`product {`, bundleCartItems);
        productListingFragment.insertAfterSource(
            `items {`,
            bundleCustomizeOptions
        );

        const productListingCart = targetables.reactComponent(
            `@tigrensolutions/core/src/components/CartPage/ProductListing/product`
        );
        const productBundleOptionsCartPage = productListingCart.addImport(
            `ProductBundleOptions from '@tigrensolutions/bundle-product/src/components/ProductBundle/productBundleOptions'`
        );
        productListingCart.insertBeforeSource(
            `<ProductOptions`,
            `{item && item.bundle_options && (
                            <${productBundleOptionsCartPage}
                                bundleOptions={item.bundle_options}
                                currency={currency}
                                classes={classes}
                            />
                        )}`
        );

        const orderHistoryPageFragment = targetables.reactComponent(
            `@tigrensolutions/core/src/talons/OrderHistoryPage/orderHistoryPage.gql.js`
        );
        orderHistoryPageFragment.insertBeforeSource(
            `product_name`,
            bundleOrderItems
        );

        const itemOrderDetails = targetables.reactComponent(
            `@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/item.js`
        );
        itemOrderDetails.insertBeforeSource(
            `} = props;`,
            `,
        bundle_options`
        );
        const orderBundleItems = itemOrderDetails.addImport(
            `OrderBundleItems from '@tigrensolutions/bundle-product/src/components/OrderBundleItems'`
        );
        itemOrderDetails.insertAfterSource(
            `<Link to={itemLink}>{product_name}</Link>
                        </div>`,
            `<${orderBundleItems} bundleOptions={bundle_options} classes={classes} />`
        );

        const minicartItemFragment = targetables.esModule(
            `@magento/peregrine/lib/talons/MiniCart/ProductList/productListFragments.gql.js`
        );
        minicartItemFragment.insertAfterSource(`items {`, bundleCartItems);
        minicartItemFragment.insertAfterSource(
            `items {`,
            bundleCustomizeOptions
        );
        const minicartItemComponent = targetables.reactComponent(
            `@tigrensolutions/core/src/components/MiniCart/ProductList/item.js`
        );
        const productBundleOptionsMinicart = minicartItemComponent.addImport(
            `ProductBundleOptions from '@tigrensolutions/bundle-product/src/components/ProductBundle/productBundleOptions'`
        );
        minicartItemComponent.insertBeforeSource(
            `<ProductOptions`,
            `{props.bundle_options && <${productBundleOptionsMinicart} bundleOptions={props.bundle_options}
                                currency={finalPrice.currency || 'USD'}
                                classes={classes}/>}`
        );

        const intlPatches = targetables.reactComponent(
            `@tigrensolutions/core/src/util/intlPatches.js`
        );
        intlPatches.insertBeforeSource(`const intlFormats`, `export `);

        const bundleItemComponent = targetables.reactComponent(
            `@tigrensolutions/bundle-product/src/components/ProductBundleForm/bundleItem.js`
        );
        bundleItemComponent.addImport(
            `{ intlFormats } from '@tigrensolutions/core/src/util/intlPatches.js'`
        );
        bundleItemComponent.insertBeforeSource(
            '${parseFloat(realMinimal).toFixed',
            '${intlFormats[storeCurrency] && intlFormats[storeCurrency].symbol}'
        );
        bundleItemComponent.insertBeforeSource(
            '${parseFloat(exclMinimal).toFixed',
            '${intlFormats[storeCurrency] && intlFormats[storeCurrency].symbol}'
        );
    }

    if (isModuleAvailable(`@tigrensolutions/product-swatches`)) {
        const useProductSwatches = targetables.esModule(
            `@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js`
        );

        if (!isModuleAvailable(`@tigrensolutions/product-customize-options`)) {
            const getProductUrl = useProductSwatches.addImport(
                `getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';`
            );
        }
        useProductSwatches.insertAfterSource(
            'async (formValues = {}) => {',
            `
            if (product.__typename === "BundleProduct") {
                const actionLink =
                    '/' + getProductUrl({ product, url_suffix: props.productUrlSuffix ||
                    product.url_suffix });
                return history.push(actionLink);
            }`
        );
    }

    const isHasOrderAndReturn = isModuleAvailable(
        '@tigrensolutions/order-and-returns'
    );

    if (isHasOrderAndReturn) {
        const orderAndReturnsQuery = targetables.reactComponent(
            '@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns/ordersAndReturns.gql.js'
        );

        orderAndReturnsQuery.insertAfterSource('product_sku', bundleOrderItems);
    }

    if (isModuleAvailable('@tigrensolutions/thank-you-page')) {
        const orderSuccessPageFragment = targetables.reactComponent(
            `@tigrensolutions/thank-you-page/src/talons/CheckoutSuccess/checkoutSuccess.gql.js`
        );

        orderSuccessPageFragment.insertBeforeSource(
            `product_name`,
            bundleOrderItems
        );
    }

    const intlPatches = targetables.reactComponent(
        `@magento/peregrine/lib/util/intlPatches.js`
    );

    intlPatches.insertBeforeSource(`const intlFormats`, `export `);

    const bundleItemComponent = targetables.reactComponent(
        `@tigrensolutions/bundle-product/src/components/ProductBundleForm/bundleItem.js`
    );

    if (!isModuleAvailable(`@tigrensolutions/core`)) {
        bundleItemComponent.addImport(
            `{ intlFormats } from '@magento/peregrine/lib/util/intlPatches.js'`
        );
    }

    bundleItemComponent.insertBeforeSource(
        '${parseFloat(realMinimal).toFixed',
        '${intlFormats[storeCurrency] && intlFormats[storeCurrency].symbol}'
    );

    bundleItemComponent.insertBeforeSource(
        '${parseFloat(exclMinimal).toFixed',
        '${intlFormats[storeCurrency] && intlFormats[storeCurrency].symbol}'
    );

    const autocomplete = targetables.esModule(
        '@magento/venia-ui/lib/components/SearchBar/autocomplete.js'
    );

    autocomplete.insertAfterSource(
        `items {`,
        `
        stock_status`
    );

    if (isModuleAvailable(`@tigrensolutions/product-customize-options`)) {
        const productBundleForm = targetables.reactComponent(
            `@tigrensolutions/bundle-product/src/components/ProductBundleForm/productBundleForm.js`
        );

        productBundleForm
            .insertAfterSource(
                `import { Form } from 'informed';`,
                `

const CustomizeOptions = React.lazy(() =>
    import('@tigrensolutions/product-customize-options/src/components/ProductCustomizeOptions')
);
`
            )
            .insertAfterSource(
                `const isAvailable = stock_status === 'IN_STOCK';`,
                `

    const maybeCustomizeOptions = options ? (
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
            .insertAfterSource(
                `{bundleItems}`,
                `
                    {maybeCustomizeOptions}
                `
            );
    }
};
