module.exports = (targetables, targetablePath) => {
    const paymentInformation = targetables.reactComponent(targetablePath);
    paymentInformation.insertBeforeSource(
        '<div className={classes.payment_info_container}>',
        `
        <h5 className={classes.paymentTitle}>
                <FormattedMessage
                    id={'checkoutPage.paymentInformation'}
                    defaultMessage={'Payment Information'}
                />
            </h5>
            `
    );

    paymentInformation.setJSXProps('PaymentMethods', {
        setPageIsUpdating: '{props.setPageIsUpdating}'
    });
};
