import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { shape, string } from 'prop-types';
import { useNewsletter } from '@magento/peregrine/lib/talons/Newsletter/useNewsletter';
import { useToasts } from '@magento/peregrine';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './newsletter.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

const Newsletter = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useNewsletter();
    const [, { addToast }] = useToasts();
    const {
        errors,
        handleSubmit,
        isBusy,
        setFormApi,
        newsLetterResponse
    } = talonProps;

    useEffect(() => {
        if (newsLetterResponse && newsLetterResponse.status) {
            addToast({
                type: 'info',
                message: formatMessage({
                    id: 'newsletter.subscribeMessage',
                    defaultMessage: 'The email address is subscribed.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, newsLetterResponse]);

    const maybeLoadingIndicator = isBusy ? (
        <div className={classes.loadingContainer}>
            <LoadingIndicator>
                <FormattedMessage
                    id={'newsletter.loadingText'}
                    defaultMessage={'Subscribing'}
                />
            </LoadingIndicator>
        </div>
    ) : null;
    const submitError = deriveErrorMessage([errors.get('subscribeMutation')]);

    useEffect(() => {
        if (submitError) {
            addToast({
                type: 'error',
                message: submitError,
                timeout: 5000
            });
        }
    }, [submitError]);

    return (
        <div className={classes.root}>
            {maybeLoadingIndicator}
            <span className={classes.title}>
                <FormattedMessage
                    id={'newsletter.titleText'}
                    defaultMessage={'Enter your email to receive information.'}
                />
            </span>
            <Form
                getApi={setFormApi}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field
                    id="email"
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        autoComplete="email"
                        field="email"
                        id="email"
                        validate={isRequired}
                        placeholder={formatMessage({
                            id: 'newsletter.placeholder',
                            defaultMessage: 'Your Email'
                        })}
                    />
                </Field>
                <LinkButton
                    className={classes.subscribe_link}
                    type="submit"
                    disabled={isBusy}
                >
                    <FormattedMessage
                        id={'newsletter.subscribeText'}
                        defaultMessage={'Subscribe'}
                    />
                </LinkButton>
            </Form>
        </div>
    );
};

Newsletter.propTypes = {
    classes: shape({
        modal_active: string,
        root: string,
        title: string,
        form: string,
        buttonsContainer: string
    })
};

export default Newsletter;
