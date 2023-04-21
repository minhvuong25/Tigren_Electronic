const isModuleAvailable = require(`@tigrensolutions/base/helpers/isModuleAvailable`);
const { Targetables } = require(`@magento/pwa-buildpack`);

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    if (isModuleAvailable(`@amasty/advanced-reviews`)) {
        return false;
    }

    // Add RatingLoginComponent to the app component
    const AppComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/App/app.js`
    );

    AppComponent.insertAfterSource(
        `import Icon from '../Icon';`,
        `
const RatingLoginComponent = React.lazy(() =>
    import('@tigrensolutions/product-reviews/src/components/RatingLogin')
);`
    );

    AppComponent.insertBeforeSource(
        `<Navigation />`,
        `<Suspense fallback={null}>
            <RatingLoginComponent />
        </Suspense>`
    );

    //Modify use product full detail
    const useproductFullDetail = targetables.reactComponent(
        `@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js`
    );

    useproductFullDetail.insertAfterSource(
        `// Normalization object for product details we need for rendering.`,
        `

    const rating = useMemo(() => {
        return {
            summary: product.rating_summary || 0,
            count: product.review_count || 0
        };
    }, [product]);

    `
    );

    useproductFullDetail.insertAfterSource(
        `const productDetails = {`,
        `
        rating,
        `
    );

    // Modify product full detail component
    const productFullDetailComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`
    );

    // Normalization object for product details we need for rendering.
    productFullDetailComponent.addImport(`{useRef} from 'react'`);

    productFullDetailComponent.insertAfterSource(
        `const { formatMessage } = useIntl();`,
        `

    const reviewRef = useRef();

    `
    );

    productFullDetailComponent.addImport(
        `Rating from '@tigrensolutions/product-reviews/src/components/Rating'`
    );

    productFullDetailComponent.insertBeforeSource(
        `<section className={classes.imageCarousel}>`,
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
    const ProductReviews = productFullDetailComponent.addImport(
        `ProductReviews from '@tigrensolutions/product-reviews/src/components/productReviews'`
    );

    productFullDetailComponent.insertAfterSource(
        '</Form>',
        `
        <${ProductReviews} product={product} reviewRef={reviewRef}/>`
    );

    // Modify product detail fragment request
    const productDetailFragment = targetables.esModule(
        `@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql.js`
    );

    productDetailFragment.insertAfterSource(
        `meta_description`,
        `
                rating_summary
                review_count
                reviews {
                    items {
                        summary
                        text
                        nickname
                        created_at
                        average_rating
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }`
    );

    // Modify my account component
    const myAccountComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/MyAccount/myAccount.js`
    );

    myAccountComponent.addImport(
        `ReviewPage from '@tigrensolutions/product-reviews/src/components/ReviewPage'`
    );

    myAccountComponent.addImport(
        `ReviewDetail from '@tigrensolutions/product-reviews/src/components/ReviewPage/ReviewDetail'`
    );

    const useAccountMenuItems = targetables.reactComponent(
        `@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems.js`
    );

    useAccountMenuItems.insertAfterSource(
        `url: '/account-information'
        }`,
        `,
        {
            name: 'Product Review',
            id: 'accountMenu.productReview',
            url: '/review/customer'
        }
    `
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        // Add RatingLoginComponent to the app component
        const AppComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        AppComponent.insertBeforeSource(
            `const App = props => {`,
            `const RatingLogin = React.lazy(() =>
    import('@tigrensolutions/product-reviews/src/components/RatingLogin')
);

`
        );
        AppComponent.insertBeforeSource(
            '<Navigation />',
            `<Suspense fallback={null}>
            <RatingLogin />
        </Suspense>`
        );

        // Modify product full detail component
        const productFullDetailComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.js'
        );

        productFullDetailComponent.addImport("{useRef} from 'react'");

        productFullDetailComponent.insertAfterSource(
            'const { formatMessage } = useIntl();',
            '\nconst reviewRef = useRef();'
        );

        productFullDetailComponent.addImport(
            `Rating from '@tigrensolutions/product-reviews/src/components/Rating'`
        );
        productFullDetailComponent.insertBeforeSource(
            `{productDetails.shortDescription && (`,
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
        productFullDetailComponent.addImport(
            "ProductReviews from '@tigrensolutions/product-reviews/src/components/productReviews'"
        );
        productFullDetailComponent.insertBeforeSource(
            `const cartActionContent = isSupportedProductType ? (`,
            `
    const productReviews = useMemo(() => {
        return <ProductReviews product={product} reviewRef={reviewRef} />;
    }, []);
`
        );
        productFullDetailComponent.insertAfterSource(
            `<div className={classes.specifications}>
                        <ProductAttributes
                            attributes={productDetails.attributes}
                        />
                    </div>`,
            `{productReviews}`
        );

        // Modify product detail fragment request
        const productDetailFragment = targetables.esModule(
            '@tigrensolutions/core/src/talons/RootComponents/Product/productDetailFragment.gql.js'
        );
        productDetailFragment.insertAfterSource(
            `meta_description`,
            `
                rating_summary
                review_count
                reviews {
                    items {
                        summary
                        text
                        nickname
                        created_at
                        average_rating
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }`
        );

        // Modify my account component
        const myAccountComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/MyAccount/myAccount.js'
        );
        myAccountComponent.addImport(
            `ReviewPage from '@tigrensolutions/product-reviews/src/components/ReviewPage'`
        );
        myAccountComponent.addImport(
            `ReviewDetail from '@tigrensolutions/product-reviews/src/components/ReviewPage/ReviewDetail'`
        );
        myAccountComponent.insertBeforeSource(
            `{
            path: '/customer/account/logout'`,
            `{
            path: '/review/customer',
            component: <ReviewPage />,
            label: formatMessage({
                id: 'accountSetting.myReview',
                defaultMessage: 'My Product Reviews'
            }),
            related_path: '/review/customer/view/review_id/',
            related_component: <ReviewDetail />
        },
        `
        );
    }
};
