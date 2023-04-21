/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */
const glob = require('glob');
const path = require('path');
const { Targetables } = require('@magento/pwa-buildpack');
const moduleOverridePlugin = require('@tigrensolutions/core/moduleOverrideWebpackPlugin');
const { components: componentOverrideMapping } = require('./overrideMapping');
const detectTargetableFile = require('./detectTargetableFile');
const newRoutes = require('./newRoutes.json');

const getTargetableFileExtend = path => {
    return `@tigrensolutions/core/${path}`;
};

const handlePackageIntercepts = (targetables, targets) => {
    const currentPath = path.resolve(__dirname);

    const extendInterceptPaths = glob.sync(
        `${currentPath}/src/**/*.extend.js`,
        {
            ignore: [currentPath + '/node_modules/**', currentPath + '/.git/**']
        }
    );

    for (const extendInterceptPath of extendInterceptPaths) {
        const targetablePath = detectTargetableFile(
            extendInterceptPath.replace(`${currentPath}/`, '')
        );
        require(path.resolve(extendInterceptPath))(targetables, targetablePath);
    }
};

module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });
    builtins.specialFeatures.tap(features => {
        features[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true,
            rootComponents: true
        };
    });

    // Add new routes
    const venia = targets.of('@magento/venia-ui');
    venia.routes.tap(routes => [...routes, ...newRoutes]);

    // Implement custom extensions
    const targetables = Targetables.using(targets);
    handlePackageIntercepts(targetables, targets);

    // Trans text to current filter symbol
    const CurrentFilterComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/FilterModal/CurrentFilters/currentFilter.js'
    );
    CurrentFilterComponent.replaceJSX(
        'span className={classes.text}',
        `<span className={classes.text} dangerouslySetInnerHTML={{ __html: item?.label ? item?.label : item?.title }} />`
    );

    // Remove param ?page=1 when first time go to page
    const usePagination = targetables.esModule(
        '@magento/peregrine/lib/hooks/usePagination.js'
    );
    usePagination.insertAfterSource('if (replace) {', 'return;');

    // Return null when CMS doesn't exist.
    const CmsBlockComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CmsBlock/cmsBlock.js'
    );
    CmsBlockComponent.insertAfterSource('if (error) {', 'return null;');

    // Fix duplicate loading in homepage when has CmsBlockPage.
    CmsBlockComponent.insertAfterSource('if (loading) {', 'return null');

    // Change redirect url after clicking on proceed to checkout button
    const useMiniCart = targetables.esModule(
        '@magento/peregrine/lib/talons/MiniCart/useMiniCart.js'
    );
    useMiniCart.insertBeforeSource("/cart')", '/checkout');

    const useCartTrigger = targetables.esModule(
        '@magento/peregrine/lib/talons/Header/useCartTrigger.js'
    );
    useCartTrigger.insertBeforeSource("/cart')", '/checkout');

    // Show No Product Found component instead of default message of venia.
    const ProductRootComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/Product/product.js'
    );
    const NoProductsFound = ProductRootComponent.addImport(
        'NoProductsFound from "@tigrensolutions/core/src/RootComponents/Category/NoProductsFound"'
    );
    ProductRootComponent.insertBeforeSource(
        '(loading && !product)',
        `(`
    ).insertAfterSource('((loading && !product)', `|| (!error && !product))`);
    ProductRootComponent.insertAfterSource(
        'if (!product) {',
        `return <div style={{marginTop: "50px"}}><${NoProductsFound} categoryId={0} /></div>;`
    );

    // Redirect to my account page after creating a new account.
    const useCreateAccountPage = targetables.esModule(
        '@magento/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage.js'
    );
    useCreateAccountPage.insertAfterSource(
        `history.push(fromRedirectUrl || signedInRedirectUrl`,
        `, { redirectFrom: 'createAccountPage' }`
    );

    // Fix scroll lock error after close dialog.
    const DialogComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Dialog/dialog.js'
    );
    DialogComponent.addImport('{ useLayoutEffect } from "react"');
    DialogComponent.insertAfterSource(
        'useScrollLock(isOpen);',
        `
        useLayoutEffect(() => {
             return () => {
                document.documentElement.dataset.scrollLock = '';
            }
        }, []);
    `
    );

    // When user don't enter any value on quantity field. Auto change value to 1
    const useQuantity = targetables.esModule(
        '@magento/peregrine/lib/talons/CartPage/ProductListing/useQuantity'
    );
    useQuantity.insertBeforeSource(
        'const maskInput = useCallback(',
        `
        const handleChange =  useMemo(
          () =>
            debounce(event => {
                const value = event.target.value || "";

                if (value === "") {
                   quantityFieldApi.setValue(1);
                   onChange(1);
                }
            }, 500),
        [onChange, quantityFieldApi]
      );
    `
    );
    useQuantity.insertAfterSource(
        `return {
        isDecrementDisabled,`,
        'handleChange,'
    );
    const QuantityComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity'
    );
    QuantityComponent.insertBeforeSource('} = talonProps;', ', handleChange');
    QuantityComponent.insertBeforeSource(
        'onBlur={handleBlur}',
        'onChange={handleChange}'
    );

    // Tax price mini-cart and product price mini-cart
    const MiniCartGQL = targetables.esModule(
        '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql.js'
    );

    MiniCartGQL.insertAfterSource(
        'prices {\n',
        'subtotal_including_tax {\n currency\n value\n}\n'
    );

    // Change subtotal mini-cart to incl tax
    useMiniCart.insertAfterSource(
        'const subTotal = useMemo(() => {\n',
        'if(!miniCartLoading && miniCartData && miniCartData.cart && miniCartData.cart.prices.subtotal_including_tax) {\n' +
            '                return miniCartData.cart.prices.subtotal_including_tax\n' +
            '            }'
    );

    const ProductMiniCartGQL = targetables.esModule(
        '@magento/peregrine/lib/talons/MiniCart/ProductList/productListFragments.gql.js'
    );
    ProductMiniCartGQL.insertAfterSource(
        'prices {\n',
        ' price_including_tax {\n currency\n value\n }\n'
    ).insertAfterSource(
        'stock_status\n',
        'price {\n regularPrice {\n amount {\n currency\n value\n }\n}\n}'
    );

    // Incl-tax price on edit product in cart page
    const productDetailCart = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/ProductListing/EditModal/productDetail.js'
    );

    productDetailCart.insertAfterSource(
        'variantPrice || ',
        '(prices && prices.price_including_tax) || '
    );

    // Replace CouponCode in checkout page to component Core
    const PriceAdjustments = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/PriceAdjustments/priceAdjustments.js'
    );
    const CouponCodeCore = PriceAdjustments.addImport(
        `CouponCodeCore from '@tigrensolutions/core/src/components/CartPage/PriceAdjustments/CouponCode'`
    );
    PriceAdjustments.replaceJSX(
        'CouponCode setIsCartUpdating={setPageIsUpdating}',
        `${CouponCodeCore} setIsCartUpdating={setPageIsUpdating} isCheckout={true}`
    );

    // Add Store Switcher title
    const StoreSwitcherComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Header/storeSwitcher.js'
    );
    StoreSwitcherComponent.addImport(
        `import { FormattedMessage } from 'react-intl'`
    );
    StoreSwitcherComponent.insertAfterSource(
        'data-cy="StoreSwitcher-root">',
        `<span>
                    <FormattedMessage
                        id="header.language"
                        defaultMessage={'Language'}
                    />
                </span>`
    );

    // Add Currency Switcher title
    const CurrencySwitcherComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Header/currencySwitcher.js'
    );
    CurrencySwitcherComponent.addImport(
        `import { FormattedMessage } from 'react-intl'`
    );
    CurrencySwitcherComponent.insertAfterSource(
        '<div data-cy="CurrencySwitcher-root" className={classes.root}>',
        `<span>
                    <FormattedMessage
                        id="header.currency"
                        defaultMessage={'Currency'}
                    />
                </span>`
    );

    // Check price shipping method = 0 > show 0 ; not show free
    const ShippingRadioComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods/shippingRadio.js'
    );
    ShippingRadioComponent.insertAfterSource(
        'const priceElement = props.price',
        '|| props.price >= 0'
    );

    // Save store_locale_code into storage
    const useStoreSwitcher = targetables.esModule(
        '@magento/peregrine/lib/talons/Header/useStoreSwitcher.js'
    );
    useStoreSwitcher.insertAfterSource(
        `storage.setItem('store_view_code', storeCode);`,
        `\n storage.setItem('store_locale_code', availableStores.get(storeCode) && availableStores.get(storeCode).locale);`
    );

    // Add class in megamenu
    const MegaMenuItem = targetables.reactComponent(
        '@magento/venia-ui/lib/components/MegaMenu/megaMenuItem.js'
    );
    MegaMenuItem.insertBeforeSource(
        'const megaMenuItemClassname = ',
        "const hasChildrenClass = (category && category.children && category.children.length) ? classes.hasChildren : '';"
    ).insertAfterSource(
        'className={megaMenuItemClassname',
        " + ' ' + hasChildrenClass"
    );

    // Fix update options cart
    const ProductionTalonsMagento = targetables.reactComponent(
        '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/useProductForm.js'
    );
    ProductionTalonsMagento.insertBeforeSource(
        `const handleSubmit = useCallback(`,
        `
            useEffect(() => {
               if (cartItem && cartItem.configurable_options && configItem && configItem.configurable_options && !optionSelections.size) {
                   const selectedValueMap = new Map();
                   for (const { id, option_label, value_label } of cartItem.configurable_options) {
                       const options = configItem.configurable_options.filter(
                           item => item.label == option_label
                       )

                       const optionSelected = options.length && options[0].values.filter(
                           item => item.label == value_label
                       )
                       selectedValueMap.set(id+'', optionSelected.length && optionSelected[0].value_index);
                   }
                   setOptionSelections(selectedValueMap);
               }
            }, [cartItem, configItem]);
        `
    );

    // Add shimmer for category tree
    const CategoryTreeComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CategoryTree/categoryTree.js'
    );
    CategoryTreeComponent.addImport(
        `CategoryTreeShimmer from '@tigrensolutions/core/src/components/CategoryTree/categoryTree.shimmer.js'`
    );
    CategoryTreeComponent.insertBeforeSource(
        `return (`,
        `if (!branches) return <CategoryTreeShimmer />;`
    );

    // Fix the first click issue after customer visits the page
    const useMagentoRoute = targetables.esModule(
        '@magento/peregrine/lib/talons/MagentoRoute/useMagentoRoute.js'
    );
    useMagentoRoute.insertBeforeSource(`inlinedData) {`, `!isInitialized && `);
    useMagentoRoute.insertAfterSource(
        `resetInlinedPageData();
        };
    }, [`,
        `isInitialized`
    );

    // add query tax_display_type
    const storeSwitcherGraphql = targetables.esModule(
        `@magento/peregrine/lib/talons/Header/storeSwitcher.gql.js`
    );
    storeSwitcherGraphql.insertAfterSource(
        `storeConfig {`,
        `
            tax_display_type`
    );

    // remove request null image bg from banner
    const pageBuilderBanner = targetables.reactComponent(
        '@magento/pagebuilder/lib/ContentTypes/Banner/banner.js'
    );

    pageBuilderBanner.insertBeforeSource(
        `if (image) {`,
        `if (image && bgImageStyle) {`,
        { remove: 12 }
    );
    //Validate password by config
    const combineValidators = targetables.esModule(
        `@magento/venia-ui/lib/util/combineValidators.js`
    );
    combineValidators
    .insertAfterSource(`return (value, values`, `, minimumPasswordLength`)
    .insertBeforeSource(
        `result = extendedCallback(value, values, extendedParam);`,
        `
                if (extendedCallback?.name === 'hasLengthAtLeast') {
                    result = extendedCallback(value, values, minimumPasswordLength);
                } else {
                `
    )
    .insertAfterSource(
        `result = extendedCallback(value, values, extendedParam);`,
        `
        }`
    );
};
