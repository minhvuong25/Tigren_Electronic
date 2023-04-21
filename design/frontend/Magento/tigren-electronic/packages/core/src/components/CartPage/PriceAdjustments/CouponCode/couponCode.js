import React, { useEffect } from 'react';

import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import combineClasses from '@tigrensolutions/core/src/util/combineClases';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import { FormattedMessage, useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useCouponCode } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/CouponCode/useCouponCode';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { AlertCircle as AlertCircleIcon, X as CloseIcon } from 'react-feather';
import Button from '@magento/venia-ui/lib/components/Button';
import { Form } from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

import defaultClasses from './couponCode.module.css';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

/**
 * A child component of the PriceAdjustments component.
 * This component renders a form for addingg a coupon code to the cart.
 *
 * @param {Object} props
 * @param {Function} props.setIsCartUpdating Function for setting the updating state for the cart.
 * @param {Object} props.classes CSS className overrides.
 * See [couponCode.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCode.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CouponCode from "@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode";
 */
const CouponCode = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useCouponCode({
        setIsCartUpdating: props.setIsCartUpdating
    });
    const [, { addToast }] = useToasts();
    const {
        applyingCoupon,
        data,
        errors,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    } = talonProps;
    const { formatMessage } = useIntl();

    const removeCouponError = deriveErrorMessage([
        errors.get('removeCouponMutation')
    ]);

    useEffect(() => {
        if (removeCouponError) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: removeCouponError,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, removeCouponError]);

    if (!data) {
        return null;
    }

    if (errors.get('getAppliedCouponsQuery')) {
        return (
            <div className={classes.errorContainer}>
                <FormattedMessage
                    id={'couponCode.errorContainer'}
                    defaultMessage={
                        'Something went wrong. Please refresh and try again.'
                    }
                />
            </div>
        );
    }

    const appliedCoupons =
        (data && data.cart && data.cart.applied_coupons) || [];

    let content;
    if (appliedCoupons.length > 0) {
        const codes = appliedCoupons.map(({ code }) => {
            return (
                <div key={code} className={classes.couponItem}>
                    <span>{code}</span>
                    <LinkButton
                        className={classes.removeButton}
                        disabled={removingCoupon}
                        onClick={() => {
                            handleRemoveCoupon(code);
                        }}
                    >
                        <Icon size={12} src={CloseIcon} />
                        <FormattedMessage
                            id={'couponCode.removeButton'}
                            defaultMessage={'Remove'}
                        />
                    </LinkButton>
                </div>
            );
        });

        content = <div className={classes.appliedCoupon}>{codes}</div>;
    } else content = null;

    const errorMessage = deriveErrorMessage([
        errors.get('applyCouponMutation')
    ]);

    const formClass = combineClasses({
        [classes.entryFormError]: errorMessage,
        [classes.entryForm]: !errorMessage,
        [classes.hideForm]: appliedCoupons && appliedCoupons.length > 0
    });

    const checkoutClass = props.isCheckout ? classes.checkout : classes.root;

    return (
        <div className={checkoutClass}>
            <h3 className={classes.title}>
                {formatMessage({
                    id: 'cartPage.couponCode',
                    defaultMessage: 'Coupon Code'
                })}
            </h3>

            <Form className={formClass} onSubmit={handleApplyCoupon}>
                <Field id="couponCode" label={null}>
                    <TextInput
                        field="couponCode"
                        id={'couponCode'}
                        placeholder={formatMessage({
                            id: 'couponCode.enterCode',
                            defaultMessage: 'Enter code'
                        })}
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        validate={isRequired}
                    />
                    {errorMessage && (
                        <span className={classes.message}>{errorMessage}</span>
                    )}
                </Field>
                <Field>
                    <Button
                        disabled={applyingCoupon}
                        priority="danger"
                        type={'submit'}
                    >
                        <FormattedMessage
                            id={'couponCode.apply'}
                            defaultMessage={'Apply'}
                        />
                    </Button>
                </Field>
            </Form>
            {content}
        </div>
    );
};

export default CouponCode;
