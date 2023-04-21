import React from 'react';

import { useIntl } from 'react-intl';
import { useDateSelect } from '@tigrensolutions/core/src/talons/DateSelect/useDateSelect';

import { bool, shape, string } from 'prop-types';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import Select from '@magento/venia-ui/lib/components/Select';
import Field from '@magento/venia-ui/lib/components/Field';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './dateSelect.module.css';

const DateSelect = (props = {}) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const { disabled } = props;
    const {
        dayOptions,
        monthOptions,
        yearOptions,
        defaultDate
    } = useDateSelect({ defaultDateString: props.defaultDate });

    return (
        <Field
            className={classes.itemField}
            id="day"
            label={formatMessage({
                id: 'global.dateOfBirth',
                defaultMessage: 'Date/Month/Year of Birth'
            })}
            isRequired={true}
        >
            <div className={classes.dateGroup}>
                <div className={classes.day}>
                    <Select
                        id={classes.country_id}
                        field="day"
                        items={dayOptions}
                        initialValue={
                            (defaultDate && defaultDate.defaultDay) || null
                        }
                        disabled={disabled}
                        validate={isRequired}
                    />
                </div>
                <div className={classes.month}>
                    <Select
                        id={classes.country_id}
                        field="month"
                        initialValue={
                            (defaultDate && defaultDate.defaultMonth) || null
                        }
                        items={monthOptions}
                        validate={isRequired}
                    />
                </div>
                <div className={classes.year}>
                    <Select
                        id={classes.country_id}
                        field="year"
                        items={yearOptions}
                        initialValue={
                            (defaultDate && defaultDate.defaultYear) || null
                        }
                        validate={isRequired}
                    />
                </div>
            </div>
        </Field>
    );
};

export default DateSelect;

DateSelect.propTypes = {
    classes: shape({
        root: string
    }),
    defaultDate: string,
    disabled: bool
};
