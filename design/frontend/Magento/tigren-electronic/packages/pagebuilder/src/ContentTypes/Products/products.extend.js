module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderProducts = targetables.reactComponent(
        targetablePath
    );

    magentoPageBuilderProducts.addImport(
        `{ GalleryShimmer } from '@magento/venia-ui/lib/components/Gallery'`
    );
    magentoPageBuilderProducts.insertBeforeSource(
        `const Products = props => {`,
        `
const getSlidesToShow = (cssClasses = '') => {
    let slidesToShow = 5;
    const regex = /slideToShow_(\\d*)/gm;
    const str = cssClasses && cssClasses.join(' ');
    if (str && regex) {
        const str_pos = regex.exec(str);
        if (str_pos) {
            const countSlide = str_pos && str_pos[1];
            slidesToShow = Number(countSlide);
        }
    }
    return slidesToShow;
};`
    );
    magentoPageBuilderProducts.insertAfterSource(
        `variables: { url_keys: urlKeys, pageSize: urlKeys.length }`,
        `,
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'`
    );
    magentoPageBuilderProducts.insertAfterSource(`cssClasses = [],`, ``, {
        remove: 89
    });
    magentoPageBuilderProducts.insertAfterSource(
        `small_image {
                    url
                }`,
        `
                type_id`
    );

    magentoPageBuilderProducts.insertAfterSource(
        `storeConfig {`,
        `
            id
            `
    );

    magentoPageBuilderProducts.insertAfterSource(
        `regular_price {
                            currency
                            value
                        }`,
        `
                        maximum_final_price_excl_tax {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }`
    );

    magentoPageBuilderProducts.insertBeforeSource(
        `}
                sku`,
        `
                    minimum_price {
                        minimum_final_price_excl_tax {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        discount {
                            percent_off
                            amount_off
                        }
                    }
                    `
    );
    magentoPageBuilderProducts.insertAfterSource(
        `items {`,
        `
                url_rewrites {
                    url
                }`
    );

    magentoPageBuilderProducts.insertBeforeSource(
        `if (loading) `,
        `
    const slidesToShow = getSlidesToShow(cssClasses) !== '' ? getSlidesToShow(cssClasses) : 5
    const slidesToShowMedium = getSlidesToShow(cssClasses) < 4 ? getSlidesToShow(cssClasses) : 4
    const slidesToShowSmall = getSlidesToShow(cssClasses) < 2 ? getSlidesToShow(cssClasses) : 2
`
    );

    magentoPageBuilderProducts.insertAfterSource(
        `if (loading) `,
        `
            return (
                <GalleryShimmer
                    slidesToShow={slidesToShow}
                    appearance={appearance}
                />
            );
    `,
        { remove: 6 }
    );

    magentoPageBuilderProducts.insertAfterSource(`total_count`, ``, {
        remove: 228
    });
    magentoPageBuilderProducts.insertAfterSource(
        `responsive: [`,
        `
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: carouselSmallCenterMode,
                        ...(carouselSmallCenterMode && { centerPadding }),
                        ...{
                            infinite: items.length > 1 && infinite
                        }
                    }
                },`
    );

    magentoPageBuilderProducts
        .insertBeforeSource(
            `url_keys: urlKeys`,
            `product_skus: props.productSkus`,
            {
                remove: 17
            }
        )
        .insertBeforeSource(`$url_keys: [String]`, `$product_skus: [String]`, {
            remove: 19
        })
        .insertBeforeSource(
            `{ url_key: { in: $url_keys } }`,
            `{ sku: { in: $product_skus } }`,
            {
                remove: 30
            }
        )
        .insertBeforeSource(`set(product.url_key`, `set(product.sku`, {
            remove: 19
        })
        .insertBeforeSource(
            `restoreSortOrder(urlKeys`,
            `restoreSortOrder(props.productSkus`,
            { remove: 24 }
        );
};
