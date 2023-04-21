module.exports = (targetables, targetablePath) => {
    const useCreateAccount = targetables.reactComponent(targetablePath);
    useCreateAccount.addImport(`{ useToasts } from '@magento/peregrine';`);
    useCreateAccount.addImport(`{ useIntl } from 'react-intl';`);

    useCreateAccount
    .insertBeforeSource(` } = props;`, `, orderNumber`)
    .insertAfterSource(
        `useApolloClient();`,
        `
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    `
    )
    .insertAfterSource(
        `createAccount({
                    variables: {`,
        `
                        order_number: orderNumber,
                        `
    )
    .insertAfterSource(
        `await retrieveCartId();`,
        `addToast({
                    type: 'info',
                    message: formatMessage({
                        id: 'createAccount.titleSuccess',
                        defaultMessage: 'Registration success!'
                    }),
                    timeout: 7000
                });
                `
    )
    .insertBeforeSource(
        `if (process.env.NODE_ENV !== 'production'`,
        `
                addToast({
                    type: 'error',
                    message: error.message,
                    timeout: 7000
                });
                `
    )
    .insertAfterSource(
        `fetchCartDetails,
            onSubmit`,
        `,
            orderNumber
        `
    );
};
