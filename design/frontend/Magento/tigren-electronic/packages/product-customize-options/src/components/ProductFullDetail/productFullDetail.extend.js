module.exports = (targetables, targetablePath) => {
    const productFullDetail = targetables.reactComponent(targetablePath);

    productFullDetail.addImport(
        `mergeOperations from '@magento/peregrine/lib/util/shallowMerge';`
    );

    productFullDetail.addImport(
        `defaultOperations from '@magento/peregrine/lib/talons/ProductFullDetail/productFullDetail.gql.ce.js';`
    );

    productFullDetail.addImport(
        `{ fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';`
    );

    productFullDetail.addImport(
        `Image from '@magento/venia-ui/lib/components/Image';`
    );
    productFullDetail.insertBeforeSource(
        `breadcrumbCategoryId,`,
        `
        selectedVariant,`
    );

    productFullDetail.insertAfterSource(
        "import defaultClasses from './productFullDetail.module.css';",
        `
const CustomizeOptions = React.lazy(() =>
    import('@tigrensolutions/product-customize-options/src/components/ProductCustomizeOptions')
);`
    );

    productFullDetail.insertAfterSource(
        'const { product } = props;',
        `
    const operations = mergeOperations(defaultOperations, props.operations);
    const { addSimpleProductToCartMutation, addConfigurableProductToCartMutation } = operations;`
    );

    productFullDetail.insertAfterSource(
        'const talonProps = useProductFullDetail({ product',
        `,
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation`
    );

    productFullDetail.insertAfterSource(
        `productDetails,
        customAttributes,`,
        `
        customizeOptions,
        handleCustomizeOptionChange,`
    );

    productFullDetail.insertBeforeSource(
        'const options = isProductConfigurable(product) ? (',
        `const maybeCustomizeOptions =
        product && product.options && product.type_id !== 'bundle'? (
            <Suspense fallback={fullPageLoadingIndicator}>
                <CustomizeOptions
                    isProduct={true}
                    product={product}
                    options={product.options}
                    onOptionChange={handleCustomizeOptionChange}
                />
            </Suspense>
        ) : null;`
    );

    productFullDetail.insertAfterSource(
        `currencyCode={productDetails.price.currency}`,
        `
        customizeOptions={customizeOptions}`
    );

    productFullDetail.insertAfterSource(
        '<section className={classes.options}>{options}',
        `{maybeCustomizeOptions}`
    );
};
