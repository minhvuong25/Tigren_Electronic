import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './productDetail.gql';

import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { getIsMissingOptions } from '@tigrensolutions/quick-view/src/utils/getIsMissingOptions';
import { getMediaGalleryEntries } from '@tigrensolutions/quick-view/src/utils/getMediaGalleryEntries';
import { getSelectedOptionArray } from '@tigrensolutions/quick-view/src/utils/getSelectedOptionArray';

const INITIAL_OPTION_CODES = new Map();
const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';

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
    } of product.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }
    return initialOptionCodes;
};

const getAttribute = (attributeCode = '', attributes = []) => {
    return attributes.find(attribute => attribute.code === attributeCode);
};

const getIsOutOfStock = (product = {}, optionCodes, optionSelections) => {
    const { stock_status, variants } = product;
    const isConfigurable = isProductConfigurable(product);
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (isConfigurable && optionsSelected) {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        return (
            (item && item.product && item.product.stock_status) ===
            OUT_OF_STOCK_CODE
        );
    }
    return stock_status === OUT_OF_STOCK_CODE;
};

export const useQuickView = props => {
    const { sku, showQuickView } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const { getProductDetailQuery, addProductToCartMutation } = operations;

    const [{ cartId }] = useCartContext();
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    const [
        addProductToCart,
        { error: errorAddingProductToCart, loading: isAddProductLoading }
    ] = useMutation(addProductToCartMutation);

    const { data, error, loading } = useQuery(getProductDetailQuery, {
        skip: !sku,
        variables: {
            sku
        }
    });

    const product = !loading && !error && data ? data?.products?.items?.[0] : {};

    const rating = useMemo(() => {
        return {
            summary: product?.rating_summary || 0,
            count: product?.review_count || 0
        };
    }, [product]);

    const derivedOptionCodes = useMemo(() => {
        if (product) {
            return deriveOptionCodesFromProduct(product);
        }
        return INITIAL_OPTION_CODES;
    }, [product]);

    const [optionCodes] = useState(derivedOptionCodes);
    const [quantity, setQuantity] = useState(1);
    const [optionSelections, setOptionSelections] = useState(new Map());

    const configurableOptionCodes = useMemo(() => {
        const optionCodeMap = new Map();

        if (product && product.configurable_options) {
            product.configurable_options.forEach(option => {
                optionCodeMap.set(option.attribute_id, option.attribute_code);
            });
        }

        return optionCodeMap;
    }, [product]);

    const selectedVariant = useMemo(() => {
        if (
            optionSelections.size &&
            product &&
            isProductConfigurable(product)
        ) {
            const mergedOptionSelections = new Map([...optionSelections]);
            (product.configurable_options || []).forEach(option => {
                if (!mergedOptionSelections.has(`${option.id}`)) {
                    mergedOptionSelections.set(`${option.id}`, option.value_id);
                }
            });

            return findMatchingVariant({
                variants: product?.variants,
                optionCodes: configurableOptionCodes,
                optionSelections: mergedOptionSelections
            });
        }
        return undefined;
    }, [product, configurableOptionCodes, optionSelections]);

    const inStockVariants = useMemo(() => {
        if (!product?.variants) {
            return [];
        }
        return product?.variants.filter(
            variant =>
                variant?.product && variant?.product.stock_status === 'IN_STOCK'
        );
    }, [product]);

    const mediaGalleryEntries = useMemo(() => {
        return product
            ? getMediaGalleryEntries(product, optionCodes, optionSelections)
            : [];
    }, [product, optionCodes, optionSelections]);

    // Normalization object for product details we need for rendering.
    const productDetails = {
        shortDescription:
            product?.short_description && product?.short_description.html,
        description: product?.description,
        name: product?.name,
        sku: product?.sku,
        attributes: product?.attributes,
        rating,
        brand: getAttribute('brand', product?.attributes),
        tierPrices:
            (selectedVariant &&
                selectedVariant?.product &&
                selectedVariant?.product?.product_tier_prices) ||
            product?.product_tier_prices
    };

    // Show error when add to cart is get trouble
    useEffect(() => {
        const errorMessage = deriveErrorMessage([errorAddingProductToCart]);
        if (errorMessage && errorMessage !== '') {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'productSwatches.addToCart',
                    defaultMessage: errorMessage
                }),
                timeout: 7000
            });
        }
    }, [errorAddingProductToCart, addToast]);

    const handleClose = useCallback(() => {
        showQuickView(null);
        document.documentElement.dataset.scrollLock = false;
    }, [showQuickView]);

    const onChangeQuantity = useCallback(
        value => {
            setQuantity(value);
        },
        [setQuantity]
    );

    const handleOptionSelection = useCallback(
        (optionId, selection) => {
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [product, optionSelections]
    );

    const handleSubmit = useCallback(
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

            if (isProductConfigurable(product)) {
                variables.product.selected_options = getSelectedOptionArray(
                    optionSelections
                );
            }

            try {
                const res = await addProductToCart({
                    variables
                });

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
                    addToast({
                        type: 'error',
                        message: error.message,
                        timeout: 7000
                    });
                }

                handleClose();
            } catch (e) {
                console.log(e);
            }
        },
        [
            cartId,
            product,
            handleClose,
            optionSelections.size,
            selectedVariant,
            quantity
        ]
    );

    const errors = useMemo(() => new Map([]), []);

    const isMissingOptions = getIsMissingOptions(product, optionSelections);
    const isOutOfStock = getIsOutOfStock(
        product,
        optionCodes,
        optionSelections
    );

    return {
        product,
        selectedVariant,
        errors,
        handleOptionSelection,
        inStockVariants,
        optionSelections,
        optionCodes,
        mediaGalleryEntries,
        handleSubmit,
        onChangeQuantity,
        isLoading: loading,
        isDisabledAddToCart:
            isOutOfStock || isMissingOptions || isAddProductLoading,
        isDialogOpen: sku !== null,
        isOutOfStock,
        productDetails,
        handleClose
    };
};
