const SUCCESS = undefined;

const REQUIRED_MESSAGE = {
    id: 'validation.isRequired',
    defaultMessage: 'The field is required.'
};

export const isRequired = (value, valuers, required) => {
    if (!required) {
        return SUCCESS;
    }

    return (value ? value.toString() : '').trim() ? SUCCESS : REQUIRED_MESSAGE;
};
