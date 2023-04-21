const CORE_ROOT_COMPONENT_PREFIX = `@magento/venia-ui/lib/RootComponents`;
const THEME_ROOT_COMPONENT_PREFIX = `@tigrensolutions/core/src/RootComponents`;

const CORE_UI_PREFIX = `@magento/venia-ui/lib/components`;
const THEME_UI_PREFIX = `@tigrensolutions/core/src/components`;

const CORE_TALON_PREFIX = '@magento/peregrine/lib/talons';
const THEME_TALON_PREFIX = '@tigrensolutions/core/src/talons';

const CORE_ACTION_PREFIX = '@magento/peregrine/lib/store/actions';
const THEME_ACTION_PREFIX = `@tigrensolutions/core/src/store`;

module.exports = overrideMapping = {
    components: {
        /**
         * ------------------------------------ COMPONENTS -----------------------------------------------------
         */
        [`${CORE_UI_PREFIX}/App`]: `${THEME_UI_PREFIX}/App`,
        [`${CORE_UI_PREFIX}/Breadcrumbs`]: `${THEME_UI_PREFIX}/Breadcrumbs`,
        [`${CORE_UI_PREFIX}/Gallery`]: `${THEME_UI_PREFIX}/Gallery`,
        [`${CORE_UI_PREFIX}/FilterSidebar/filterSidebar.js`]: `${THEME_UI_PREFIX}//FilterSidebar/filterSidebar.js`,
        [`${CORE_UI_PREFIX}/Gallery/item.js`]: `${THEME_UI_PREFIX}/Gallery/item.js`,
        [`${CORE_UI_PREFIX}/SearchPage`]: `${THEME_UI_PREFIX}/SearchPage`,
        [`${CORE_UI_PREFIX}/ProductFullDetail`]: `${THEME_UI_PREFIX}/ProductFullDetail`,
        [`${CORE_UI_PREFIX}/SignIn/signIn`]: `${THEME_UI_PREFIX}/SignIn/signIn`,
        [`${CORE_UI_PREFIX}/Button`]: `${THEME_UI_PREFIX}/Button`,
        [`${CORE_UI_PREFIX}/CreateAccount/createAccount`]: `${THEME_UI_PREFIX}/CreateAccount/createAccount`,
        [`${CORE_UI_PREFIX}/ErrorView`]: `${THEME_UI_PREFIX}/ErrorView`,
        [`${CORE_UI_PREFIX}/ToastContainer`]: `${THEME_UI_PREFIX}/ToastContainer`,
        [`${CORE_UI_PREFIX}/ForgotPassword`]: `${THEME_UI_PREFIX}/ForgotPassword`,
        [`${CORE_UI_PREFIX}/ForgotPasswordPage`]: `${THEME_UI_PREFIX}/ForgotPasswordPage`,
        [`${CORE_UI_PREFIX}/MyAccount/ResetPassword`]: `${THEME_UI_PREFIX}/MyAccount/ResetPassword`,
        [`${CORE_UI_PREFIX}/FilterSidebar/filterSidebar`]: `${THEME_UI_PREFIX}/FilterSidebar/filterSidebar`,
        [`${CORE_UI_PREFIX}/AddressBookPage/addressBookPage`]: `${THEME_UI_PREFIX}/AddressBookPage/addressBookPage`,
        [`${CORE_UI_PREFIX}/MiniCart/ProductList/item.js`]: `${THEME_UI_PREFIX}/MiniCart/ProductList/item.js`,
        [`${CORE_UI_PREFIX}/FormError/formError.js`]: `${THEME_UI_PREFIX}/FormError/formError.js`,
        [`${CORE_UI_PREFIX}/Checkbox/checkbox.js`]: `${THEME_UI_PREFIX}/Checkbox/checkbox.js`,
        [`${CORE_UI_PREFIX}/FilterModal/FilterList/filterItem.js`]: `${THEME_UI_PREFIX}/FilterModal/FilterList/filterItem.js`,
        /**
         * ------------------------------------ CSS -------------------------------------------------
         */
        [`${CORE_UI_PREFIX}/FilterSidebar/filterSidebar.module.css`]: `${THEME_UI_PREFIX}/FilterSidebar/filterSidebar.module.css`,
        [`${CORE_UI_PREFIX}/FilterModal/filterBlock.module.css`]: `${THEME_UI_PREFIX}/FilterModal/filterBlock.module.css`,
        [`${CORE_UI_PREFIX}/ProductSort/productSort.module.css`]: `${THEME_UI_PREFIX}/ProductSort/productSort.module.css`,
        [`${CORE_UI_PREFIX}/FilterModal/CurrentFilters/currentFilter.module.css`]: `${THEME_UI_PREFIX}/FilterModal/CurrentFilters/currentFilter.module.css`,
        [`${CORE_UI_PREFIX}/FilterModal/CurrentFilters/currentFilters.module.css`]: `${THEME_UI_PREFIX}/FilterModal/CurrentFilters/currentFilters.module.css`,
        [`${CORE_UI_PREFIX}/FilterModal/filterModal.module.css`]: `${THEME_UI_PREFIX}/FilterModal/filterModal.module.css`,
        [`${CORE_UI_PREFIX}/Pagination/pagination.module.css`]: `${THEME_UI_PREFIX}/Pagination/pagination.module.css`,
        [`${CORE_UI_PREFIX}/Pagination/tile.module.css`]: `${THEME_UI_PREFIX}/Pagination/tile.module.css`,
        [`${CORE_UI_PREFIX}/Gallery/gallery.module.css`]: `${THEME_UI_PREFIX}/Gallery/gallery.module.css`,
        [`${CORE_UI_PREFIX}/MiniCart/miniCart.module.css`]: `${THEME_UI_PREFIX}/MiniCart/miniCart.module.css`,
        [`${CORE_UI_PREFIX}/Button/button.module.css`]: `${THEME_UI_PREFIX}/Button/button.module.css`,
        [`${CORE_UI_PREFIX}/TextInput/textInput.module.css`]: `${THEME_UI_PREFIX}/TextInput/textInput.module.css`,
        [`${CORE_UI_PREFIX}/FilterModalOpenButton/filterModalOpenButton.module.css`]: `${THEME_UI_PREFIX}/FilterModalOpenButton/filterModalOpenButton.module.css`,
        [`${CORE_UI_PREFIX}/FilterModalOpenButton/filterModalOpenButton.shimmer.module.css`]: `${THEME_UI_PREFIX}/FilterModalOpenButton/filterModalOpenButton.shimmer.module.css`,
        [`${CORE_UI_PREFIX}/ProductSort/productSort.shimmer.module.css`]: `${THEME_UI_PREFIX}/ProductSort/productSort.shimmer.module.css`,
        [`${CORE_UI_PREFIX}/TextArea/textArea.module.css`]: `${THEME_UI_PREFIX}/TextArea/textArea.module.css`,
        [`${CORE_UI_PREFIX}/Select/select.module.css`]: `${THEME_UI_PREFIX}/Select/select.module.css`,
        [`${CORE_UI_PREFIX}/Breadcrumbs/breadcrumbs.module.css`]: `${THEME_UI_PREFIX}/Breadcrumbs/breadcrumbs.module.css`,
        [`${CORE_UI_PREFIX}/Checkbox/checkbox.module.css`]: `${THEME_UI_PREFIX}/Checkbox/checkbox.module.css`,
        [`${CORE_UI_PREFIX}/RadioGroup/radio.module.css`]: `${THEME_UI_PREFIX}/RadioGroup/radio.module.css`,
        [`${CORE_UI_PREFIX}/MegaMenu/megaMenuItem.module.css`]: `${THEME_UI_PREFIX}/MegaMenu/megaMenuItem.module.css`,
        [`${CORE_UI_PREFIX}/CartPage/ProductListing/quantity.module.css`]: `${THEME_UI_PREFIX}/CartPage/ProductListing/quantity.module.css`,
        [`${CORE_UI_PREFIX}/MegaMenu/submenu.module.css`]: `${THEME_UI_PREFIX}/MegaMenu/submenu.module.css`,
        [`${CORE_UI_PREFIX}/LegacyMiniCart/productOptions.module.css`]: `${THEME_UI_PREFIX}/LegacyMiniCart/productOptions.module.css`,
        /**
         * ------------------------------------ ROOT COMPONENTS -------------------------------------------------
         */
        [`${CORE_ROOT_COMPONENT_PREFIX}/Category`]: `${THEME_ROOT_COMPONENT_PREFIX}/Category`,
        [`${CORE_ROOT_COMPONENT_PREFIX}/Category/categoryContent.shimmer.js`]: `${THEME_ROOT_COMPONENT_PREFIX}/Category/categoryContent.shimmer.js`,
        [`${CORE_ROOT_COMPONENT_PREFIX}/Product/product.shimmer.js`]: `${THEME_ROOT_COMPONENT_PREFIX}/Product/product.shimmer.js`,
        /**
         * ------------------------------------ TALONS -------------------------------------------------
         */
        [`${CORE_TALON_PREFIX}/RootComponents/Category`]: `${THEME_TALON_PREFIX}/RootComponents/Category`,
        [`${CORE_TALON_PREFIX}/Header/useCurrencySwitcher.js`]: `${THEME_TALON_PREFIX}/Header/useCurrencySwitcher.js`,
        [`${CORE_TALON_PREFIX}/AccountMenu/useAccountMenuItems`]: `${THEME_TALON_PREFIX}/AccountMenu/useAccountMenuItems`,
        /**
         * ------------------------------------ GRAPHQL -------------------------------------------------
         */
        [`${CORE_TALON_PREFIX}/RootComponents/Category/categoryFragments.gql`]: `${THEME_TALON_PREFIX}/RootComponents/Category/categoryFragments.gql`,
        [`${CORE_TALON_PREFIX}/RootComponents/Product/productDetailFragment.gql`]: `${THEME_TALON_PREFIX}/RootComponents/Product/productDetailFragment.gql`,
        [`${CORE_TALON_PREFIX}/CartPage/PriceSummary/priceSummaryFragments.gql.js`]: `${THEME_TALON_PREFIX}/CartPage/PriceSummary/priceSummaryFragments.gql.js`,
        [`${CORE_TALON_PREFIX}/CartPage/ProductListing/productListingFragments.gql.js`]: `${THEME_TALON_PREFIX}/CartPage/ProductListing/productListingFragments.gql.js`,
        [`${CORE_TALON_PREFIX}/SearchPage/searchPage.gql.js`]: `${THEME_TALON_PREFIX}/SearchPage/searchPage.gql.js`,
        /**
         * ------------------------------------ STORE -------------------------------------------------
         */
        [`${CORE_ACTION_PREFIX}/cart/asyncActions`]: `${THEME_ACTION_PREFIX}/actions/cart/asyncActions`,
        /**
         * ------------------------------------ HOOKS -------------------------------------------------
         */
        [`@magento/peregrine/lib/hooks/useWindowSize`]: `@tigrensolutions/core/src/hooks/useWindowSize`,
        /**
         * ------------------------------------ UTILS -------------------------------------------------
         */
        [`@magento/peregrine/lib/util/intlPatches`]: `@tigrensolutions/core/src/util/intlPatches`,
        /**
         * ------------------------------------ APOLLO -------------------------------------------------
         */
        [`@magento/peregrine/lib/Apollo/magentoGqlCacheLink.js`]: `@tigrensolutions/core/src/Apollo/magentoGqlCacheLink.js`
    },
    intercepts: {
        /**
         * Purpose of this mapping is to map intercept overwrite, for the custom logic for the specific package interceptor
         * Format is following:
         * [`vendor/package/<path_to_source_intercept>`]: 'vendor/package/<path_to_rewritten_intercept>'
         */
        ['@magento/peregrine/lib/targets/peregrine-intercept.js']: `@tigrensolutions/core/src/targets/peregrine-intercept.js`
    }
};
