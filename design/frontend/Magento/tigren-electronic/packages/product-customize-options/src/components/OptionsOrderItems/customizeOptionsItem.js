import React, { useState } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './customizeOptionsItem.module.css';
import { FormattedMessage } from 'react-intl';

const CustomizeOptionsItem = props => {
    const { customizeOptions } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = useState(false);
    if (typeof customizeOptions !== 'object' || customizeOptions.length === 0) {
        return null;
    }

    const expandButton = (
        <button
            className={classes.expandButton}
            type={'button'}
            onClick={() => setOpen(open => !open)}
        >
            {open ? (
                <FormattedMessage
                    id={'global.showLess'}
                    defaultMessage={'Show less'}
                />
            ) : (
                <FormattedMessage
                    id={'global.showMore'}
                    defaultMessage={'Show more'}
                />
            )}
        </button>
    );

    return (
        <dl className={classes.options}>
            {expandButton}
            {customizeOptions &&
                customizeOptions.map(option => {
                    return (
                        <div
                            className={`${classes.optionLabel} ${
                                open ? classes.showLabel : classes.hideLabel
                            }`}
                        >
                            <dt className={classes.optionLabel}>
                                {option.label}:
                            </dt>
                            <dd className={classes.optionValue}>
                                {option.value}
                            </dd>
                        </div>
                    );
                })}
        </dl>
    );
};

export default CustomizeOptionsItem;
