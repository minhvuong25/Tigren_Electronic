module.exports = targetables => {
    const productFullDetailComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
    );
    productFullDetailComponent.addImport(
        `extendClasses from 'src/components/ProductFullDetail/productFullDetail.module.css'`
    );
    productFullDetailComponent.addImport(
        `{ useHistory } from 'react-router-dom';`
    );
    productFullDetailComponent.addImport(
        `{ Tabs as TabWrapper } from 'react-tabs';`
    );
    productFullDetailComponent.addImport(
        `{ Tab as TabHeader } from 'react-tabs';`
    );
    productFullDetailComponent.addImport(`{ TabList } from 'react-tabs';`);
    productFullDetailComponent.addImport(`{ TabPanel } from 'react-tabs';`);
    productFullDetailComponent.addImport(`reactTabsCss from 'react-tabs/style/react-tabs.css'`);
    productFullDetailComponent.addImport(`{ useEffect } from 'react';`);
    productFullDetailComponent
        .insertAfterSource(`defaultClasses, props.classes`, `, extendClasses`)
        .insertBeforeSource(
            `{addToCartMessage}`,
            `<span className={classes.icon} />`
        )
        .insertBeforeSource(
            `<AddToCompareButton product={product} classes={classes} isProductDetail={true}/>`,
            ``,
            { remove: 80 }
        )
        .insertBeforeSource(
            `<section className={classes.options}>{options}`,
            `<section className={classes.availability}>
                        <span className={classes.title}>Availability: </span>
                        <span className={classes.stock}>{availability}</span>
                    </section>`
        )
        .insertBeforeSource(
            `const addToCartMessage = useMemo(() => {`,
            `
        const history = useHistory();
        const availability = useMemo(() => {
        if (isOutOfStock) {
            return (
                <FormattedMessage
                    id="productFullDetail.itemOutOfStock"
                    defaultMessage="Out of Stock"
                />
            );
        }

        return (
            <FormattedMessage
                id="productFullDetail.inStock"
                defaultMessage="In stock"
            />
        );
    }, [productDetails, isOutOfStock]);`
        )
        .insertBeforeSource(
            `const addToCartMessage = useMemo(() => {`,
            `
            useEffect(() => {
                document.documentElement.setAttribute(
                    'data-page',
                    'product-detail'
                );
            }, [productDetails]);
    `
        )
        .insertBeforeSource(
            `<section className={classes.quantity}>`,
            `<section className={classes.group}>`
        )
        .insertAfterSource(`{cartActionContent}`, `</section>`)
        .insertAfterSource(
            `<WishlistButton {...wishlistButtonProps} />`,
            `<AddToCompareButton product={product} classes={classes} isProductDetail={false}/>`
        )
        .insertAfterSource(
            `</Form>`,
            `
        <TabWrapper>
            <TabList>
              <TabHeader>
                  <h3 className={classes.headingTab}>
                    <FormattedMessage
                        id="productFullDetail.desc"
                        defaultMessage="Description"
                    />
                  </h3>
              </TabHeader>
              <TabHeader>
                  <h3 className={classes.headingTab}>
                    <FormattedMessage
                        id="productFullDetail.attributes"
                        defaultMessage="Specifications"
                    />
                  </h3>
              </TabHeader>
              <TabHeader>
                  <h3 className={classes.headingTab}>
                    <FormattedMessage
                        id="productFullDetail.reviewHasCount"
                        defaultMessage="Reviews ({count})"
                        values={{
                                    count: productDetails.rating.count
                                }}
                    />
                  </h3>
              </TabHeader>
            </TabList>

            <TabPanel>
              <div className={classes.description}>
                <RichContent html={productDetails.description} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={classes.specifications}>
                    <ProductAttributes
                        attributes={productDetails.attributes}
                    />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={classes.left}>
                    {productReviews}
              </div>
            </TabPanel>
        </TabWrapper>`
        )
        .insertBeforeSource(
            `const cartActionContent`,
            `const cartActionMobile = (
                        <Button  priority={'high'} onClick={() => history.push('/checkout/cart')}>
                            <span className={classes.icon} />
                        </Button>
                    );`
        )
        .insertBeforeSource(
            `<section className={classes.group}>`,
            `<section className={classes.actionsMobile}>
                    {cartActionMobile}</section>`
        )
        .insertBeforeSource(`<p className={classes.brand}>`, ``, {
            remove: 456
        })
        .insertBeforeSource(`<Rating`, ``, {
            remove: 385
        })
        .insertAfterSource(
            `<span>{productDetails.sku}</span>
                    </p>`,
            `
            <Rating
                        value={productDetails?.rating?.summary / 5 / 4}
                        percent={productDetails?.rating?.summary}
                        count={productDetails?.rating?.count}
                        reviewRef={reviewRef}
                        classes={{
                            root: classes.star
                        }}
                    />
                    `
        );
    productFullDetailComponent.removeJSX(`div className={classes.information}`);
};
