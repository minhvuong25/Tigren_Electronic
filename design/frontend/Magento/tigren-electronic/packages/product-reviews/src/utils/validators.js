const SUCCESS = undefined;

export const isChecked = value => {
    if (value) {
        return SUCCESS;
    }

    const message = {
        id: 'validation.isRequired',
        defaultMessage: 'The field is required.'
    };

    return message;
};

export const isRequired = value => {
    const message = {
        id: 'validation.isRequired',
        defaultMessage: 'The field is required.'
    };

    return (value ? value.toString() : '').trim() ? SUCCESS : message;
};

export const validateEmail = value => {
    if (!value) {
        return SUCCESS;
    }

    const message = {
        id: 'validation.invalidEmail',
        defaultMessage: 'Please enter a valid email address.'
    };

    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
    )
        ? SUCCESS
        : message;
};
