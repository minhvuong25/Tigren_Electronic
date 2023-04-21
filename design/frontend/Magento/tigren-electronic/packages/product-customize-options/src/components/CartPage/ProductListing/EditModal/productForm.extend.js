module.exports = (targetables, targetablePath) => {
    const productForm = targetables.reactComponent(targetablePath);
    productForm.addImport(
        `CustomizeOptions from '@tigrensolutions/product-customize-options/src/components/ProductCustomizeOptions'`
    );
    productForm.addImport(
        `{ fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator'`
    );
    productForm.addImport(
        `{ useProductCustomizeOptions } from '@tigrensolutions/product-customize-options/src/hook/useProductCustomizeOptions'`
    );
    productForm
        .insertBeforeSource(` } from 'react'`, `,Suspense`)
        .insertBeforeSource(
            `} = props;`,
            `,
        addToast
    `
        )
        .insertAfterSource(
            `} = talonProps;`,
            `
    const {
        handleCustomizeOptionChange,
        handleSubmitOption,
        isMissingCustomizeOptions,
        handleOptionSelectionCustom,
        hadleSubmitUpdateConfigurableOptions
    } = useProductCustomizeOptions({
            product: cartItem?.product,
            handleClose,
            optionSelections:configItem?.configurable_options,
            cartItemId: cartItem?.uid,
            addToast
        }
    );
    `
        )
        .insertBeforeSource(
            `const message`,
            `
    const maybeCustomizeOptions =
        cartItem?.product && cartItem?.product.options && cartItem?.product?.__typename !== 'BundleProduct' ? (
            <Suspense fallback={fullPageLoadingIndicator}>
                <CustomizeOptions
                    isProduct={true}
                    product={cartItem?.product}
                    options={cartItem?.product.options}
                    onOptionChange={handleCustomizeOptionChange}
                />
            </Suspense>
        ) : null;
    `
        )
        .insertBeforeSource(
            `<h3 className={classes.quantityLabel}>`,
            `
                <section className={classes.options}>
                    {maybeCustomizeOptions}
                </section>
                `
        );
    productForm
        .setJSXProps(`Options`, {
            onSelectionChange: `{handleOptionSelectionCustom}`
        })
        .setJSXProps(`Dialog`, {
            onConfirm: `{hadleSubmitUpdateConfigurableOptions}`
        });
};
