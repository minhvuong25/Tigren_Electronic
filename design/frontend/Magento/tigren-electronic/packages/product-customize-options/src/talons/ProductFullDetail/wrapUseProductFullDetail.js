import { useCallback, useMemo, useState } from 'react';
// Deriving the initial codes for each customize option.
const deriveCustomizeOptionsFromProduct = product => {
    const initialCustomizeOptions = new Map();
    if (!product.options) return initialCustomizeOptions;
    for (const option of product.options) {
        initialCustomizeOptions.set(option.option_id, undefined);
    }
    return initialCustomizeOptions;
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
const wrapUseProductFullDetail = original => props => {
    const defaultTalonsData = original(props);
    const { product } = props;

    const { isAddToCartDisabled, handleAddToCart } = defaultTalonsData;

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

    const handleAddToCartOption = useCallback(
        formValues => {
            handleAddToCart(formValues, customizeOptions);
        },
        [customizeOptions, handleAddToCart]
    );

    return {
        ...defaultTalonsData,
        isAddToCartDisabled: isAddToCartDisabled || isMissingCustomizeOptions,
        options: product.options,
        customizeOptions,
        handleCustomizeOptionChange,
        handleAddToCart: handleAddToCartOption
    };
};

export default wrapUseProductFullDetail;
