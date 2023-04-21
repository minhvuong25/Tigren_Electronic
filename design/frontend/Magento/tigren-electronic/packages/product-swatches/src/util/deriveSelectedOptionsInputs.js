export const deriveSelectedOptionsInputs = (selectedOptions, options) => {
    return (Array.from(selectedOptions) || []).reduce(
        (result, selectedOption) => {
            const [optionCode, optionValues] = selectedOption;
            const currentOption = options.find(
                option => option.attribute_code === optionCode
            );
            if (currentOption) {
                const firstValue = optionValues.values().next().value;
                const value = btoa(
                    `configurable/${currentOption.attribute_id}/${firstValue}`
                );
                result = [...result, value];
            }
            return result;
        },
        []
    );
};
