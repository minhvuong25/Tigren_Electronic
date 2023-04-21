export const toCamelCase = string => {
    return string.replace(/([-_][a-z])/gi, (match, capture) =>
        capture
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
};

export const keysToCamel = obj =>
    Object.keys(obj).reduce((res, key) => {
        res[toCamelCase(key)] = obj[key];
        return res;
    }, {});

export const formattedDate = inputDate => {
    const date = new Date(inputDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
};
