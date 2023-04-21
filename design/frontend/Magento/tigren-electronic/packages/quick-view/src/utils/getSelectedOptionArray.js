export const getSelectedOptionArray = (selectedOptionMap = new Map()) => {
    return Array.from(selectedOptionMap.entries()).reduce(
        (result, selectedOption) => {
            const [optionId, optionValueIndex] = selectedOption;
            const selectedOptionHash = btoa(
                `configurable/${optionId}/${optionValueIndex}`
            );

            result = [...result, selectedOptionHash];
            return result;
        },
        []
    );
};
