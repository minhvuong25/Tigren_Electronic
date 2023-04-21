module.exports = targetables => {
    const productPriceComponent = targetables.reactComponent(
        '@tigrensolutions/base/src/components/ProductPrice/productPrice.js'
    );
    productPriceComponent.addImport(
        `extendsClasses from 'extend/tigren/base/src/components/ProductPrice/productPrice.module.css'`
    );
    productPriceComponent
        .insertAfterSource(
            `useStyle(defaultClasses, props.classes`,
            `, extendsClasses`
        )
        .insertBeforeSource(
            `<div key={index}>`,
            `<div key={index} className={classes.priceContainer}>`,
            {
                remove: 17
            }
        )
        .insertBeforeSource(
            `<div key={index}>`,
            `<div key={index} className={classes.priceContainer}>`,
            {
                remove: 17
            }
        );
    const regularPriceComponent = targetables.reactComponent(
        '@tigrensolutions/base/src/components/ProductPrice/regularPrice.js'
    );
    regularPriceComponent.addImport(
        `extendsClasses from 'extend/tigren/base/src/components/ProductPrice/productPrice.module.css'`
    );
    regularPriceComponent
        .insertAfterSource(`useStyle(props.classes`, `, extendsClasses`)
        .insertBeforeSource(
            `const classes =`,
            `
        let sale = Math.round((regularValue - finalValue) * 100 / regularValue);
        `
        )
        .insertAfterSource(
            `<div className={classes.oldPrice}>
                        <Price
                            value={regularValue}
                            currencyCode={currency || 'USD'}
                        />
                    </div>`,
            `<div className={classes.salePercent}>
                        <span>
                            <FormattedMessage
                                id={'productPrice.sale'}
                                defaultMessage={'-{sale}%'}
                                values={{ sale }}
                            />
                        </span>
                    </div>`
        );
};
