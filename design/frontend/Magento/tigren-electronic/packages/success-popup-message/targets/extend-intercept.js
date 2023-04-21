const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

const isBundleModuleAvailable = isModuleAvailable(
    `@tigrensolutions/bundle-product`
);
const isQuickViewModuleAvailable = isModuleAvailable(
    `@tigrensolutions/quick-view`
);
const isProductSwatchesModuleAvailable = isModuleAvailable(
    `@tigrensolutions/product-swatches`
);

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    // Add success popup context provider
    const targetables = Targetables.using(targets);

    if (isModuleAvailable(`@tigrensolutions/core`)) {
        // Add context
        const ContextProviderVenia = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/contextProvider.js'
        );
        const SuccessPopupProviderVenia = ContextProviderVenia.addImport(
            "SuccessPopupProvider from '@tigrensolutions/success-popup-message/src/context.js'"
        );
        ContextProviderVenia.insertBeforeSource(
            'const ContextProvider = ({ children }) => {',
            `contextProviders.push(${SuccessPopupProviderVenia});\n`
        );
        // Add success popup Modal to App
        const AppComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        const SuccessPopupComponent = AppComponent.addImport(
            `SuccessPopup from '@tigrensolutions/success-popup-message/src/components/successPopup.js'`
        );
        AppComponent.insertBeforeSource(
            '<Navigation />',
            `<Suspense fallback={null}>
            <${SuccessPopupComponent} />
        </Suspense>`
        );
        const useProductFullDetail = targetables.esModule(
            '@tigrensolutions/core/src/talons/ProductFullDetail/useProductFullDetail.js'
        );
        useProductFullDetail.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useProductFullDetail
            .insertBeforeSource(
                `const showSuccessMessage = useCallback(() => {`,

                `const { toggleSuccessPopup } = useSuccessPopupContext();`
            )
            .insertAfterSource(
                `name: product.name
            }
        );`,

                'toggleSuccessPopup(product);',

                { remove: 105 }
            );

        const useAddToCartButtonTalons = targetables.esModule(
            `@tigrensolutions/core/src/talons/Gallery/useAddToCartButton.js`
        );

        useAddToCartButtonTalons.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );

        useAddToCartButtonTalons
            .insertAfterSource(
                `} = props;`,
                `const { toggleSuccessPopup } = useSuccessPopupContext();`
            )
            .insertAfterSource(
                `sku: item.sku
                        }
                    }
                });`,
                `toggleSuccessPopup(item);`
            );

        // Add success popup Modal to Wishlist Page
        const useWishlistItem = targetables.esModule(
            `@tigrensolutions/core/src/talons/WishlistPage/useWishlistItem.js`
        );
        useWishlistItem.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useWishlistItem
            .insertAfterSource(
                `} = props;`,
                `

    const { toggleSuccessPopup } = useSuccessPopupContext();

    `
            )
            .insertAfterSource(
                `await addWishlistItemToCart();`,
                `toggleSuccessPopup(product)`
            );

        const useSuccessPopup = targetables.esModule(
            `@tigrensolutions/success-popup-message/src/talons/useSuccessPopup.js`
        );
        useSuccessPopup.insertAfterSource(`history.push('/`, `checkout/`);
    }

    if (isBundleModuleAvailable) {
        //show success popup instead of message when add to cart success
        const useProductBundleForm = targetables.reactComponent(
            `@tigrensolutions/bundle-product/src/talons/useProductBundleForm.js`
        );
        useProductBundleForm.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useProductBundleForm
            .insertAfterSource(
                `const { product } = props;`,

                `const { toggleSuccessPopup } = useSuccessPopupContext();`
            )
            .insertAfterSource(
                `customizeOptions: customizeOptionsValue
                    }
                });`,

                `toggleSuccessPopup(product);`
            )
            .insertAfterSource(
                `name: product.name
                    }
                );`,

                '',

                { remove: 145 }
            );
    }
    if (isQuickViewModuleAvailable) {
        const useQuickViewTalon = targetables.esModule(
            `@tigrensolutions/quick-view/src/talons/QuickViewModal/useQuickView.js`
        );
        useQuickViewTalon.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useQuickViewTalon.insertAfterSource(
            `const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);`,
            `const { toggleSuccessPopup } = useSuccessPopupContext();`
        );
        useQuickViewTalon.insertAfterSource(
            `if (!errors.length) {
                    `,
            `toggleSuccessPopup(product);`,
            { remove: 143 }
        );
    }
    if (isProductSwatchesModuleAvailable) {
        const useProductSwatchesTalon = targetables.esModule(
            `@tigrensolutions/product-swatches/src/talons/ProductSwatches/useProductSwatches.js`
        );
        useProductSwatchesTalon.addImport(
            `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
        );
        useProductSwatchesTalon
            .insertAfterSource(
                `const { product } = props;`,
                `const { toggleSuccessPopup } = useSuccessPopupContext();`
            )
            .insertBeforeSource(
                `addToast({
                        type: 'info',
                        message,
                        timeout: 7000
                    });`,
                ``,
                { remove: 143 }
            )
            .insertAfterSource(
                `if (!errors.length) {`,
                `
                    toggleSuccessPopup(product);
                    `
            );
    }
    // Add context
    const ContextProviderVenia = targetables.reactComponent(
        `@magento/venia-ui/lib/components/App/contextProvider.js`
    );

    const SuccessPopupProviderVenia = ContextProviderVenia.addImport(
        `SuccessPopupProvider from '@tigrensolutions/success-popup-message/src/context.js'`
    );
    ContextProviderVenia.insertBeforeSource(
        `const ContextProvider = ({ children }) => {`,
        `contextProviders.push(${SuccessPopupProviderVenia});\n`
    );
    // Add success popup Modal to App
    const AppComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/components/App/app.js`
    );
    const SuccessPopupComponent = AppComponent.addImport(
        `SuccessPopup from '@tigrensolutions/success-popup-message/src/components/successPopup.js'`
    );
    AppComponent.insertBeforeSource(
        `<Navigation />`,
        `<Suspense fallback={null}>
            <${SuccessPopupComponent} />
        </Suspense>`
    );
    const useProductFullDetail = targetables.esModule(
        `@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js`
    );
    useProductFullDetail.addImport(
        `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
    );

    useProductFullDetail.insertAfterSource(
        `, [attributeIdToValuesMap, optionSelections]);`,
        `
    const { toggleSuccessPopup } = useSuccessPopupContext();

    `
    );
    useProductFullDetail.insertAfterSource(
        `await addSimpleProductToCart({
                                variables
                            });`,
        `
        toggleSuccessPopup(product);`
    );
    useProductFullDetail.insertAfterSource(
        `await addConfigurableProductToCart({
                                variables
                            });`,
        `
        toggleSuccessPopup(product);`
    );

    const useAddToCartButtonTalons = targetables.esModule(
        `@magento/peregrine/lib/talons/Gallery/useAddToCartButton.js`
    );

    useAddToCartButtonTalons.addImport(
        `{ useSuccessPopupContext } from '@tigrensolutions/success-popup-message/src/context'`
    );

    useAddToCartButtonTalons
        .insertAfterSource(
            `const { item, urlSuffix } = props;`,
            `const { toggleSuccessPopup } = useSuccessPopupContext();`
        )
        .insertAfterSource(
            `sku: item.sku
                        }
                    }
                });`,
            `toggleSuccessPopup(item);`
        );
};
