export const appendCustomizeOptionsToPayload = (payload, customizeOptions) => {
    if (!customizeOptions) {
        return payload;
    }
    const customize = [];
    customizeOptions.forEach((value, id) => {
        if (value) {
            customize.push({
                id,
                value_string: '' + value
            });
        }
    });
    if (customize.length > 0) {
        payload['customizableOptions'] = customize;
    }

    return payload;
};
