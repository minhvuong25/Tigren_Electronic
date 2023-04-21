module.exports = targetables => {
    const galleryComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Gallery/item.js'
    );
    galleryComponent.addImport(
        `extendClasses from 'src/components/Gallery/item.module.css'`
    );
    galleryComponent.addImport(
        `Rating from '@tigrensolutions/product-reviews/src/components/Rating';`
    );
    galleryComponent.addImport(`{useRef} from 'react';`);
    galleryComponent
        .insertBeforeSource(`props.classes`, 'extendClasses, ')
        .insertBeforeSource(`{addButton}`, '', {
            remove: 11
        })
        .insertBeforeSource(`{wishlistButton}`, '{addButton}')
        .insertBeforeSource(
            `const { url: smallImageURL } = small_image;`,
            `
        const reviewRef = useRef();
        `
        )
        .insertBeforeSource(
            '<div className={`${classes.price}`}>',
            `{item?.review_count > 0 && <Rating
                        value={item?.rating_summary / 5 / 4}
                        percent={item?.rating_summary}
                        count={item?.review_count}
                        reviewRef={reviewRef}
                        classes={{
                            root: classes.star
                        }}
                    />
                    }`
        )
        .insertBeforeSource(
            `<div className={classes.bottom}>`,
            `<div className={classes.sku}>
                    <FormattedMessage
                            id={'productFullDetail.sku'}
                            defaultMessage={'SKU'}
                        />
                        {': '}
                        <span>{item.sku}</span>
                </div>`
        );
};
