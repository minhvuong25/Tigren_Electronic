module.exports = (targetables, targetablesPath) => {
    const forgotPasswordTalons = targetables.reactComponent(targetablesPath);

    forgotPasswordTalons.addImport(`{ useToasts } from '@magento/peregrine'`);
    forgotPasswordTalons.addImport(`{ useIntl } from 'react-intl';`);
    forgotPasswordTalons.addImport(`{ useHistory } from 'react-router-dom';`);

    forgotPasswordTalons.insertBeforeSource(
        `const [hasCompleted, setCompleted] = useState(false);`,
        `const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    `
    );

    forgotPasswordTalons.insertAfterSource(
        `const [forgotPasswordEmail, setForgotPasswordEmail] = useState(null);`,
        `
    const history = useHistory();

    `
    );

    forgotPasswordTalons.insertAfterSource(
        `setCompleted(true);`,
        `
                const message = formatMessage(
                    {
                        id: 'formSubmissionSuccessful.textMessage',
                        defaultMessage:
                            'If there is an account associated with your email address, you will receive an email with a link to change your password.'
                    },
                    { email }
                );

                addToast({
                    type: 'info',
                    message,
                    timeout: 4000
                });

                history.push('/sign-in');
                `
    );

    forgotPasswordTalons.insertBeforeSource(
        `setCompleted(false);`,
        `addToast({
                    type: 'error',
                    message: error.message,
                    timeout: 4000
                });
                `
    );
};
