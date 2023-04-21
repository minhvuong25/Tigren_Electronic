const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Add quick view context provider
    const ContextProviderVenia = targetables.reactComponent(
        '@magento/venia-ui/lib/components/App/contextProvider.js'
    );
    const TgQuickViewProviderVenia = ContextProviderVenia.addImport(
        "TgQuickViewProvider from '@tigrensolutions/quick-view/src/context'"
    );
    ContextProviderVenia.insertBeforeSource(
        'const ContextProvider = ({ children }) => {',
        `contextProviders.push(${TgQuickViewProviderVenia});\n`
    );

    //Add Show Quick View for Gallery Item Venia
    const GalleryItem = targetables.reactComponent(`@magento/venia-ui/lib/components/Gallery/item.js`);

    GalleryItem.addImport(`ShowQuickViewModal from '@tigrensolutions/quick-view/src/components/ShowQuickViewModal'`);

    GalleryItem.surroundJSX('Link', `div className={classes.galleryImageContainer}`);

    GalleryItem.insertAfterJSX('Link', `ShowQuickViewModal classes={classes} product={item}`);

    // Extend styles for Gallery Item
    const GalleryItemClasses = GalleryItem.addImport(
        `GalleryItemStylesExtend from '@tigrensolutions/quick-view/src/components/GalleryItem/GalleryItem.module.css'`);

    GalleryItem.insertAfterSource('useStyle(defaultClasses,', `${GalleryItemClasses},`);

    //Add Show Quick View for Wish List Item Venia
    const WishListItem = targetables.reactComponent(
        '@magento/venia-ui/lib/components/WishlistPage/wishlistItem.js');

    WishListItem.addImport(`ShowQuickViewModal from '@tigrensolutions/quick-view/src/components/ShowQuickViewModal'`);

    WishListItem.surroundJSX('Image', `div className={classes.wishListItemIContainer}`);

    WishListItem.insertAfterJSX('Image', `ShowQuickViewModal classes={classes} product={product}`);

    // Extend styles for wish list item
    const WishListItemClasses = WishListItem.addImport(
        `WishListItemStylesExtend from '@tigrensolutions/quick-view/src/components/WishListItem/WishListItem.module.css'`);

    WishListItem.insertAfterSource('useStyle(defaultClasses,', `${WishListItemClasses},`);

    // Add QuickView Modal to App
    const AppComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/App/app.js'
    );
    AppComponent.insertAfterSource(
        `import Icon from '../Icon';`,
        `
const TgQuickViewModalComponent = React.lazy(() =>
    import('@tigrensolutions/quick-view/src/components/QuickViewModal')
);
`
    );
    AppComponent.insertBeforeSource(
        '<Navigation />',
        `<Suspense fallback={null}>
            <TgQuickViewModalComponent />
        </Suspense>`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        // Add quick view context provider
        const ContextProvider = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/contextProvider.js'
        );
        const TgQuickViewProviderVenia = ContextProvider.addImport(
            "TgQuickViewProvider from '@tigrensolutions/quick-view/src/context'"
        );
        ContextProvider.insertBeforeSource(
            'const ContextProvider = ({ children }) => {',
            `contextProviders.push(${TgQuickViewProviderVenia});\n`
        );

        //Add show search button for Gallery Item
        const GalleryItem = targetables.reactComponent(`@tigrensolutions/core/src/components/Gallery/item.js`);

        GalleryItem.addImport(`ShowQuickViewModal from '@tigrensolutions/quick-view/src/components/ShowQuickViewModal'`);

        GalleryItem.surroundJSX('Link', `div className={classes.galleryImageContainer}`);

        GalleryItem.insertAfterJSX('Link', `ShowQuickViewModal classes={classes} product={item}`);

        // Extend styles for Gallery Item
        const GalleryItemClasses = GalleryItem.addImport(
            `GalleryItemStylesExtend from '@tigrensolutions/quick-view/src/components/GalleryItem/GalleryItem.module.css'`);

        GalleryItem.insertAfterSource('useStyle(defaultClasses,', `${GalleryItemClasses},`);

        //Add show search button for wish list item
        const WishListItem = targetables.reactComponent(
            '@tigrensolutions/core/src/components/WishlistPage/wishlistItem.js');

        WishListItem.addImport(`ShowQuickViewModal from '@tigrensolutions/quick-view/src/components/ShowQuickViewModal'`);

        WishListItem.surroundJSX('Link', `div className={classes.wishListItemIContainer}`);

        WishListItem.insertAfterJSX('Link', `ShowQuickViewModal classes={classes} product={product}`);

        // Extend styles for wish list item
        const WishListItemClasses = WishListItem.addImport(
            `WishListItemStylesExtend from '@tigrensolutions/quick-view/src/components/WishListItem/WishListItem.module.css'`);

        WishListItem.insertAfterSource('useStyle(defaultClasses,', `${WishListItemClasses},`);

        // Add QuickView Modal to App
        const AppComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        AppComponent.insertBeforeSource(
            `const App = props => {`,
            `const QuickViewModal = React.lazy(() =>
    import('@tigrensolutions/quick-view/src/components/QuickViewModal')
);

`
        );
        AppComponent.insertBeforeSource(
            '<Navigation />',
            `<Suspense fallback={null}>
            <QuickViewModal />
        </Suspense>`
        );
    }

    // Add compare button into the quick view modal.
    if (isModuleAvailable('@tigrensolutions/compare')) {
        const QuickViewModalComponent = targetables.reactComponent(
            '@tigrensolutions/quick-view/src/components/QuickViewModal/quickViewModal.js'
        );
        const AddToCompareButtonComponent = QuickViewModalComponent.addImport(
            `{ AddToCompareButton } from '@tigrensolutions/compare/src/components/AddToCompareButton'`
        );
        QuickViewModalComponent.appendJSX(
            'div className={classes.actions}',
            `<${AddToCompareButtonComponent} product={product} classes={classes} isDialogOpen={isDialogOpen} />`
        );
    }

    if (isModuleAvailable(`@tigrensolutions/product-swatches`)) {
        useProductSwatches = targetables.esModule(
            '@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js'
        );
        useProductSwatches.insertBeforeSource(
            `import { useProductSwatchContext } from '@tigrensolutions/product-swatches/src/context';`,
            `
import { useTgQuickViewContext } from '@tigrensolutions/quick-view/src/context';
`
        );
        useProductSwatches.insertAfterSource(
            `const { formatMessage } = useIntl();`,
            `
    const { showQuickView } = useTgQuickViewContext();
    `
        );
        useProductSwatches.insertAfterSource(
            `async (formValues = {}) => {`,
            `
            if (isMissingOptions(product, selectedOptions)) {
                return showQuickView(product.sku);
            }

            `
        );
    }
};
