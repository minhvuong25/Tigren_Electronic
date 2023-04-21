import React, { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';

import { appendOptionsToPayload } from '@magento/peregrine/lib/util/appendOptionsToPayload';
import { appendCustomizeOptionsToPayload } from '@tigrensolutions/product-customize-options/src/util/appendCustomizeOptionsToPayload';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import PRODUCT_DETAIL_GQL from '@magento/peregrine/lib/talons/ProductFullDetail/productFullDetail.gql';
import UPDATE_CONFIGURABLE_OPTIONS_MUTATION from '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/productForm.gql';

// Deriving the initial codes for each customize option?.
const deriveCustomizeOptionsFromProduct = product => {
    const initialCustomizeOptions = new Map();
    if (!product?.options) return initialCustomizeOptions;
    for (const option of product?.options) {
        initialCustomizeOptions?.set(option?.option_id, undefined);
    }
    return initialCustomizeOptions;
};

const getIsMissingCustomizeOptions = (product, customizeOptions) => {
    if (!product?.options) return false;

    const requireOptions = product?.options?.filter(option => option?.required);
    if (!requireOptions?.length) return false;

    return requireOptions?.some(option => {
        if (Array?.isArray(customizeOptions?.get(option?.option_id))) {
            return !customizeOptions?.get(option?.option_id)?.length;
        }

        return !customizeOptions?.get(option?.option_id);
    });
};

const INITIAL_OPTION_CODES = new Map();

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (product && !isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = INITIAL_OPTION_CODES;
    for (const {
        attribute_id,
        attribute_code
    } of product?.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }
    return initialOptionCodes;
};

export const useProductCustomizeOptions = (props = {}) => {
    const {
        isDisabledAddToCart,
        handleSubmit,
        product,
        handleClose,
        selectedVariant,
        addToast,
        cartItemId
    } = props;
    const operations = mergeOperations(
        PRODUCT_DETAIL_GQL,
        UPDATE_CONFIGURABLE_OPTIONS_MUTATION,
        props?.operations
    );
    const {
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation,
        updateConfigurableOptionsMutation
    } = operations;

    const [
        addConfigurableProductToCart,
        {
            error: errorAddingConfigurableProduct,
            loading: isAddConfigurableLoading
        }
    ] = useMutation(
        addConfigurableProductToCartMutation ||
            operations?.addConfigurableProductToCartMutation
    );

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(
        addSimpleProductToCartMutation ||
            operations?.addSimpleProductToCartMutation
    );
    const [
        updateConfigurableOptions,
        {
            error: errorupdateConfigurable,
            loading: updateConfigurableOptionsLoading
        }
    ] = useMutation(
        updateConfigurableOptionsMutation ||
            operations?.updateConfigurableOptionsMutation
    );
    const [{ cartId }] = useCartContext();

    const derivedOptionCodes = useMemo(() => {
        if (product) {
            return deriveOptionCodesFromProduct(product);
        }
        return INITIAL_OPTION_CODES;
    }, [product]);

    const [optionCodes] = useState(derivedOptionCodes);
    const [optionSelections, setOptionSelections] = useState(new Map());
    const handleOptionSelectionCustom = useCallback(
        (optionId, selection) => {
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [product, optionSelections]
    );

    const derivedCustomizeOptions = useMemo(
        () => deriveCustomizeOptionsFromProduct(product),
        [product]
    );

    const [customizeOptions, setCustomizeOptions] = useState(
        derivedCustomizeOptions
    );

    const isMissingCustomizeOptions = useMemo(
        () => getIsMissingCustomizeOptions(product, customizeOptions),
        [product, customizeOptions]
    );

    const handleCustomizeOptionChange = useCallback(
        (optionId, optionValue) => {
            const selectedOption = product?.options?.find(
                option => option?.option_id == optionId
            );
            const type = selectedOption ? selectedOption?.__typename : null;
            // We must create a new Map here so that React knows that the value
            // of customizeOptions has changed?.
            const nextCustomizeOptions = new Map([...customizeOptions]);
            if (type == 'CustomizableCheckboxOption') {
                const current = nextCustomizeOptions?.get(optionId);
                if (!current) {
                    nextCustomizeOptions?.set(optionId, [optionValue]);
                } else {
                    if (current?.includes(optionValue)) {
                        current?.splice(current?.indexOf(optionValue), 1);
                    } else {
                        current?.push(optionValue);
                    }
                    nextCustomizeOptions?.set(
                        optionId,
                        current?.length ? current : undefined
                    );
                }
            } else {
                nextCustomizeOptions?.set(optionId, optionValue);
            }
            setCustomizeOptions(nextCustomizeOptions);
        },
        [customizeOptions, product]
    );
    const productType = product?.__typename;

    const handleSubmitOption = useCallback(
        async formValues => {
            const payload = {
                item: product,
                productType,
                quantity: formValues?.quantity || 1
            };

            if (productType === 'ConfigurableProduct') {
                appendOptionsToPayload(payload, optionSelections, optionCodes);
            }
            const variables = {
                cartId,
                parentSku: payload?.parentSku,
                product: payload?.item,
                quantity: payload?.quantity || 1,
                sku: payload?.item?.sku
            };

            appendCustomizeOptionsToPayload(variables, customizeOptions);
            try {
                if (productType === 'SimpleProduct') {
                    try {
                        await addSimpleProductToCart({
                            variables
                        });
                        handleClose();
                        return;
                    } catch (error) {
                        addToast({
                            type: 'error',
                            message: error?.message,
                            timeout: 4000
                        });
                        return;
                    }
                } else if (productType === 'ConfigurableProduct') {
                    try {
                        await addConfigurableProductToCart({
                            variables
                        });
                        handleClose();
                        return;
                    } catch (error) {
                        addToast({
                            type: 'error',
                            message: error?.message,
                            timeout: 4000
                        });
                        return;
                    }
                }
            } catch (e) {
                console?.log(e);
            }
        },
        [
            cartId,
            product,
            handleClose,
            optionSelections?.size,
            selectedVariant,
            addToast,
            customizeOptions
        ]
    );

    const hadleSubmitUpdateConfigurableOptions = useCallback(
        async formValues => {
            const payload = {
                item: product,
                productType,
                quantity: formValues?.quantity || 1
            };

            if (productType === 'ConfigurableProduct') {
                appendOptionsToPayload(payload, optionSelections, optionCodes);
            }
            const variables = {
                cartId,
                parentSku: payload?.parentSku,
                product: payload?.item,
                quantity: payload?.quantity || 1,
                cartItemId,
                variantSku: payload?.item?.sku
            };

            appendCustomizeOptionsToPayload(variables, customizeOptions);
            try {
                if (productType === 'ConfigurableProduct') {
                    try {
                        await updateConfigurableOptions({
                            variables
                        });
                        addToast({
                            type: 'success',
                            message: 'Your Item have been updated',
                            timeout: 4000
                        });
                        handleClose();
                        return;
                    } catch (error) {
                        addToast({
                            type: 'error',
                            message: error?.message,
                            timeout: 4000
                        });
                        return;
                    }
                }
            } catch (e) {
                console?.log(e);
            }
        },
        [
            cartId,
            product,
            handleClose,
            optionSelections?.size,
            selectedVariant,
            addToast,
            customizeOptions
        ]
    );
    return {
        isMissingCustomizeOptions,
        handleCustomizeOptionChange,
        handleSubmitOption,
        handleOptionSelectionCustom,
        hadleSubmitUpdateConfigurableOptions
    };
};
