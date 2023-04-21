import React from 'react';
import { number } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './rating.module.css';

const Rating = props => {
    const { percent, value } = props;
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <div
                className={classes.stars}
                title={`${value} ${value > 1 ? 'stars' : 'star'}`}
            >
                <div
                    style={{ width: `${percent}%` }}
                    className={classes.starsFilled}
                />
            </div>
        </div>
    );
};

Rating.propTypes = {
    percent: number,
    value: number
};

export default Rating;
