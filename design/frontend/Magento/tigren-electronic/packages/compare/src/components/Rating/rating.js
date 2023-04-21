import React from 'react';
import { number } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './rating.module.css';

const Rating = props => {
    const { value, iconStar, iconStarEmpty, noWidth } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const renderStar = () => {
        let m = 1;
        const arr = [];
        for (let i = 1; i <= 5; i++) {
            if (m <= value) {
                iconStar
                    ? arr.push(iconStar)
                    : arr.push(<span className={classes.star} />);
            } else {
                iconStarEmpty
                    ? arr.push(iconStarEmpty)
                    : arr.push(<span className={classes.starFill} />);
            }
            m++;
        }
        return arr;
    };

    return (
        <div className={`${!noWidth ? classes.root : classes.rootNoWidth}`}>
            <div className={classes.stars}>{renderStar()}</div>
        </div>
    );
};

Rating.propTypes = {
    percent: number,
    value: number
};

export default Rating;
