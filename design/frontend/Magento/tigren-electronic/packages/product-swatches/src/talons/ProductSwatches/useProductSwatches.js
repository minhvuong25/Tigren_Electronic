import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import { useIntl } from 'react-intl';

// TODO: This project using @tigren/quick-view to show add to cart popup.

import { useProductSwatchContext } from '@tigrensolutions/product-swatches/src/context';

import { deriveSelectedOptions } from '@tigrensolutions/product-swatches/src/util/deriveSelectedOptions';
import { deriveSelectedOptionsInputs } from '@tigrensolutions/product-swatches/src/util/deriveSelectedOptionsInputs';
import { findMatchingVariant } from '@tigrensolutions/product-swatches/src/util/findMatchingVariant';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import { isProductConfigurable } from '@tigrensolutions/base/src/util/isProductConfigurable';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import defaultOperations from '@magento/peregrine/lib/talons/ProductFullDetail/productFullDetail.gql.ce';

export const useProductSwatches = (props = {}) => {
    const { product } = props;
    const options = (product && product.configurable_options) || [];

    const operations = mergeOperations(defaultOperations, props.operations);
    const [
        addProductToCart,
        { error: errorAddingProductToCart, loading: isAddProductLoading }
    ] = useMutation(operations.addProductToCartMutation);

    const { filterState } = useProductSwatchContext();
    const [{ cartId }] = useCartContext();
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const [isDisabledAddToCart, setIsDisabledAddToCart] = useState(false);

    const isInCategoryPage = !!filterState;

    const initialSelectedOptions = useMemo(() => {
        if (isInCategoryPage) {
            return deriveSelectedOptions(filterState, options);
        } else {
            return new Map();
        }
    }, [filterState, product, isInCategoryPage]);

    const [selectedOptions, setSelectedOptions] = useState(
        initialSelectedOptions
    );
    const [quantity, setQuantity] = useState(1);

    // Auto change selected options when changing value of filters.
    useEffect(() => {
        setSelectedOptions(initialSelectedOptions);
    }, [initialSelectedOptions]);

    // Show error when add to cart is get trouble
    useEffect(() => {
        const errorMessage = deriveErrorMessage([errorAddingProductToCart]);
        if (errorMessage && errorMessage !== '') {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'productSwatches.addToCartError',
                    defaultMessage: errorMessage
                }),
                timeout: 7000
            });
        }
    }, [errorAddingProductToCart, addToast]);

    const selectedVariant = useMemo(() => {
        const selectedOptionsInputs = deriveSelectedOptionsInputs(
            selectedOptions,
            options
        );
        const variants = (product && product.variants) || [];
        return findMatchingVariant(selectedOptionsInputs, variants);
    }, [selectedOptions, product, options]);

    const inStockVariants = useMemo(() => {
        if (!product.variants) {
            return [];
        }

        return product.variants.filter(
            variant =>
                variant.product && variant.product.stock_status === 'IN_STOCK'
        );
    }, [product]);

    const isOutOfStock = useMemo(() => {
        const OUT_OF_STOCK = 'OUT_OF_STOCK';

        const selectedItemStatus =
            selectedVariant?.product?.stock_status === OUT_OF_STOCK;

        return selectedItemStatus || product.stock_status === OUT_OF_STOCK;
    }, [selectedVariant, selectedOptions, product]);

    const smallImage = useMemo(() => {
        return (
            selectedVariant &&
            selectedVariant.product &&
            selectedVariant.product.small_image &&
            selectedVariant.product.small_image &&
            selectedVariant.product.small_image.url
        );
    }, [selectedVariant]);

    const handleChangeOption = useCallback(
        (attributeCode, values) => {
            setSelectedOptions(prev => {
                prev.set(attributeCode, new Set(values));
                return new Map(prev);
            });
        },
        [setSelectedOptions, selectedOptions]
    );

    const handleChangeQuantity = useCallback(
        value => {
            if (!value || value === '') {
                setIsDisabledAddToCart(true);
            } else {
                setIsDisabledAddToCart(false);
            }
            setQuantity(value);
        },
        [setQuantity, setIsDisabledAddToCart]
    );

    const isMissingOptions = (product = {}, selectedOptions) => {
        // Only check missing options with config product
        if (!isProductConfigurable(product)) {
            return false;
        }

        const options = (product && product.configurable_options) || [];
        return options.length > selectedOptions.size;
    };

    const showErrorMessage = useCallback(
        message => {
            addToast({
                type: 'error',
                message,
                timeout: 4000
            });
        },
        [addToast, formatMessage, product]
    );

    const handleAddToCart = useCallback(
        async (formValues = {}) => {
            const variables = {
                cartId,
                product: {
                    sku: product.sku,
                    quantity: formValues.quantity || quantity
                },
                entered_options: [
                    {
                        uid: product.uid,
                        value: product.name
                    }
                ]
            };

            if (selectedOptions.size > 0) {
                variables.product.selected_options = deriveSelectedOptionsInputs(
                    selectedOptions,
                    options
                );
            }

            try {
                const res = await addProductToCart({ variables });

                const message = formatMessage(
                    {
                        id: 'productFullDetail.addToCartSuccess',
                        defaultMessage: 'You added {name} to cart'
                    },
                    {
                        name: product.name
                    }
                );

                const errors = res.data.addProductsToCart.user_errors;

                if (!errors.length) {
                    addToast({
                        type: 'info',
                        message,
                        timeout: 7000
                    });
                } else {
                    const error = errors[0];
                    showErrorMessage(error.message);
                }
            } catch {
                return false;
            }
        },
        [quantity, selectedOptions, product, cartId, addToast, formatMessage]
    );

    return {
        isAddProductLoading,
        isOutOfStock,
        isInCategoryPage,
        inStockVariants,
        isDisabledAddToCart,
        selectedOptions,
        selectedVariant,
        product,
        smallImage,
        handleChangeOption,
        handleChangeQuantity,
        handleAddToCart
    };
};
