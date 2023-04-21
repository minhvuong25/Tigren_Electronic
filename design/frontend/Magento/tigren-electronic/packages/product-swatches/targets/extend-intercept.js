const { Targetables } = require('@magento/pwa-buildpack');
const {
    configurableProductVariantFields
} = require('@tigrensolutions/product-swatches/targets/custom.graphql.js');

const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Add user_errors field to MiniCartFragment
    const AddToCartGQL = targetables.esModule(
        '@magento/peregrine/lib/talons/ProductFullDetail/productFullDetail.gql.ce'
    );
    AddToCartGQL.insertAfterSource(
        'MiniCartFragment\n            }',
        `user_errors{ message code}`
    );

    /*
     * Add context into the CategoryContent
     */
    const CategoryContentComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/Category/categoryContent.js'
    );
    const ProductSwatchProvider = CategoryContentComponent.addImport(
        `ProductSwatchProvider from '@tigrensolutions/product-swatches/src/context'`
    );
    CategoryContentComponent.surroundJSX(
        'article className={classes.root}',
        `${ProductSwatchProvider}`
    );
    /*
     * Add context into the Search Page
     */
    const SearchPageComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/SearchPage/searchPage.js'
    );
    const SearchPageProductSwatchProvider = SearchPageComponent.addImport(
        `ProductSwatchProvider from '@tigrensolutions/product-swatches/src/context'`
    );
    SearchPageComponent.surroundJSX(
        'article className={classes.root}',
        `${SearchPageProductSwatchProvider}`
    );

    /*
     * Add ProductSwatches into the gallery item.
     */
    const GalleryItemComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Gallery/item.js'
    );

    // Add talons
    const useProductSwatches = GalleryItemComponent.addImport(
        `{useProductSwatches} from '@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js'`
    );
    GalleryItemComponent.insertBeforeSource(
        'if (!item) {',
        `const productSwatchesProps = ${useProductSwatches}({
            product: item
        }); \n`
    );

    // Add product swatches component
    const ProductSwatchesComponent = GalleryItemComponent.addImport(
        `ProductSwatches from '@tigrensolutions/product-swatches/src/components/ProductSwatches'`
    );
    GalleryItemComponent.insertBeforeSource(
        '<div className={classes.actionsContainer}',
        `\n<${ProductSwatchesComponent} product={item} {...productSwatchesProps}/>`
    );

    // Replace adding to cart button
    const AddToCartButtonComponent = GalleryItemComponent.addImport(
        `AddToCartButton from '@tigrensolutions/product-swatches/src/components/ProductSwatches/addToCartButton'`
    );
    GalleryItemComponent.replaceJSX(
        'AddToCartbutton item={item}',
        `<${AddToCartButtonComponent} {...productSwatchesProps} />`
    );

    // Change props of images
    GalleryItemComponent.setJSXProps('Image', {
        resource: `{(productSwatchesProps && productSwatchesProps.smallImage) || smallImageURL}`
    });

    // Change props of Prices
    GalleryItemComponent.removeJSXProps('Price', ['product']).setJSXProps(
        'Price',
        {
            product: `{(productSwatchesProps && productSwatchesProps.selectedVariant && productSwatchesProps.selectedVariant.product) || item}`
        }
    );

    // Extend styles for gallery items
    const GalleryItemClasses = GalleryItemComponent.addImport(
        "tgStylesExtend from '@tigrensolutions/product-swatches/src/components/Gallery/galleryItemExtend.module.css'"
    );
    GalleryItemComponent.insertAfterSource(
        'useStyle(defaultClasses,',
        `${GalleryItemClasses},`
    );

    // Add out of stock message
    const OutOfStockMessage =
        '<div className={classes.outOfStock}><span><FormattedMessage id="galleryItem.outOfStock" defaultMessage="Out of stock" /></span></div>';
    GalleryItemComponent.appendJSX(
        'Link onClick={handleLinkClick} to={productLink} className={classes.images}',
        `<div>{productSwatchesProps.isOutOfStock ? (${OutOfStockMessage}):null} </div>`
    );

    // Change GraphQL fields
    const CategoryFragmentGQL = targetables.esModule(
        '@magento/peregrine/lib/talons/RootComponents/Category/categoryFragments.gql.js'
    );
    CategoryFragmentGQL.insertAfterSource(
        'items {',
        configurableProductVariantFields
    );
    const SearchPageGQL = targetables.esModule(
        '@magento/peregrine/lib/talons/SearchPage/searchPage.gql.js'
    );
    SearchPageGQL.insertAfterSource(
        'items {',
        configurableProductVariantFields
    );

    const PageBuilderItemGQL = targetables.esModule(
        '@magento/pagebuilder/lib/ContentTypes/Products/products.js'
    );
    PageBuilderItemGQL.insertAfterSource(
        'items {',
        configurableProductVariantFields
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        /*
         * Add context into the CategoryContent
         */
        const CategoryContentComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/RootComponents/Category/categoryContent.js'
        );
        const ProductSwatchProvider = CategoryContentComponent.addImport(
            `ProductSwatchProvider from '@tigrensolutions/product-swatches/src/context'`
        );
        CategoryContentComponent.surroundJSX(
            'article className={classes.root}',
            `${ProductSwatchProvider}`
        );
        /*
         * Add context into the Search Page
         */
        const SearchPageComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/SearchPage/searchPage.js'
        );
        const SearchPageProductSwatchProvider = SearchPageComponent.addImport(
            `ProductSwatchProvider from '@tigrensolutions/product-swatches/src/context'`
        );
        SearchPageComponent.surroundJSX(
            'div className={classes.container}',
            `${SearchPageProductSwatchProvider}`
        );

        /*
         * Add ProductSwatches into the gallery item.
         */
        const GalleryItemComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Gallery/item.js'
        );

        // Add talons
        const useProductSwatches = GalleryItemComponent.addImport(
            `{useProductSwatches} from '@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js'`
        );
        GalleryItemComponent.insertBeforeSource(
            'if (!item) {',
            `const productSwatchesProps = ${useProductSwatches}({
            product: item,
            productUrlSuffix: productUrlSuffix
        }); \n`
        );

        // Add product swatches component
        const ProductSwatchesComponent = GalleryItemComponent.addImport(
            `ProductSwatches from '@tigrensolutions/product-swatches/src/components/ProductSwatches'`
        );
        GalleryItemComponent.insertBeforeSource(
            '<div className={classes.actionsContainer}',
            `\n<${ProductSwatchesComponent} product={item} {...productSwatchesProps}/>`
        );

        // Replace adding to cart button
        const AddToCartButtonComponent = GalleryItemComponent.addImport(
            `AddToCartButton from '@tigrensolutions/product-swatches/src/components/ProductSwatches/addToCartButton'`
        );
        GalleryItemComponent.replaceJSX(
            'AddToCartbutton item={item}',
            `<${AddToCartButtonComponent} {...productSwatchesProps} />`
        );

        // Change props of images
        GalleryItemComponent.setJSXProps('Image', {
            resource: `{(productSwatchesProps && productSwatchesProps.smallImage) || smallImageURL}`
        });

        // Change props of Prices
        GalleryItemComponent.removeJSXProps('Price', ['product']).setJSXProps(
            'Price',
            {
                product: `{(productSwatchesProps && productSwatchesProps.selectedVariant && productSwatchesProps.selectedVariant.product) || item}`
            }
        );

        // Extend styles for gallery items
        const GalleryItemClasses = GalleryItemComponent.addImport(
            "tgStylesExtend from '@tigrensolutions/product-swatches/src/components/Gallery/galleryItemExtend.module.css'"
        );
        GalleryItemComponent.insertAfterSource(
            'useStyle(defaultClasses,',
            `${GalleryItemClasses},`
        );

        // Add out of stock message
        const OutOfStockMessage =
            '<div className={classes.outOfStock}><span><FormattedMessage id="galleryItem.outOfStock" defaultMessage="Out of stock" /></span></div>';
        GalleryItemComponent.appendJSX(
            'Link onClick={handleLinkClick} to={productLink} className={classes.images}',
            `<div>{productSwatchesProps.isOutOfStock ? (${OutOfStockMessage}):null} </div>`
        );

        // Change GraphQL fields
        const CategoryFragmentGQL = targetables.esModule(
            '@tigrensolutions/core/src/talons/RootComponents/Category/categoryFragments.gql.js'
        );
        CategoryFragmentGQL.insertAfterSource(
            'items {',
            configurableProductVariantFields
        );
        const PageBuilderItemGQL = targetables.esModule(
            '@magento/pagebuilder/lib/ContentTypes/Products/products.js'
        );
        PageBuilderItemGQL.insertAfterSource(
            'items {',
            configurableProductVariantFields
        );

        const SearchPageGQL = targetables.esModule(
            '@tigrensolutions/core/src/talons/SearchPage/searchPage.gql.js'
        );
        SearchPageGQL.insertAfterSource(
            'items {',
            configurableProductVariantFields
        );

        const productDetailFragment = targetables.esModule(
            `@tigrensolutions/core/src/talons/RootComponents/Product/productDetailFragment.gql.js`
        );
        productDetailFragment.insertAfterSource(
            `configurable_options {`,
            `
                frontend_input`
        );

        if (isModuleAvailable('@tigrensolutions/quick-view')) {
            const quickViewGql = targetables.esModule(
                '@tigrensolutions/quick-view/src/talons/QuickViewModal/productDetailFragment.js'
            );
            quickViewGql.insertAfterSource(
                `configurable_options {`,
                `
                frontend_input`
            );
        }
    }

    if (isModuleAvailable('@amasty/customers-also-viewed')) {
        const AmastyProductFragmentGQL = targetables.esModule(
            '@amasty/customers-also-viewed/src/talons/productFragment.ggl.js'
        );
        AmastyProductFragmentGQL.insertAfterSource(
            'attribute_id',
            '\nfrontend_input'
        );
    }

    if (isModuleAvailable('@tigrensolutions/cross-sell-products')) {
        const crossSellProductsGQL = targetables.esModule(
            '@tigrensolutions/cross-sell-products/src/talons/CrossSellProducts/crossSellProducts.gql.js'
        );
        crossSellProductsGQL.insertAfterSource(
            `crosssell_products {`,
            configurableProductVariantFields
        );
    }

    if (isModuleAvailable('@tigrensolutions/related-products')) {
        const relatedProductsGQL = targetables.esModule(
            '@tigrensolutions/related-products/src/talons/relatedProducts.gql.js'
        );
        relatedProductsGQL.insertAfterSource(
            `related_products {`,
            configurableProductVariantFields
        );
    }

    if (isModuleAvailable('@tigrensolutions/up-sell-products')) {
        const upSellProductsGQL = targetables.esModule(
            '@tigrensolutions/up-sell-products/src/talons/upSellProducts.gql.js'
        );
        upSellProductsGQL.insertAfterSource(
            `upsell_products {`,
            configurableProductVariantFields
        );
    }
};
