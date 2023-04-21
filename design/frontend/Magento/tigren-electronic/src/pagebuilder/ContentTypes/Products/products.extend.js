module.exports = targetables => {
    const productsComponent = targetables.reactComponent(
        '@magento/pagebuilder/lib/ContentTypes/Products/products.js'
    );
    productsComponent
        .insertBeforeSource(
            `const Products =`,
            `
            const getRows = (cssClasses = '') => {
        let rows = 1;
        const regex = /rows_(\\d*)/gm;
        const str = cssClasses && cssClasses.join(' ');
        if (str && regex) {
            const str_pos = regex.exec(str);
            if (str_pos) {
                const countRows = str_pos && str_pos[1];
                rows = Number(countRows);
            }
        }
        return rows;
    };
            `
        )
        .insertBeforeSource(
            `const items = `,
            `const rows = getRows(cssClasses);`
        )
        .insertBeforeSource(
            `responsive: [`,
            `
                rows: rows,
            `
        )
        .insertBeforeSource(
            `slidesToShow: 1,
                        slidesToScroll: 1,`,
            `
            rows: 1,
            `
        )
        .insertBeforeSource(
            `slidesToShow: carouselSmallCenterMode`,
            `
            rows: 1,
            `
        )
        .insertAfterSource(
            `slidesToShow: slidesToShowSmall + 1,`,
            `
            rows: 1,
            `
        )
        .insertBeforeSource(
            `name
                price_range {`,
            `
        rating_summary
        review_count
        `
        );

    productsComponent.insertBeforeSource(
        `name
                price_range {`,
        `
        rating_summary
        review_count
        `
    );
};
