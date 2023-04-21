module.exports = (targetables, targetablePath) => {
    const checkoutItemReviewComponent = targetables.reactComponent(
        targetablePath
    );

    checkoutItemReviewComponent.insertAfterSource(
        `configurable_options`,
        `,
        simple_customizable,
        configurable_customizable`
    );
    checkoutItemReviewComponent.insertAfterSource(
        `<ProductOptions`,
        `
                    simpleCustomizable={simple_customizable}
                    configurableCustomizable={configurable_customizable}`
    );
};
