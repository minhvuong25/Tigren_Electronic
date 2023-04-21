import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { bool, func, shape, string } from 'prop-types';
import { Form } from 'informed';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import ShippingRadios from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod/shippingRadios';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod/shippingMethod.module.css';
import customClasses from './shippingMethodDone.module.css';

const ShippingMethodDone = props => {
    const {
        pageIsUpdating,
        updateFormInitialValues,
        handleSubmit,
        shippingMethods,
        isLoading
    } = props;
    const classes = useStyle(defaultClasses, customClasses, props.classes);
    return (
        <Fragment>
            <h3
                data-cy="ShippingMethod-heading"
                className={classes.editingHeading}
            >
                <FormattedMessage
                    id={'shippingMethod.heading'}
                    defaultMessage={'Shipping Method'}
                />
            </h3>
            <Form
                className={classes.form}
                initialValues={updateFormInitialValues}
                onSubmit={handleSubmit}
            >
                <ShippingRadios
                    disabled={pageIsUpdating || isLoading}
                    shippingMethods={shippingMethods}
                />
                <div data-cy="formButtons-done" className={classes.formButtons}>
                    <Button
                        data-cy="ShippingMethod-submitButton"
                        priority="normal"
                        type="submit"
                        disabled={pageIsUpdating || isLoading}
                    >
                        <FormattedMessage
                            id={'shippingMethod.continueToNextStep'}
                            defaultMessage={'Continue to Payment Information'}
                        />
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

ShippingMethodDone.propTypes = {
    classes: shape({
        editingHeading: string,
        form: string,
        formButtons: string
    })
};

export default ShippingMethodDone;
