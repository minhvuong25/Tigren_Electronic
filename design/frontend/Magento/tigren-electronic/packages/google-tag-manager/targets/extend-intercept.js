const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Add google tag manager context provider
    const ContextProvider = targetables.reactComponent(
        `@magento/venia-ui/lib/components/App/contextProvider.js`
    );
    const GoogleTagManagerContextProvider = ContextProvider.addImport(
        `GoogleTagManagerContextProvider from '@tigrensolutions/google-tag-manager/src/context.js'`
    );

    ContextProvider.insertBeforeSource(
        `const ContextProvider = ({ children }) => {`,
        `contextProviders.push(${GoogleTagManagerContextProvider});

        `
    );

    // Page View
    const HeadComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/Head/index.js`
    );
    HeadComponent.addImport(`{ useLocation } from 'react-router-dom';`);
    HeadComponent.addImport(
        `{ trackPageView } from '@tigrensolutions/google-tag-manager/src/util/trackPageView.js';`
    );
    HeadComponent.addImport(
        `{ trackPageViewGa4 } from '@tigrensolutions/google-tag-manager/src/util/trackPageViewGa4.js';`
    );
    HeadComponent.insertAfterSource(`{ useMemo`, `, useEffect`)
        .insertAfterSource(
            `export const Title = props => {
    const { children,`,
            ` ready_track_ga,`
        )
        .insertAfterSource(
            `const { children, ready_track_ga, ...tagProps } = props;`,
            `
    const location = useLocation();
    const { data: storeNameData } = useQuery(STORE_NAME_QUERY);

    const google_tag_manager_general_enabled_ga4 = useMemo(() => {
        return storeNameData
            ? storeNameData.storeConfig.google_tag_manager_general_enabled_ga4
            : false;
    }, [storeNameData]);

    const google_tag_manager_general_enabled = useMemo(() => {
        return storeNameData
            ? storeNameData.storeConfig.google_tag_manager_general_enabled
            : false;
    }, [storeNameData]);

    useEffect(() => {
        if (ready_track_ga && google_tag_manager_general_enabled) {
            trackPageView(location);
        }
        if (ready_track_ga && google_tag_manager_general_enabled_ga4) {
            trackPageViewGa4(location);
        }
    }, [ready_track_ga]);
        `
        );

    HeadComponent.insertAfterSource(
        `export const StoreTitle = props => {
    const { children,`,
        `ready_track_ga,`
    )
        .insertAfterSource(
            `store_code`,
            `
        ,google_tag_manager_general_enabled, google_tag_manager_general_enabled_ga4
        `
        )
        .insertBeforeSource(
            `let titleText;`,
            `
        const google_tag_manager_general_enabled = useMemo(() => {
                    return storeNameData
                        ? storeNameData.storeConfig.google_tag_manager_general_enabled
                        : false;
                }, [storeNameData]);

                const google_tag_manager_general_enabled_ga4 = useMemo(() => {
                    return storeNameData
                        ? storeNameData.storeConfig.google_tag_manager_general_enabled_ga4
                        : false;
                }, [storeNameData]);

                const location = useLocation();

                useEffect(() => {
                    if (ready_track_ga && google_tag_manager_general_enabled) {
                        trackPageView(location);
                    }
                    if (ready_track_ga && google_tag_manager_general_enabled_ga4) {
                        trackPageViewGa4(location);
                    }
                }, [ready_track_ga]);
                `
        )
        .insertAfterSource(
            `return (
        <Helmet>
            <title {...tagProps}>{titleText}</title>
        </Helmet>
    );
};`,
            `
        StoreTitle.defaultProps = {
                    ready_track_ga: true
                };
                Title.defaultProps = {
                    ready_track_ga: true
                };
                `
        );
    HeadComponent.insertAfterSource('titleText = `${children}', ``, {
        remove: 15
    });

    const CategoryContentComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/RootComponents/Category/categoryContent.js`
    );
    CategoryContentComponent.insertAfterSource(
        `<StoreTitle`,
        ` ready_track_ga={!!categoryName}`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        // Add google tag manager context provider
        const ContextProvider = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/contextProvider.js'
        );
        const GoogleTagManagerContextProvider = ContextProvider.addImport(
            "GoogleTagManagerContextProvider from '@tigrensolutions/google-tag-manager/src/context.js'"
        );

        ContextProvider.insertBeforeSource(
            'const ContextProvider = ({ children }) => {',
            `contextProviders.push(${GoogleTagManagerContextProvider});

`
        );
        const CategoryContentComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/RootComponents/Category/categoryContent.js'
        );
        CategoryContentComponent.insertAfterSource(
            `<StoreTitle`,
            ` ready_track_ga={!!categoryName}`
        );

        const UseAddToCartButton = targetables.esModule(
            '@tigrensolutions/core/src/talons/Gallery/useAddToCartButton.js'
        );
        UseAddToCartButton.insertBeforeSource(
            `setIsLoading(false);`,
            `
                const price =
                    product?.price_range?.minimum_price?.final_price?.value;
                const currencyCode =
                    product?.price_range?.minimum_price?.final_price?.currency;
                window.dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': currencyCode || 'USD',
                        'add': {
                            'products': [{
                                name: item.name,
                                id: item.id,
                                price: price,
                                brand: '',
                                category: '',
                                variant: '',
                                quantity: quantity
                            }]
                        }
                    }
                });
                window.dataLayer.push({
                    'event': 'add_to_cart',
                    'ecommerce': {
                        'items': [
                            {
                              item_id: item.id,
                              item_name:  item.name,
                              affiliation: '',
                              coupon: '',
                              currency: currencyCode || 'USD',
                              discount: '',
                              index: 0,
                              item_brand: '',
                              item_category: '',
                              item_list_id: '',
                              item_list_name: '',
                              item_variant: '',
                              location_id: '',
                              price: price,
                              quantity: quantity
                            }
                        ]
                    }
                });
                `
        );

        const UseProductFullDetail = targetables.esModule(
            '@tigrensolutions/core/src/talons/ProductFullDetail/useProductFullDetail.js'
        );

        UseProductFullDetail.addImport(
            `addToCart from '@tigrensolutions/google-tag-manager/src/util/addToCart.js';`
        );
        UseProductFullDetail.addImport(
            `addToCartGa4 from '@tigrensolutions/google-tag-manager/src/util/addToCartGa4.js';`
        );
        UseProductFullDetail.addImport(
            `{ useGoogleTagManagerContext } from '@tigrensolutions/google-tag-manager/src/context.js';`
        );
        UseProductFullDetail.insertAfterSource(
            `const isSupportedProductType = isSupported(productType);`,
            `
    const {
        google_tag_manager_general_enabled,
        google_tag_manager_general_enabled_ga4
    } = useGoogleTagManagerContext();`
        )
            .insertAfterSource(
                `if (!errors.length) {`,
                `
                        if (google_tag_manager_general_enabled) {
                            addToCart(product, quantity);
                        }`
            )
            .insertAfterSource(
                `if (!errors.length) {`,
                `
                        if (google_tag_manager_general_enabled_ga4) {
                            addToCartGa4(product, quantity);
                        }`
            );
        UseProductFullDetail.addImport(
            `productDetailImpressions from '@tigrensolutions/google-tag-manager/src/talons/ProductFullDetail/productDetailImpressions.js';`
        );
        UseProductFullDetail.insertBeforeSource(
            `const wishlistButtonProps = {`,
            `productDetailImpressions(product);

    `
        );
        // Change GraphQL fields
        const ProductDetailFragment = targetables.esModule(
            '@tigrensolutions/core/src/talons/RootComponents/Product/productDetailFragment.gql.js'
        );
        ProductDetailFragment.insertAfterSource(
            `categories {`,
            `
            name`
        );

        // Product View
        const Gallery = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Gallery/gallery.js'
        );
        Gallery.addImport(
            `{ useGoogleTagManagerContext } from '@tigrensolutions/google-tag-manager/src/context.js';`
        );
        Gallery.insertAfterSource(
            `const { storeConfig } = talonProps;`,
            `
    const { google_tag_manager_general_enabled, google_tag_manager_general_enabled_ga4 } = useGoogleTagManagerContext();`
        )
            .insertBeforeSource(
                `const galleryItems = useMemo(`,
                `let product = [];
            let productGA4 = [];
    let currencyCode = '';
    `
            )
            .insertAfterSource(
                `if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }`,
                `
                const price =
                    product?.price_range?.minimum_price?.final_price?.value;
                const currencyCode =
                    product?.price_range?.minimum_price?.final_price?.currency;
                const arr = [{
                    name: item.name,
                    id: item.id,
                    price: price,
                    brand: '',
                    category: '',
                    variant: '',
                    list: '',
                    position: 1
                }]
                product = [...product, ...arr];`
            )
            .insertAfterSource(
                `if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }`,
                `
            const priceGa4 =
            product?.price_range?.minimum_price?.final_price?.value;
            const currencyCodeGa4 =
            product?.price_range?.minimum_price?.final_price?.currency;
                const arrItems = [{
                    item_id: item.id,
                    item_name:  item.name,
                    affiliation: '',
                    coupon: '',
                    currency: currencyCodeGa4 || 'USD',
                    discount: '',
                    index: 0,
                    item_brand: '',
                    item_category: '',
                    item_list_id: '',
                    item_list_name: '',
                    item_variant: '',
                    location_id: '',
                    price: priceGa4,
                    quantity: 1
                }]
                productGA4 = [...product, ...arrItems];`
            )
            .insertBeforeSource(
                `const rootClasses =`,
                `
    if (product.length > 0 && google_tag_manager_general_enabled) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            'ecommerce': {
                'currencyCode': currencyCode || 'USD',
                'impressions': product
            }
        });
    }`
            )
            .insertBeforeSource(
                `const rootClasses =`,
                `
    if (product.length > 0 && google_tag_manager_general_enabled_ga4) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            'event': 'view_item_list',
            'ecommerce': {
                'items': productGA4
            }
        });
    }`
            );
    }

    // Add To Cart
    if (isModuleAvailable(`@tigrensolutions/product-swatches`)) {
        const UseProductSwatches = targetables.esModule(
            `@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js`
        );
        UseProductSwatches.addImport(
            `addToCart from '@tigrensolutions/google-tag-manager/src/util/addToCart.js';`
        );
        UseProductSwatches.addImport(
            `addToCartGa4 from '@tigrensolutions/google-tag-manager/src/util/addToCartGa4.js';`
        );
        UseProductSwatches.addImport(
            `{ useGoogleTagManagerContext } from '@tigrensolutions/google-tag-manager/src/context.js';`
        );
        UseProductSwatches.insertAfterSource(
            `const isInCategoryPage = !!filterState;`,
            `
            const { google_tag_manager_general_enabled, google_tag_manager_general_enabled_ga4 } = useGoogleTagManagerContext();
                  `
        )
            .insertAfterSource(
                `if (!errors.length) {`,
                `
                    if (google_tag_manager_general_enabled) {
                        addToCart(product, quantity);
                    }`
            )
            .insertAfterSource(
                `if (!errors.length) {`,
                `
                    if (google_tag_manager_general_enabled_ga4) {
                        addToCartGa4(product, quantity);
                    }`
            );
    } else {
        const UseAddToCartButton = targetables.esModule(
            `@magento/peregrine/lib/talons/Gallery/useAddToCartButton.js`
        );

        UseAddToCartButton.insertBeforeSource(
            `setIsLoading(false);`,
            `
                const price =
                    product?.price_range?.minimum_price?.final_price?.value;
                const currencyCode =
                    product?.price_range?.minimum_price?.final_price?.currency;
                window.dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': currencyCode || 'USD',
                        'add': {
                            'products': [{
                                name: item.name,
                                id: item.id,
                                price: price,
                                brand: '',
                                category: '',
                                variant: '',
                                quantity: quantity
                            }]
                        }
                    }
                });
                window.dataLayer.push({
                    'event': 'add_to_cart',
                    'ecommerce': {
                        'items': [
                            {
                              item_id: item.id,
                              item_name:  item.name,
                              affiliation: '',
                              coupon: '',
                              currency: currencyCode || 'USD',
                              discount: '',
                              index: 0,
                              item_brand: '',
                              item_category: '',
                              item_list_id: '',
                              item_list_name: '',
                              item_variant: '',
                              location_id: '',
                              price: price,
                              quantity: quantity
                            }
                        ]
                    }
                });
                `
        );
    }

    const UseProductFullDetail = targetables.esModule(
        `@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js`
    );

    UseProductFullDetail.addImport(
        `addToCart from '@tigrensolutions/google-tag-manager/src/util/addToCart.js';`
    );
    UseProductFullDetail.addImport(
        `addToCartGa4 from '@tigrensolutions/google-tag-manager/src/util/addToCartGa4.js';`
    );
    UseProductFullDetail.addImport(
        `{ useGoogleTagManagerContext } from '@tigrensolutions/google-tag-manager/src/context.js';`
    );
    UseProductFullDetail.insertAfterSource(
        `const isSupportedProductType = isSupported(productType);`,
        `
        const { google_tag_manager_general_enabled, google_tag_manager_general_enabled_ga4 } = useGoogleTagManagerContext();`
    )
        .insertBeforeSource(
            `await addProductToCart({ variables });`,
            `const res = `
        )
        .insertAfterSource(
            `await addProductToCart({ variables });`,
            `
                    const errors = res.data.addProductsToCart.user_errors;
                    if (!errors.length) {
                        if (google_tag_manager_general_enabled) {
                        addToCart(product, quantity);
                        }
                        if (google_tag_manager_general_enabled_ga4) {
            addToCartGa4(product, quantity);
                    }
                        showSuccessMessage();
                    } else {
                        const error = errors[0];
                        showErrorMessage(error.message);
                    }`
        );
    UseProductFullDetail.addImport(
        `productDetailImpressions from '@tigrensolutions/google-tag-manager/src/talons/ProductFullDetail/productDetailImpressions.js';`
    );
    UseProductFullDetail.insertBeforeSource(
        `const wishlistButtonProps = {`,
        `productDetailImpressions(product)
        `
    );

    // Change GraphQL fields
    const ProductDetailFragment = targetables.esModule(
        `@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql.js`
    );

    ProductDetailFragment.insertAfterSource(
        `categories {`,
        `
        name
        `
    );

    // Event after checkout success
    if (isModuleAvailable(`@tigrensolutions/thank-you-page`)) {
        const UseCheckoutSuccess = targetables.esModule(
            `@tigrensolutions/thank-you-page/src/talons/CheckoutSuccess/useCheckoutSuccess.js`
        );
        UseCheckoutSuccess.addImport(
            `successfulCheckout from '@tigrensolutions/google-tag-manager/src/talons/CheckoutSuccess/successfulCheckout.js';`
        );
        UseCheckoutSuccess.insertAfterSource(
            `{ getOrderDetailsQuery`,
            `, getOrderGtmQuery`
        ).insertBeforeSource(
            `useEffect(() => {`,
            `successfulCheckout(data);

            `
        );

        const CheckoutSuccessFragmentGQL = targetables.esModule(
            `@tigrensolutions/thank-you-page/src/talons/CheckoutSuccess/checkoutSuccess.gql.js`
        );
        CheckoutSuccessFragmentGQL.insertBeforeSource(
            `items {`,
            `gtm
            `
        );
    }

    // Product View
    const Gallery = targetables.reactComponent(
        `@magento/venia-ui/lib/components/Gallery/gallery.js`
    );

    Gallery.addImport(
        `{ useGoogleTagManagerContext } from '@tigrensolutions/google-tag-manager/src/context.js';`
    );
    Gallery.insertAfterSource(
        `const { storeConfig } = talonProps;`,
        `
    const { google_tag_manager_general_enabled, google_tag_manager_general_enabled_ga4 } = useGoogleTagManagerContext();`
    )
        .insertBeforeSource(
            `const galleryItems = useMemo(`,
            `let product = [];
            let productGA4 = [];
    let currencyCode = '';
    `
        )
        .insertAfterSource(
            `if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }`,
            `
                const price =
                    product?.price_range?.minimum_price?.final_price?.value;
                const currencyCode =
                    product?.price_range?.minimum_price?.final_price?.currency;
                const arr = [{
                    name: item.name,
                    id: item.id,
                    price: price,
                    brand: '',
                    category: '',
                    variant: '',
                    list: '',
                    position: 1
                }]
                product = [...product, ...arr];`
        )
        .insertAfterSource(
            `if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }`,
            `
            const priceGa4 =
            product?.price_range?.minimum_price?.final_price?.value;
            const currencyCodeGa4 =
            product?.price_range?.minimum_price?.final_price?.currency;
                const arrItems = [{
                    item_id: item.id,
                    item_name:  item.name,
                    affiliation: '',
                    coupon: '',
                    currency: currencyCodeGa4 || 'USD',
                    discount: '',
                    index: 0,
                    item_brand: '',
                    item_category: '',
                    item_list_id: '',
                    item_list_name: '',
                    item_variant: '',
                    location_id: '',
                    price: priceGa4,
                    quantity: 1
                }]
                productGA4 = [...product, ...arrItems];`
        )
        .insertAfterSource(
            `[items, storeConfig]
    );`,
            `
    if (product.length > 0 && google_tag_manager_general_enabled) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            'ecommerce': {
                'currencyCode': currencyCode || 'USD',
                'impressions': product
            }
        });
    }`
        )
        .insertAfterSource(
            `[items, storeConfig]
    );`,
            `

    if (product.length > 0 && google_tag_manager_general_enabled_ga4) {
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            'event': 'view_item_list',
            'ecommerce': {
                'items': productGA4
            }
        });
    }
    `
        );
};
