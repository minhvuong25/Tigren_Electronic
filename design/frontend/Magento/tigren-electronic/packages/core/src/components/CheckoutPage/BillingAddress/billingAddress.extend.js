module.exports = (targetables, targetablePath) => {
    const billingAddress = targetables.reactComponent(targetablePath);

    billingAddress.addImport(
        "combine from '@magento/venia-ui/lib/util/combineValidators';"
    );
    billingAddress.addImport(
        "{ validatePhoneNumber } from '@tigrensolutions/base/src/util/formValidators';"
    );
    billingAddress.insertBeforeSource(
        `const isFieldRequired`,
        `    const isNumberPhone = useCallback((value, { isBillingAddressSame }) => {
        if (isBillingAddressSame) {
            return undefined;
        } else {
            return validatePhoneNumber(value);
        }
    }, []);

    `
    )
    billingAddress.setJSXProps('TextInput field="phoneNumber"', {
        validate: '{combine([isFieldRequired, isNumberPhone])}',
        maxLength: '{10}'
    });
};
