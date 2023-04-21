import React, { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';
import Rating from '../Rating';
import { Link } from 'react-router-dom';

import { func, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import get from '@tigrensolutions/product-reviews/src/utils/get';
import { formattedDate } from '../../utils/index';

import defaultClasses from './reviews.module.css';

const Reviews = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { items } = props;

    const reviewList = useMemo(() => {
        return items.map(item => {
            return (
                <div className={classes.item}>
                    <div className={classes.row}>
                        <div className={classes.label}>
                            <FormattedMessage
                                id={'reviewPage.date'}
                                defaultMessage={'Date'}
                            />
                        </div>
                        <div className={classes.value}>
                            {formattedDate(item.created_at)}
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.label}>
                            <FormattedMessage
                                id={'reviewPage.product'}
                                defaultMessage={'Product'}
                            />
                        </div>
                        <div className={classes.value}>
                            {get(item, 'product.name', '')}
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.label}>
                            <FormattedMessage
                                id={'advancedReview.score'}
                                defaultMessage={'Score'}
                            />
                        </div>
                        <div className={classes.value}>
                            <Rating
                                value={item.average_rating / 5 / 4}
                                percent={item.average_rating}
                                isReviewPage={true}
                                classes={{
                                    root: classes.rating
                                }}
                            />
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.label}>
                            <FormattedMessage
                                id={'reviewPage.review'}
                                defaultMessage={'Review'}
                            />
                        </div>
                        <div className={classes.value}>
                            {get(item, 'summary', '')}
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.label} />
                        <div className={classes.value}>
                            <Link
                                to={`/review/customer/view/review_id/${
                                    item.review_id
                                }`}
                            >
                                <FormattedMessage
                                    id={'reviewPage.view'}
                                    defaultMessage={'View'}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    }, [items]);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.date}>
                    <p>
                        <FormattedMessage
                            id={'reviewPage.date'}
                            defaultMessage={'Date'}
                        />
                    </p>
                </div>

                <div className={classes.product}>
                    <p>
                        <FormattedMessage
                            id={'reviewPage.product'}
                            defaultMessage={'Product'}
                        />
                    </p>
                </div>

                <div className={classes.score}>
                    <p>
                        <FormattedMessage
                            id={'reviewPage.score'}
                            defaultMessage={'Score'}
                        />
                    </p>
                </div>

                <div className={classes.review}>
                    <p>
                        <FormattedMessage
                            id={'reviewPage.review'}
                            defaultMessage={'Review'}
                        />
                    </p>
                </div>
            </div>

            <div className={classes.reviewList}>{reviewList}</div>
        </div>
    );
};

export default Reviews;

Reviews.propTypes = {
    classes: shape({
        root: string
    }),
    items: shape(),
    handleViewReview: func
};

Reviews.defaultProps = {
    items: []
};
