import { useCallback, useState, useEffect, useMemo } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useToasts } from '@magento/peregrine';
import defaultOperations from './BundleProductForm.gql';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useIntl } from 'react-intl';

import {
    getPriceSelectedValue,
    getOptionPrice,
    getOptionPriceExclTax
} from '../util/getSelectedPrice';
import { GET_STORE_CONFIG_DATA } from '@magento/peregrine/lib/talons/Header/storeSwitcher.gql';
import { TAX_DISPLAY_TYPES } from '@tigrensolutions/base/src/talons/ProductPrice/useProductPrice.js';

const INITIAL_SUMMARY_PRICE = 0;

// Deriving the initial codes for each customize option.
const deriveCustomizeOptionsFromProduct = product => {
    const initialCustomizeOptions = new Map();
    if (!product.options) return initialCustomizeOptions;
    for (const option of product.options) {
        initialCustomizeOptions.set(option.option_id, undefined);
    }
    return initialCustomizeOptions;
};

const getCustomizeOptionValueToVariable = customizeOptions => {
    const customize = [];
    customizeOptions.forEach((value, id) => {
        if (value) {
            customize.push({
                id,
                value_string: '' + value
            });
        }
    });

    return customize;
};

const getIsMissingCustomizeOptions = (product, customizeOptions) => {
    const { options } = product;
    if (!options) return false;

    const requireOptions = options.filter(option => option.required);
    if (!requireOptions.length) return false;

    return requireOptions.some(option => {
        if (Array.isArray(customizeOptions.get(option.option_id))) {
            return !customizeOptions.get(option.option_id).length;
        }

        return !customizeOptions.get(option.option_id);
    });
};

