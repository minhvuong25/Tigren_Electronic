import React, { Fragment } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { validatePhoneNumber } from '@tigrensolutions/base/src/util/formValidators';
import Checkbox from '@tigrensolutions/core/src/components/Checkbox';
import Field from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './addEditDialog.module.css';
import { Form } from 'informed';
import Button from '@magento/venia-ui/lib/components/Button';
import Postcode from '@magento/venia-ui/lib/components/Postcode';
import Region from '@magento/venia-ui/lib/components/Region';
import Country from '@magento/venia-ui/lib/components/Country';

const AddEditDialog = props => {
    const {
        formErrors,
        formProps,
        isBusy,
        onCancel,
        onConfirm,
        hasAddress,
        setFormApi,
        isHadAddress,
        isEditMode
    } = props;

    const { initialValues } = formProps;

    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);

    const firstNameLabel = formatMessage({
        id: 'global.firstName',
        defaultMessage: 'First Name'
    });
    const lastNameLabel = formatMessage({
        id: 'global.lastName',
        defaultMessage: 'Last Name'
    });
    const street1Label = formatMessage({
        id: 'global.streetAddress',
        defaultMessage: 'Street Address'
    });
    const street2Label = formatMessage({
        id: 'global.streetAddress2',
        defaultMessage: 'Street Address 2'
    });
    const cityLabel = formatMessage({
        id: 'global.city',
        defaultMessage: 'City'
    });
    const telephoneLabel = formatMessage({
        id: 'global.phoneNumber',
        defaultMessage: 'Phone Number'
    });

    const rest = isHadAddress ? {} : { fieldValue: true };

    return (
        <Fragment>
            <h3 className={classes.heading}>
                {hasAddress && isEditMode ? (
                    <FormattedMessage
                        id={'addEditDialog.editTitle'}
                        defaultMessage={'Edit address'}
                    />
                ) : (
                    <FormattedMessage
                        id={'addEditDialog.addAddress'}
                        defaultMessage={'Add New Address'}
                    />
                )}
            </h3>
            <FormError
                classes={{ root: classes.errorContainer }}
                errors={Array.from(formErrors.values())}
            />
            <Form
                initialValues={initialValues}
                onSubmit={onConfirm}
                getApi={setFormApi}
            >
                <div className={classes.root}>
                    <div className={classes.firstname}>
                        <Field
                            id="firstname"
                            label={firstNameLabel}
                            layout={'account'}
                            isRequired
                        >
                            <TextInput
                                field="firstname"
                                validate={isRequired}
                            />
                        </Field>
                    </div>
                    <div className={classes.lastname}>
                        <Field
                            id="lastname"
                            label={lastNameLabel}
                            layout={'account'}
                            isRequired
                        >
                            <TextInput field="lastname" validate={isRequired} />
                        </Field>
                    </div>
                    <div className={classes.street0}>
                        <Field
                            id="street0"
                            label={street1Label}
                            layout={'account'}
                            isRequired
                        >
                            <TextInput
                                placeholder={formatMessage({
                                    id: 'shipping.street',
                                    defaultMessage:
                                        'House number, building name, street'
                                })}
                                field="street[0]"
                                validate={isRequired}
                            />
                        </Field>
                    </div>
                    <div className={classes.street1}>
                        <Field
                            id="street1"
                            label={street2Label}
                            optional={true}
                        >
                            <TextInput field="street[1]" />
                        </Field>
                    </div>
                    <div className={classes.country}>
                        <Country field={'country_code'} validate={isRequired} />
                    </div>
                    <div className={classes.city}>
                        <Field id="city" label={cityLabel} isRequired>
                            <TextInput field="city" validate={isRequired} />
                        </Field>
                    </div>
                    <div className={classes.region}>
                        <Region
                            countryCodeField={'country_code'}
                            fieldInput={'region[region]'}
                            fieldSelect={'region[region_id]'}
                            optionValueKey="id"
                            validate={isRequired}
                        />
                    </div>
                    <div className={classes.postcode}>
                        <Postcode validate={isRequired} />
                    </div>

                    <div className={classes.telephone}>
                        <Field
                            id="telephone"
                            label={telephoneLabel}
                            layout={'account'}
                            isRequired
                        >
                            <TextInput
                                placeholder={formatMessage({
                                    id: 'shipping.telephone',
                                    defaultMessage:
                                        'Enter a 10 digit phone number'
                                })}
                                field="telephone"
                                validate={combine([
                                    isRequired,
                                    validatePhoneNumber
                                ])}
                                validateOnBlur
                                mask={value => value && value.trim()}
                                maskOnBlur={true}
                                maxLength={10}
                                isMobile={true}
                            />
                        </Field>
                    </div>
                    <div className={classes.checkBoxes}>
                        <div className={classes.default_shipping_check}>
                            <Checkbox
                                field="default_shipping"
                                label={formatMessage({
                                    id: 'addressBookPage.makeDefaultShipping',
                                    defaultMessage:
                                        'Use as my default shipping address'
                                })}
                                {...rest}
                            />
                        </div>
                        <div className={classes.default_billing_check}>
                            <Checkbox
                                field="default_billing"
                                label={formatMessage({
                                    id: 'addressBookPage.makeDefaultBilling',
                                    defaultMessage:
                                        'Use as my default billing address'
                                })}
                                {...rest}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <Button
                        disabled={isBusy}
                        priority={'high'}
                        type={'submit'}
                        classes={{
                            root_highPriority: classes.saveButton
                        }}
                    >
                        <FormattedMessage
                            id={'addressBookPage.saveAddress'}
                            defaultMessage={'Save Address'}
                        />
                    </Button>
                    <Button
                        disabled={isBusy}
                        onClick={onCancel}
                        classes={{
                            root_normalPriority: classes.backButton
                        }}
                    >
                        <FormattedMessage
                            id={'global.backButton'}
                            defaultMessage={'Go back to previous'}
                        />
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default AddEditDialog;

AddEditDialog.propTypes = {
    classes: shape({
        root: string,
        city: string,
        country: string,
        default_address_check: string,
        errorContainer: string,
        firstname: string,
        lastname: string,
        middlename: string,
        postcode: string,
        region: string,
        street1: string,
        street2: string,
        telephone: string
    }),
    formErrors: object,
    isEditMode: bool,
    isOpen: bool,
    onCancel: func,
    onConfirm: func
};
