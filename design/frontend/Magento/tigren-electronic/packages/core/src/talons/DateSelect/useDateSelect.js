import { useMemo } from 'react';

import { useIntl } from 'react-intl';
import { Util } from '@magento/peregrine';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const getDayOptions = formatMessage => {
    const dayOptions = [
        {
            value: '',
            label: formatMessage({
                id: 'DateSelect.Day',
                defaultMessage: 'DD'
            })
        }
    ];
    for (let i = 1; i <= 31; i++) {
        dayOptions.push({
            value: i,
            label: i + ''
        });
    }
    return dayOptions;
};

const monthNames = [
    {
        id: 'DateSelect.January',
        label: 'Jan'
    },
    {
        id: 'DateSelect.February',
        label: 'Feb'
    },
    {
        id: 'DateSelect.March',
        label: 'Mar'
    },
    {
        id: 'DateSelect.April',
        label: 'Apr'
    },
    {
        id: 'DateSelect.May',
        label: 'May'
    },
    {
        id: 'DateSelect.June',
        label: 'Jun'
    },
    {
        id: 'DateSelect.July',
        label: 'Jul'
    },
    {
        id: 'DateSelect.August',
        label: 'Aug'
    },
    {
        id: 'DateSelect.September',
        label: 'Sep'
    },
    {
        id: 'DateSelect.October',
        label: 'Oct'
    },
    {
        id: 'DateSelect.November',
        label: 'Nov'
    },
    {
        id: 'DateSelect.December',
        label: 'Dec'
    }
];

const getMonthOptions = formatMessage => {
    const monthOptions = [
        {
            value: '',
            label: formatMessage({
                id: 'DateSelect.month',
                defaultMessage: 'MM'
            })
        }
    ];
    monthNames.forEach((month, i) => {
        monthOptions.push({
            value: i + 1,
            label: formatMessage({
                id: month.id,
                defaultMessage: month.label
            })
        });
    });

    return monthOptions;
};

const getYearOptions = formatMessage => {
    const yearOptions = [
        {
            value: '',
            label: formatMessage({
                id: 'DateSelect.year',
                defaultMessage: 'YYYY'
            })
        }
    ];
    const maxOffset = 100;
    let thisYear = new Date().getFullYear();
    const locale = storage.getItem('store_locale_code');
    if (locale === 'th_TH') thisYear += 543;
    for (let x = 0; x <= maxOffset; x++) {
        const year = thisYear - x;
        yearOptions.push({
            value: year,
            label: year + ''
        });
    }
    return yearOptions;
};

const convertDateStringToObject = (defaultDateString = '') => {
    const dateArray = (defaultDateString || '').split('-');
    const [defaultYear, defaultMonth, defaultDay] = dateArray;

    if (defaultYear && defaultMonth && defaultDay) {
        return {
            defaultYear: Number.parseInt(defaultYear),
            defaultMonth: Number.parseInt(defaultMonth),
            defaultDay: Number.parseInt(defaultDay)
        };
    } else {
        return null;
    }
};

export const useDateSelect = props => {
    const { defaultDateString } = props;

    const { formatMessage } = useIntl();

    const dayOptions = useMemo(() => getDayOptions(formatMessage), [
        formatMessage
    ]);

    const monthOptions = useMemo(() => getMonthOptions(formatMessage), [
        formatMessage
    ]);

    const yearOptions = useMemo(() => getYearOptions(formatMessage), [
        formatMessage
    ]);

    const defaultDate = useMemo(
        () => convertDateStringToObject(defaultDateString),
        [defaultDateString]
    );

    return {
        dayOptions,
        monthOptions,
        yearOptions,
        defaultDate
    };
};
