const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    const ProductFullDetailComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    const GalleryZoomComponent = ProductFullDetailComponent.addImport(
        `GalleryZoom from '@tigrensolutions/gallery-zoom/src/components/ProductImageCarousel'`
    );
    ProductFullDetailComponent.removeJSX('Carousel');
    ProductFullDetailComponent.appendJSX(
        'section className={classes.imageCarousel}',
        `${GalleryZoomComponent} images={mediaGalleryEntries} additionalGalleryProps={{
                            thumbnailPosition: 'bottom',
                            showNav: true
                        }} width={580}`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const ProductFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );
        const GalleryZoomComponent = ProductFullDetailComponent.addImport(
            `GalleryZoom from '@tigrensolutions/gallery-zoom/src/components/ProductImageCarousel'`
        );
        ProductFullDetailComponent.removeJSX('Carousel');
        ProductFullDetailComponent.appendJSX(
            'section className={classes.imageCarousel}',
            `${GalleryZoomComponent} images={mediaGalleryEntries} additionalGalleryProps={{
                            thumbnailPosition: 'bottom',
                            showNav: true
                        }} width={580}`
        );
    }
};
