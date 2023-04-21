module.exports = (targetables, targetablePath) => {
    const product = targetables.reactComponent(targetablePath);

    product.insertAfterSource(
        `urlKey,
        urlSuffix`,
        `,
        finalValue,
        productType,
        sku,
        configurableCustomizable,
        simpleCustomizable`
    );

    product.insertAfterSource(
        'options={options}',
        `
        configurableCustomizable={configurableCustomizable}
        simpleCustomizable={simpleCustomizable}`
    );
};
