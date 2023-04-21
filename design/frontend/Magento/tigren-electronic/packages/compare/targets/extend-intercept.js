const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Change GraphQL fields
    const addToCartGQL = targetables.esModule(
        `@magento/peregrine/lib/talons/Gallery/addToCart.gql`
    );
    addToCartGQL.insertAfterSource(
        `...MiniCartFragment
            }`,
        `user_errors{message code}`
    );

    // Add compare button
    const NavigationComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/Navigation/navigation.js`
    );
    const ComparePopupComponent = NavigationComponent.addReactLazyImport(
        `@tigrensolutions/compare/src/components/ComparePopup`
    );
    NavigationComponent.insertBeforeSource(
        `<aside className={rootClassName}`,
        `<>
        <Suspense fallback={null}><${ComparePopupComponent} /></Suspense>
        `
    ).insertAfterSource(
        `</aside>`,
        `
    </>`
    );

    // Add compare context provider
    const ContextProvider = targetables.reactComponent(
        `@magento/venia-ui/lib/components/App/contextProvider.js`
    );
    const CompareProvider = ContextProvider.addImport(
        `CompareProvider from '@tigrensolutions/compare/src/context'`
    );
    ContextProvider.insertBeforeSource(
        `const ContextProvider = ({ children }) => {`,
        `contextProviders.push(${CompareProvider});`
    );

    const GalleryItemComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/Gallery/item.js`
    );
    const AddToCompareButtonComponent = GalleryItemComponent.addImport(
        `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
    );
    GalleryItemComponent.insertAfterSource(
        `{addButton}`,
        `<${AddToCompareButtonComponent} product={item} classes={classes}/>`
    );

    const ProductFullDetailComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`
    );
    const AddToCompareButtonProductFullDetail = ProductFullDetailComponent.addImport(
        `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
    );
    ProductFullDetailComponent.insertAfterSource(
        `{cartActionContent}`,
        `<${AddToCompareButtonProductFullDetail} product={product} classes={classes} isProductDetail={true}/>`
    );

    const WishlistItemComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/WishlistPage/wishlistItem.js`
    );
    const AddToCompareButtonWishlistItem = WishlistItemComponent.addImport(
        `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
    );
    WishlistItemComponent.insertAfterSource(
        `{addToCart}`,
        `<${AddToCompareButtonWishlistItem} product={product} classes={classes}/>`
    );

    const SignInTalons = targetables.reactComponent(
        `@magento/peregrine/lib/talons/SignIn/useSignIn.js`
    );
    SignInTalons.addImport(
        `ExtendCompare from '@tigrensolutions/compare/src/insert/extendCompare'`
    );
    SignInTalons.insertAfterSource(
        `const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);`,
        `const { removeCompare, assignCompare } = ExtendCompare();`
    );
    SignInTalons.insertAfterSource(
        `getCartDetails({ fetchCartId, fetchCartDetails });`,
        `await assignCompare();
        removeCompare();`
    );

    const CreateTalons = targetables.reactComponent(
        `@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js`
    );
    CreateTalons.addImport(
        `ExtendCompare from '@tigrensolutions/compare/src/insert/extendCompare'`
    );
    CreateTalons.insertAfterSource(
        `const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);`,
        `const { removeCompare, assignCompare } = ExtendCompare();`
    );
    CreateTalons.insertAfterSource(
        `await getUserDetails({ fetchUserDetails });`,
        `await assignCompare();
        removeCompare();`
    );

    const UserAsyncActions = targetables.reactComponent(
        `@magento/peregrine/lib/store/actions/user/asyncActions`
    );
    UserAsyncActions.insertAfterSource(
        `await dispatch(clearToken());`,
        `storage.removeItem('compareId');`
    );

    // change toast error when add wishlist not login
    const useAddToListButton = targetables.esModule(
        `@magento/peregrine/lib/talons/Wishlist/AddToListButton/helpers/useSingleWishlist.js`
    );
    useAddToListButton.insertBeforeSource(`'info'`, `'error' || `);

    if (isModuleAvailable(`@tigrensolutions/core`)) {
        // Add compare button
        const NavigationComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Navigation/navigation.js'
        );
        NavigationComponent.insertBeforeSource(
            `const Navigation = props => {`,
            `const ComparePopup = React.lazy(() =>
    import('@tigrensolutions/compare/src/components/ComparePopup')
);

`
        );
        NavigationComponent.insertBeforeSource(
            `<aside className={rootClassName}`,
            `<Suspense fallback={null}>
            <ComparePopup classes={classes} />
        </Suspense>`
        );

        // Add compare context provider
        const ContextProvider = targetables.reactComponent(
            '@tigrensolutions/core/src/ThemeContextProvider/themeContextProvider.js'
        );
        const CompareProvider = ContextProvider.addImport(
            "CompareProvider from '@tigrensolutions/compare/src/context'"
        );
        ContextProvider.insertBeforeSource(
            'const ThemeContextProvider = ({ children }) => {',
            `contextProviders.push(${CompareProvider});\n`
        );

        const GalleryItemComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Gallery/item.js'
        );
        const AddToCompareButtonComponent = GalleryItemComponent.addImport(
            `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
        );
        GalleryItemComponent.insertAfterSource(
            '<div className={classes.actionsBottom}>',
            `<${AddToCompareButtonComponent} product={item} classes={classes}/>`
        );

        const SignInTalons = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/SignIn/useSignIn.js'
        );
        SignInTalons.addImport(
            "ExtendCompare from '@tigrensolutions/compare/src/insert/extendCompare'"
        );
        SignInTalons.insertAfterSource(
            'const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);',
            'const { removeCompare, assignCompare } = ExtendCompare();'
        );
        SignInTalons.insertAfterSource(
            'getCartDetails({ fetchCartId, fetchCartDetails });',
            'await assignCompare();\nremoveCompare();'
        );

        const CreateTalons = targetables.reactComponent(
            '@tigrensolutions/core/src/talons/CreateAccount/useCreateAccount.js'
        );
        CreateTalons.addImport(
            "ExtendCompare from '@tigrensolutions/compare/src/insert/extendCompare'"
        );
        CreateTalons.insertAfterSource(
            'const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);',
            'const { removeCompare, assignCompare } = ExtendCompare();'
        );
        CreateTalons.insertAfterSource(
            'await getCartDetails({ fetchCartId, fetchCartDetails });',
            'await assignCompare();\nremoveCompare();'
        );

        // Add compare button to PDP
        const ProductFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );
        const AddToCompareButtonProductFullDetail = ProductFullDetailComponent.addImport(
            `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
        );
        ProductFullDetailComponent.insertAfterSource(
            'cartActionContent}',
            `<${AddToCompareButtonProductFullDetail} product={product} classes={classes} isProductDetail={true}/>`
        );
    }

    if (isModuleAvailable('@amasty/social-login')) {
        const signInEventTalons = targetables.esModule(
            `@amasty/social-login/src/talons/useSignInEvent.js`
        );
        signInEventTalons.addImport(
            "ExtendCompare from '@tigrensolutions/compare/src/insert/extendCompare'"
        );
        signInEventTalons.insertAfterSource(
            `const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);`,
            `const { removeCompare, assignCompare } = ExtendCompare();`
        );
        signInEventTalons.insertAfterSource(
            `getUserDetails({ fetchUserDetails });`,
            `
                    await assignCompare();
                    removeCompare();`
        );
    }
};
