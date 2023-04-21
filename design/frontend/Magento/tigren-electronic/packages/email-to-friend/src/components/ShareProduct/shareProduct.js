import React, { useEffect, useMemo, useRef, Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useShareProduct } from '../../talons/useShareProduct';
import { useShareProductButton } from '../../talons/useShareProductButton';
import {
    isRequired,
    validateEmail
} from '@tigrensolutions/base/src/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from '@magento/venia-ui/lib/components/Button';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Field from '@magento/venia-ui/lib/components/Field';
import TextArea from '@magento/venia-ui/lib/components/TextArea';
import { ArrayField } from 'informed';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './shareProduct.module.css';

const ShareProduct = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { product } = props;

    const inviteeListRef = useRef();

    const { formatMessage } = useIntl();
    const [{ currentUser }] = useUserContext();
    const talonProps = useShareProduct({
        formatMessage,
        product
    });
    const { maxRecipients } = useShareProductButton();

    const {
        isLoading,
        handleOpenPopup,
        handleSubmit,
        handleClosePopup,
        isOpen
    } = talonProps;

    const fullName = currentUser.firstname + ' ' + currentUser.lastname;
    const customer = {
        customer_name: fullName,
        customer_email: currentUser.email,
        recipients: [
            {
                name: '',
                email: ''
            }
        ]
    };

    const rootClass = !isLoading ? classes.root : classes.root_busy;

    const inviteeHtml = (
        <ArrayField field="recipients" name="recipients">
            {({ fields, add }) => {
                const max = maxRecipients || 5;
                const isDisable = fields && fields.length >= max;
                return (
                    <Fragment>
                        {fields.map(({ key, remove }, index) => {
                            const inviteeId = `recipients[${index}].name`;
                            const emailId = `recipients[${index}].email`;
                            return (
                                <div className={classes.inviteeItem} key={key}>
                                    <Field
                                        required={true}
                                        label={formatMessage({
                                            id: 'global.name',
                                            defaultMessage: 'Name'
                                        })}
                                    >
                                        <TextInput
                                            field={inviteeId}
                                            validate={isRequired}
                                            validateOnBlur
                                            data-id={index}
                                        />
                                    </Field>
                                    <Field
                                        required={true}
                                        label={formatMessage({
                                            id: 'global.email',
                                            defaultMessage: 'Email'
                                        })}
                                    >
                                        <TextInput
                                            field={emailId}
                                            data-id={index}
                                            validate={combine([
                                                isRequired,
                                                validateEmail
                                            ])}
                                            validateOnBlur
                                        />
                                    </Field>
                                    {index >= 1 && (
                                        <button
                                            onClick={remove}
                                            type="button"
                                            className={classes.removeButton}
                                        >
                                            {formatMessage({
                                                id: 'global.removeButton',
                                                defaultMessage: 'remove'
                                            })}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                        <div className={classes.button}>
                            <Button
                                type="button"
                                priority="low"
                                onClick={add}
                                disabled={isDisable}
                            >
                                <FormattedMessage
                                    id="shareProduct.addInvitee"
                                    defaultMessage="Add Invitee"
                                />
                            </Button>
                        </div>
                    </Fragment>
                );
            }}
        </ArrayField>
    );

    // Auto-scroll into the bottom when adding invitee.
    useEffect(() => {
        const element = inviteeListRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
            element.animate({ scrollTop: element.scrollHeight });
        }
    }, [inviteeListRef, inviteeHtml]);

    return (
        <Dialog
            onCancel={handleClosePopup}
            isOpen={isOpen}
            onConfirm={handleSubmit}
            formProps={{
                initialValues: customer
            }}
            title={formatMessage({
                id: 'shareDialog.title',
                defaultMessage: 'Email to Friend'
            })}
            shouldShowButtons={false}
        >
            {isLoading && <LoadingIndicator />}
            <div className={rootClass}>
                <div className={classes.shareForm}>
                    <div className={classes.senderFields}>
                        <h4>
                            <FormattedMessage
                                id="shareProduct.sender"
                                defaultMessage="Sender"
                            />
                        </h4>
                        <div className={classes.senderInfo}>
                            <Field
                                required={true}
                                label={formatMessage({
                                    id: 'global.name',
                                    defaultMessage: 'Name'
                                })}
                            >
                                <TextInput
                                    field="customer_name"
                                    validate={isRequired}
                                    validateOnBlur
                                />
                            </Field>
                            <Field
                                required={true}
                                label={formatMessage({
                                    id: 'global.email',
                                    defaultMessage: 'Email'
                                })}
                            >
                                <TextInput
                                    field="customer_email"
                                    validate={combine([
                                        isRequired,
                                        validateEmail
                                    ])}
                                    validateOnBlur
                                />
                            </Field>
                        </div>
                        <Field
                            required={true}
                            label={formatMessage({
                                id: 'global.message',
                                defaultMessage: 'Message'
                            })}
                        >
                            <TextArea
                                field="message"
                                validate={isRequired}
                                validateOnBlur
                            />
                        </Field>
                    </div>
                    <div className={classes.inviteeItemsContainer}>
                        <h4>
                            <FormattedMessage
                                id="shareProduct.invitee"
                                defaultMessage="Invitee"
                            />
                        </h4>
                        <div
                            className={classes.inviteeList}
                            ref={inviteeListRef}
                        >
                            {inviteeHtml}
                        </div>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button type="submit" priority="high">
                        <FormattedMessage
                            id="shareProduct.sendEmail"
                            defaultMessage="Send Email"
                        />
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ShareProduct;
