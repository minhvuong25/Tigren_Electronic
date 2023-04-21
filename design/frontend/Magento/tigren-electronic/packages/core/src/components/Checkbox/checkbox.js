import React, { Fragment, useEffect, useMemo } from 'react';
import { node, shape, string } from 'prop-types';
import { Checkbox as InformedCheckbox, useFieldApi } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { Message } from '@magento/venia-ui/lib/components/Field';
import defaultClasses from './checkbox.module.css';

/* TODO: change lint config to use `label-has-associated-control` */
/* eslint-disable jsx-a11y/label-has-for */

const Checkbox = props => {
    const {
        ariaLabel,
        classes: propClasses,
        field,
        fieldValue,
        id,
        label,
        message,
        onApply,
        isFilter,
        ...rest
    } = props;
    const fieldApi = useFieldApi(field);
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const checkClass = fieldState.value ? classes.checked : classes.unCheck;

    useEffect(() => {
        if (fieldValue != null && fieldValue !== fieldState.value) {
            fieldApi.setValue(fieldValue);
        }
    }, [fieldApi, fieldState.value, fieldValue]);

    const checkboxLabel = useMemo(() => {
        if (isFilter) {
            return (
                <span className={classes.label}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            onApply();
                        }}
                    >
                        {label}
                    </a>
                </span>
            );
        }

        return <span className={classes.label}>{label}</span>;
    }, [isFilter, label]);

    return (
        <Fragment>
            <label
                aria-label={ariaLabel}
                className={`${classes.root} ${checkClass}`}
                htmlFor={id}
            >
                <InformedCheckbox
                    {...rest}
                    className={classes.input}
                    field={field}
                    id={id}
                />
                <span className={classes.label}>{checkboxLabel}</span>
            </label>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

export default Checkbox;

Checkbox.propTypes = {
    ariaLabel: string,
    classes: shape({
        icon: string,
        input: string,
        label: string,
        message: string,
        root: string
    }),
    field: string.isRequired,
    id: string,
    label: node.isRequired,
    message: node
};

/* eslint-enable jsx-a11y/label-has-for */
