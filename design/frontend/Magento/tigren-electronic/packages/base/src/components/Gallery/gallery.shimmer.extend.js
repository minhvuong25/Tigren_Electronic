const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const galleryShimmer = targetables.reactComponent(targetablePath);

    galleryShimmer.addImport(
        `GallerySliderShimmer from '@tigrensolutions/base/src/components/Gallery/gallerySlider.shimmer.js'`
    );

    galleryShimmer.insertBeforeSource(
        '} = props;',
        ',slidesToShow, appearance, '
    );

    galleryShimmer.insertBeforeSource(
        `return (`,
        `if (appearance === 'carousel') {
        return (
            <GallerySliderShimmer slidesToShow={slidesToShow}/>
        );
    }
                    `
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const galleryShimmer = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Gallery/gallery.shimmer.js'
        );

        galleryShimmer.addImport(
            `GallerySliderShimmer from '@tigrensolutions/base/src/components/Gallery/gallerySlider.shimmer.js'`
        );

        galleryShimmer.insertBeforeSource(
            '} = props;',
            ',slidesToShow, appearance, '
        );

        galleryShimmer.insertBeforeSource(
            `return (`,
            `if (appearance === 'carousel') {
                        return (
                            <GallerySliderShimmer slidesToShow={slidesToShow}/>
                        );
                    }
                    `
        );
    }
};