export const useProductBundleForm = props => {
    const { product } = props;
    const { items, dynamic_price, base_price, base_price_excl_tax } = product;

    const operations = mergeOperations(defaultOperations, props.operations);
    const { addBundleProductsToCartMutation } = operations;

    const [{ cartId }] = useCartContext();
    const apolloClient = useApolloClient();
    const dataStoreConfig = apolloClient.readQuery({
        query: GET_STORE_CONFIG_DATA
    });

    const taxDisplayType = dataStoreConfig?.storeConfig?.tax_display_type;
    const isShowExclTax = taxDisplayType === TAX_DISPLAY_TYPES.BOTH;

    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();

    const [summaryPrice, setSummaryPrice] = useState(INITIAL_SUMMARY_PRICE);
    const [summaryPriceExTax, setSummaryPriceExTax] = useState(
        INITIAL_SUMMARY_PRICE
    );
    const [formApi, setFormApi] = useState(null);
    const derivedCustomizeOptions = useMemo(
        () => deriveCustomizeOptionsFromProduct(product),
        [product]
    );
    const [customizeOptions, setCustomizeOptions] = useState(
        derivedCustomizeOptions
    );

    const [addBundleProductToCart] = useMutation(
        addBundleProductsToCartMutation
    );

    const initSelectedOptions = [];
    items.forEach(item => {
        const { option_id, title, options } = item;
        const selected = {
            id: option_id,
            title: title,
            type: item.type,
            values: []
        };
        options.forEach(option => {
            const { exclMinimal, realMinimal } = getPriceSelectedValue(
                option,
                dynamic_price
            );

            if (option.is_default) {
                selected.values.push({
                    option_id: option.id,
                    can_change_quantity: option
                        ? option.can_change_quantity
                        : true,
                    qty: option ? option.quantity : 1,
                    label: option.label,
                    price: realMinimal,
                    price_ex_tax: exclMinimal
                });
                initSelectedOptions.push(selected);
            }
        });
    });

    const [selectedOptions, setSelectedOptions] = useState(initSelectedOptions);

    const isMissingCustomizableOptions = useMemo(() => {
        return getIsMissingCustomizeOptions(product, customizeOptions);
    }, [product, customizeOptions]);

    useEffect(() => {
        let price = dynamic_price ? 0 : base_price;
        let priceExTax = dynamic_price ? 0 : base_price_excl_tax;
        if (selectedOptions.length > 0) {
            selectedOptions.forEach(selectedOption => {
                if (selectedOption.id) {
                    selectedOption.values.forEach(value => {
                        price += value.price * value.qty;
                        priceExTax += value.price_ex_tax * value.qty;
                    });
                }
            });
        }
        const optionsPrice = getOptionPrice(product, customizeOptions);
        const optionsPriceExclTax = getOptionPriceExclTax(
            product,
            customizeOptions
        );
        setSummaryPrice(price + optionsPrice);
        setSummaryPriceExTax(priceExTax + optionsPriceExclTax);
    }, [selectedOptions, customizeOptions]);

    const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false);

    const handleOptionChange = useCallback(
        event => {
            const ids = [];
            if (event.target.type == 'select-multiple') {
                const options = event.target.options;
                for (let i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                        ids.push(options[i].value);
                    }
                }
            } else {
                if (event.target.value) {
                    ids.push(event.target.value);
                }
            }
            const optionId = event.target.dataset.optionId;
            const selecteds = [...selectedOptions];
            const selected = selecteds.find(
                selectedOption => selectedOption.id == optionId
            );
            const item = items.find(item => item.option_id == optionId);
            if (selected && item.type == 'multi') {
                selected.values = [];
            }
            if (ids.length == 0) {
                if (selected) {
                    selected.values = [];
                }
            } else {
                ids.forEach(id => {
                    const selected = selecteds.find(
                        selectedOption => selectedOption.id == optionId
                    );
                    const child = item.options.find(option => option.id == id);
                    const { exclMinimal, realMinimal } = getPriceSelectedValue(
                        child,
                        dynamic_price
                    );
                    if (selected) {
                        if (item.type == 'select' || item.type == 'radio') {
                            selected.values = [
                                {
                                    option_id: id,
                                    can_change_quantity: child
                                        ? child.can_change_quantity
                                        : true,
                                    qty: child ? child.quantity : 1,
                                    label: child.label,
                                    price: realMinimal,
                                    price_ex_tax: exclMinimal
                                }
                            ];
                        } else {
                            const value = selected.values.find(
                                val => val.option_id == id
                            );
                            if (value) {
                                if (item.type != 'multi') {
                                    const index = selected.values.indexOf(
                                        value
                                    );
                                    if (index > -1) {
                                        //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                                        selected.values.splice(index, 1);
                                    }
                                }
                            } else {
                                selected.values.push({
                                    option_id: id,
                                    can_change_quantity: child
                                        ? child.can_change_quantity
                                        : true,
                                    qty: child ? child.quantity : 1,
                                    label: child.label,
                                    price: realMinimal,
                                    price_ex_tax: exclMinimal
                                });
                            }
                        }
                    } else {
                        selecteds.push({
                            id: optionId,
                            title: item.title,
                            type: item.type,
                            values: [
                                {
                                    option_id: id,
                                    can_change_quantity: child
                                        ? child.can_change_quantity
                                        : true,
                                    qty: child ? child.quantity : 1,
                                    label: child.label,
                                    price: realMinimal,
                                    price_ex_tax: exclMinimal
                                }
                            ]
                        });
                    }
                });
            }
            setSelectedOptions(selecteds);
        },
        [setSelectedOptions, selectedOptions, items, dynamic_price]
    );

    const handleCustomizeOptionChange = useCallback(
        (optionId, optionValue) => {
            const selectedOption = product.options.find(
                option => option.option_id == optionId
            );
            const type = selectedOption ? selectedOption.__typename : null;
            // We must create a new Map here so that React knows that the value
            // of customizeOptions has changed.
            const nextCustomizeOptions = new Map([...customizeOptions]);
            if (type == 'CustomizableCheckboxOption') {
                const current = nextCustomizeOptions.get(optionId);
                if (!current) {
                    nextCustomizeOptions.set(optionId, [optionValue]);
                } else {
                    if (current.includes(optionValue)) {
                        current.splice(current.indexOf(optionValue), 1);
                    } else {
                        current.push(optionValue);
                    }
                    nextCustomizeOptions.set(
                        optionId,
                        current.length ? current : undefined
                    );
                }
            } else {
                nextCustomizeOptions.set(optionId, optionValue);
            }
            setCustomizeOptions(nextCustomizeOptions);
        },
        [customizeOptions, product]
    );

    const handleChangeOptionQty = useCallback(
        event => {
            const qty = event.target.value;
            const optionId = event.target.id.replace('-qty', '');
            const selecteds = [...selectedOptions];
            const selected = selecteds.find(
                selectedOption => selectedOption.id == optionId
            );
            if (selected) {
                selected.values[0].qty = qty;
                setSelectedOptions(selecteds);
            }
        },
        [selectedOptions]
    );

    const handleAddToCart = useCallback(
        async formValues => {
            formApi.validate();
            const bundleOptions = [];
            const selected = [...selectedOptions];
            const customizeOptionsValue = getCustomizeOptionValueToVariable(
                customizeOptions
            );

            selected.forEach(select => {
                const values = [];
                select.values.forEach(val => {
                    values.push(val.option_id);
                });
                if (values.length > 0) {
                    if (select.type == 'radio' || select.type == 'select') {
                        bundleOptions.push({
                            id: select.id,
                            quantity: select.values[0].qty,
                            value: values
                        });
                    } else {
                        bundleOptions.push({
                            id: select.id,
                            quantity: 1,
                            value: values
                        });
                    }
                }
            });
            setIsAddToCartDisabled(true);
            try {
                await addBundleProductToCart({
                    variables: {
                        cartId,
                        quantity: formValues.quantity,
                        sku: product.sku,
                        bundleOptions,
                        customizeOptions: customizeOptionsValue
                    }
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

                addToast({
                    type: 'info',
                    message,
                    timeout: 4000
                });
            } catch (e) {
                addToast({
                    type: 'error',
                    message: e.message,
                    timeout: 4000
                });
            } finally {
                setIsAddToCartDisabled(false);
            }
        },
        [
            addBundleProductToCart,
            product,
            selectedOptions,
            formApi,
            cartId,
            customizeOptions
        ]
    );

    return {
        summaryPrice,
        summaryPriceExTax,
        handleAddToCart,
        isAddToCartDisabled:
            isAddToCartDisabled || isMissingCustomizableOptions,
        selectedOptions,
        handleOptionChange,
        handleChangeOptionQty,
        setFormApi,
        handleCustomizeOptionChange,
        isShowExclTax
    };
};
