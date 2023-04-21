module.exports = targetables => {
    const productReviewsComponent = targetables.reactComponent(
        '@tigrensolutions/product-reviews/src/components/productReviews.js'
    );
    productReviewsComponent.addImport(
        `extendsClasses from 'extend/tigren/product-reviews/src/components/ProductReviews/productReviews.module.css'`
    );
    productReviewsComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
    const reviewsComponent = targetables.reactComponent(
        '@tigrensolutions/product-reviews/src/components/review.js'
    );
    reviewsComponent.addImport(
        `extendsClasses from 'extend/tigren/product-reviews/src/components/ProductReviews/productReviews.module.css'`
    );
    reviewsComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
    const reviewPageComponent = targetables.reactComponent(
        '@tigrensolutions/product-reviews/src/components/ReviewPage/reviews.js'
    );
    reviewPageComponent.addImport(
        `extendsClasses from 'extend/tigren/product-reviews/src/components/ReviewPage/reviews.module.css'`
    );
    reviewPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
};
