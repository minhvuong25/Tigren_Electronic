import React, { Fragment, useMemo } from 'react';
import { arrayOf, node, oneOfType, shape, string } from 'prop-types';
import { compose } from 'redux';
import { BasicRadioGroup, asField } from 'informed';
import { Message } from '@magento/venia-ui/lib/components/Field';
import classify from '@magento/venia-ui/lib/classify';
import defaultClasses from './ratingInput.module.css';
import Star from './star';

const RatingInput = props => {
    const { classes, fieldState, message, field, options, ...rest } = props;
    const stars = useMemo(
        () =>
            [...options].reverse().map(({ value, value_id }) => (
                <Star
                    classes={{
                        input: classes.inputRadio,
                        star: classes.star,
                        icon: classes.icon
                    }}
                    key={value_id}
                    id={`${field}${value}`}
                    label={`${value} star${value !== 1 ? 's' : ''}`}
                    value={value_id.toString()}
                />
            )),
        [options, classes, field]
    );

    return (
        <Fragment>
            <fieldset className={classes.fieldset} name={field}>
                <div className={classes.root}>
                    <BasicRadioGroup {...rest} fieldState={fieldState}>
                        {stars}
                    </BasicRadioGroup>
                </div>
            </fieldset>
            <Message className={classes.message} fieldState={fieldState}>
                {message}
            </Message>
        </Fragment>
    );
};

RatingInput.propTypes = {
    classes: shape({
        message: string,
        radio: string,
        radioLabel: string,
        root: string
    }),
    fieldState: shape({
        value: string
    }),
    items: arrayOf(
        shape({
            label: oneOfType([string, node]),
            value: string
        })
    ),
    message: node
};

export default compose(
    classify(defaultClasses),
    asField
)(RatingInput);
