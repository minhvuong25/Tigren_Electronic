import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useToasts } from '@magento/peregrine';
import { useIntl } from 'react-intl';

import DEFAULT_OPERATIONS from '@tigrensolutions/product-reviews/src/talons/productReviews.gql.js';

const getRatings = values => {
    return Object.keys(values).map(value => {
        const isRatingField = value.search('rating_');
        const ratingId = isRatingField >= 0 && value.replace('rating_', '');

        if (ratingId) {
            return {
                id: ratingId,
                value_id: values[value]
            };
        }
    });
};

export const useReviewForm = props => {
    const { product } = props;
    const [formApi, setFormApi] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [{ currentUser, isSignedIn, isGettingDetails }] = useUserContext();
    const [, { toggleDrawer }] = useAppContext();

    const { addProductReviews } = DEFAULT_OPERATIONS;

    const [addReview] = useMutation(addProductReviews, {
        fetchPolicy: 'no-cache'
    });

    const { productReviewRatingsMetadata } = DEFAULT_OPERATIONS;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: ratings } = useQuery(productReviewRatingsMetadata, {
        fetchPolicy: 'cache-and-network'
    });

    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();

    const initialValues = useMemo(() => {
        const { firstname, lastname } = currentUser;
        const nickname =
            firstname && lastname ? [firstname, lastname].join(' ') : '';

        return {
            nickname
        };
    }, [currentUser]);

    const handleSignIn = useCallback(() => {
        toggleDrawer('nav');
    }, [toggleDrawer]);

    const handleShowMessage = useCallback(() => {
        addToast({
            type: 'info',
            message: formatMessage({
                id: 'reviewForm.success',
                defaultMessage: 'You submitted your review for moderation.'
            }),
            timeout: 4000
        });
    }, [addToast]);

    const handleSubmit = useCallback(
        async formValues => {
            const inputRatings = getRatings(formValues).filter(
                item => item != undefined
            );

            const variables = {
                sku: product && product.sku,
                ...formValues,
                ratings: inputRatings
            };

            try {
                await addReview({ variables });
                formApi.reset();
                handleShowMessage();

                setIsSubmitting(false);
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        [product, addReview, formApi, setIsSubmitting, handleShowMessage]
    );

    return {
        isSignedIn,
        handleSignIn,
        initialValues,
        ratings,
        isDisabled: isSubmitting,
        isReady: !isGettingDetails,
        handleSubmit,
        setFormApi,
        formApi
    };
};
