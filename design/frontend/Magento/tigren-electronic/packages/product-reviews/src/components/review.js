import React from 'react';
import { number, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productReviews.module.css';
import { formattedDate } from '../utils';

const Review = props => {
    const { nickname, created_at: date, summary, text, average_rating } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.reviewRoot}>
            <div className={classes.authorDetails}>
                <div className={classes.wrapName}>
                    <p className={classes.author}>{nickname}</p>
                    <h5 className={classes.date}>{formattedDate(date)}</h5>
                </div>
            </div>
            <div className={classes.descriptionRoot}>
                <div className={classes.descriptionHeader}>
                    <span className={classes.title}>{summary}</span>
                </div>
                <div className={classes.rating}>
                    <div className={classes.ratingRoot}>
                        <div className={classes.stars}>
                            <div
                                style={{ width: `${average_rating}%` }}
                                className={classes.starsFilled}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.details}>
                <span className={classes.detailText}>{text}</span>
            </div>
        </div>
    );
};

Review.propTypes = {
    review_id: number,
    nickname: string,
    created_at: string,
    summary: string,
    text: string,
    average_rating: number
};

export default Review;
