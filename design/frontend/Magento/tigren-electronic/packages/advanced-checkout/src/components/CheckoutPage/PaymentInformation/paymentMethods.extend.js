module.exports = (targetables, targetablesPath) => {
    const PaymentMethods = targetables.reactComponent(targetablesPath);

    PaymentMethods.insertBeforeSource(
        '} = props;',
        ',setPageIsUpdating'
    ).insertAfterSource('usePaymentMethods({', 'setPageIsUpdating');
};
