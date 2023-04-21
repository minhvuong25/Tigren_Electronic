export const regexes = {
    veryStrongRegex: new RegExp(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    ),
    strongRegex: new RegExp(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})'
    ),
    mediumRegex: new RegExp('\\w{8,}'),
    weekRegex: new RegExp('\\w{1,}'),
    noPasswordRegex: new RegExp('^(?![sS])')
};

const strengthRegexes = [
    regexes.veryStrongRegex,
    regexes.strongRegex,
    regexes.mediumRegex,
    regexes.weekRegex,
    regexes.noPasswordRegex
];

const getPasswordStrength = (password = '') => {
    for (let i = 0; i < strengthRegexes.length; i++) {
        const regex = strengthRegexes[i];
        if (regex.test(password)) return i;
    }
};

export default getPasswordStrength;
