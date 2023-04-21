export const deriveSelectedOptions = (filterState = new Map(), options) => {
    const selectedOptionsMap = new Map();

    options.forEach(option => {
        const attributeCode = option.attribute_code;
        const values = option.values;

        const filterValuesSet = filterState.get(attributeCode);
        if (filterValuesSet) {
            const lastValue = Array.from(filterValuesSet).pop();
            selectedOptionsMap.set(attributeCode, new Set([lastValue.value]));
        } else {
            const firstValue = values[0] && values[0].value_index;
            selectedOptionsMap.set(attributeCode, new Set([firstValue + '']));
        }
    });

    return selectedOptionsMap;
};
