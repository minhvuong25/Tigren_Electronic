module.exports = (targetables, targetablePath) => {
    const useProductFullDetail = targetables.reactComponent(targetablePath);
    useProductFullDetail.addImport(
        `{ appendCustomizeOptionsToPayload } from '@tigrensolutions/product-customize-options/src/util/appendCustomizeOptionsToPayload';`
    );

    useProductFullDetail
        .insertBeforeSource(
            '// Use the proper mutation for the type.',
            `
                    appendCustomizeOptionsToPayload(
                        variables,
                        customizeOptions
                    );
    `
        )
        .insertAfterSource(
            'const handleAddToCart = useCallback(',
            `
        async (formValues, customizeOptions) => {`,
            { remove: 30 }
        );

    useProductFullDetail.insertBeforeSource(
        'isOutOfStock,',
        `
        options: product.options,
    `
    );
};
