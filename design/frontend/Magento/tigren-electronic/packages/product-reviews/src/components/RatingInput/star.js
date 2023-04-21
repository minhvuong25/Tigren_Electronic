import React, { Fragment } from 'react';
import { Radio } from 'informed';

const Star = props => {
    const { classes, id, label, value, ...rest } = props;

    return (
        <Fragment>
            <Radio {...rest} className={classes.input} id={id} value={value} />
            <label className={classes.star} htmlFor={id} title={label}>
                <span className={classes.icon} />
            </label>
        </Fragment>
    );
};

export default Star;
