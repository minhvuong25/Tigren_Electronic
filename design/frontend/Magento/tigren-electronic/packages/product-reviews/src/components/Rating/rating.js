import React from 'react';
import { number } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { FormattedMessage } from 'react-intl';
import defaultClasses from './rating.module.css';

const Rating = props => {
    const { percent, value, count, reviewRef, isReviewPage } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const handleToggleReview = () => {
        if (reviewRef && reviewRef.current) {
            reviewRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const showReviewCount = !isReviewPage &&
            <span className={classes.reviewCount}>
                <FormattedMessage
                    id={'productFulLDetail.reviewCount'}
                    defaultMessage={'{count} review(s)'}
                    values={{
                        count: count
                    }}
                />
            </span>

    return (
        <section className={classes.rating} onClick={handleToggleReview}>
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
            {showReviewCount}
        </section>
    );
};

Rating.propTypes = {
    percent: number,
    value: number
};

export default Rating;
