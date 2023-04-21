import React from 'react';
import { bool, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './reviewForm.module.css';
import { Form } from 'informed';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Field from '@magento/venia-ui/lib/components/Field';
import Button from '@magento/venia-ui/lib/components/Button';
import TextArea from '@magento/venia-ui/lib/components/TextArea';
import { useReviewForm } from '@tigrensolutions/product-reviews/src/talons/useReviewForm';
import RatingInput from '../RatingInput';
import { isRequired } from '@tigrensolutions/product-reviews/src/utils/validators';
import { FormattedMessage, useIntl } from 'react-intl';

const ReviewForm = props => {
    const { product, handleHideReviewForm } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        initialValues,
        handleSubmit,
        isDisabled,
        isReady,
        ratings,
        setFormApi
    } = useReviewForm({
        product
    });

    const { formatMessage } = useIntl();

    if (!isReady) {
        return null;
    }
    const ratingsData =
        ratings &&
        ratings.productReviewRatingsMetadata &&
        ratings.productReviewRatingsMetadata.items;

    const ratingInputs =
        Array.isArray(ratingsData) && ratingsData.length
            ? ratingsData.map(r => (
                  <Field key={r.id} label={r.name} isRequired required={true}>
                      <RatingInput
                          options={r.values}
                          validate={isRequired}
                          field={`rating_${r.id}`}
                      />
                  </Field>
              ))
            : null;

    return (
        <div className={classes.root}>
            <Button
                classes={{
                    root_lowPriority: classes.closeButton
                }}
                priority="low"
                onClick={handleHideReviewForm}
            />
            <Form
                className={classes.form}
                initialValues={{ ...initialValues }}
                onSubmit={data => handleSubmit({ ...data })}
                getApi={setFormApi}
            >
                <div className={classes.formTitle}>
                    <span className={classes.name}>
                        <FormattedMessage
                            id={`reviewForm.youAreViewing`}
                            defaultMessage={'You are reviewing'}
                        />
                    </span>
                    <span className={classes.value}>
                        {product && product.name}
                    </span>
                </div>

                {ratingInputs && (
                    <div className={classes.ratingField}>{ratingInputs}</div>
                )}

                <div className={classes.field}>
                    <Field
                        label={formatMessage({
                            id: 'productFullDetail.reviewName',
                            defaultMessage: "Reviewer's name"
                        })}
                    >
                        <TextInput
                            field="nickname"
                            type="text"
                            validate={isRequired}
                            validateOnBlur
                        />
                    </Field>
                </div>

                <div className={classes.field}>
                    <Field
                        label={formatMessage({
                            id: 'productFullDetail.titleReview',
                            defaultMessage: 'Title'
                        })}
                    >
                        <TextInput
                            field="summary"
                            type="text"
                            validate={isRequired}
                            validateOnBlur
                        />
                    </Field>
                </div>

                <div className={classes.field}>
                    <Field
                        label={formatMessage({
                            id: 'productFullDetail.desc',
                            defaultMessage: 'Description'
                        })}
                    >
                        <TextArea
                            field="text"
                            validate={isRequired}
                            validateOnBlur
                            rows={4}
                        />
                    </Field>
                </div>

                <Button disabled={isDisabled} type="submit" priority="danger">
                    {formatMessage({
                        id: 'productFullDetail.submitReview',
                        defaultMessage: 'Submit review'
                    })}
                </Button>
            </Form>
        </div>
    );
};

ReviewForm.propTypes = {
    productName: string,
    isProsConsEnabled: bool,
    isAllowGuest: bool,
    isGDPREnabled: bool,
    isRecommendFieldEnabled: bool,
    getGDPRText: string,
    isGuestEmailShow: bool
};

export default ReviewForm;
