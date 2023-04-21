/**
 * A [ponyfill](https://github.com/sindresorhus/ponyfill) is an opt-in polyfill,
 * which replaces missing builtins on older or non-compliant platforms, but
 * without monkey-patching the native API.
 *
 * Many browsers do not yet support Intl.NumberFormat.prototype.formatToParts,
 * which is tracked here: https://github.com/tc39/proposal-intl-formatToParts
 *
 * The polyfill available in that repository covers many edge cases, but it's
 * more functionality than we need at this stage, it's not distributed over
 * NPM, and it's 18kb. The below
 * [ponyfill](https://github.com/sindresorhus/ponyfill) is not fully compliant,
 * but it'll do for now.
 *
 * TODO: Replace with a formally maintained, but small-enough, ponyfill.
 */

const intlFormats = {
    USD: {
        symbol: '$',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    },
    GBP: {
        symbol: '£',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    EUR: {
        symbol: '€',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    ARS: {
        symbol: '$&nbsp;',
        decimal: '',
        groupDelim: '.',
        maximumFractionDigits: 0
    },
    BRL: {
        symbol: 'R$',
        decimal: ',',
        groupDelim: '.',
        maximumFractionDigits: 2
    },
    IDR: {
        symbol: 'Rp&nbsp;',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    ILS: {
        symbol: '₪',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    },
    RUB: {
        symbol: '&nbsp;РУБ',
        decimal: ',',
        groupDelim: '&nbsp;',
        maximumFractionDigits: 2,
        symbolAfter: true
    },
    ZAR: {
        symbol: 'R&nbsp;',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    },
    KRW: {
        symbol: '₩',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    TRY: {
        symbol: '₺',
        decimal: ',',
        groupDelim: '.',
        maximumFractionDigits: 2,
        symbolAfter: true
    },
    UAH: {
        symbol: 'грн',
        decimal: '.',
        groupDelim: '&nbsp;',
        maximumFractionDigits: 2,
        symbolAfter: true
    },
    HKD: {
        symbol: 'HK$',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    JPY: {
        symbol: '¥',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    AUD: {
        symbol: 'AU$',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    },
    MYR: {
        symbol: 'RM',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    TWD: {
        symbol: 'NT$',
        decimal: '',
        groupDelim: ',',
        maximumFractionDigits: 0
    },
    SGD: {
        symbol: 'S$',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    },
    THB: {
        symbol: '฿',
        decimal: '.',
        groupDelim: ',',
        maximumFractionDigits: 2
    }
};

const IntlPatches = {
    formatToPartsPatch({ currency, useGrouping }, num) {
        const format = intlFormats[currency] || {
            ...intlFormats.USD,
            symbol: currency
        };
        const { symbol, decimal, groupDelim } = format;
        const parts = [{ type: 'currency', value: symbol }];
        const [integer, fraction] = num
            .toFixed(format.maximumFractionDigits)
            .match(/\d+/g);

        if (useGrouping !== false) {
            const intParts = [];
            const firstGroupLength = integer.length % 3;
            let integerSlice = integer;
            if (firstGroupLength > 0) {
                intParts.push(
                    JSON.stringify({
                        type: 'integer',
                        value: integer.slice(0, firstGroupLength)
                    })
                );
                integerSlice = integer.slice(firstGroupLength);
            }

            const groups = integerSlice.match(/\d{3}/g);

            if (groups) {
                intParts.push(
                    ...groups.map(intPart =>
                        JSON.stringify({
                            type: 'integer',
                            value: intPart
                        })
                    )
                );
            }

            const groupDelimJSON =
                ',' +
                JSON.stringify({
                    type: 'group',
                    value: groupDelim
                }) +
                ',';

            const intAndGroupParts = JSON.parse(
                `[${intParts.join(groupDelimJSON)}]`
            );

            parts.push(...intAndGroupParts);
        } else {
            parts.push({ type: 'integer', value: integer });
        }

        const isHideDecimal = Number(fraction) === 0;

        return parts.concat([
            {
                type: 'decimal',
                value: isHideDecimal ? undefined : decimal
            },
            {
                type: 'fraction',
                value: isHideDecimal ? undefined : fraction
            },
            {
                type: 'symbolAfter',
                value: format.symbolAfter
            }
        ]);
    },

    toParts(num) {
        return IntlPatches.formatToPartsPatch(this.resolvedOptions(), num);
    }
};
export default IntlPatches;
