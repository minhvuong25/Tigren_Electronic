module.exports = (targetables, targetablePath) => {
    const customerForm = targetables.reactComponent(targetablePath);

    customerForm.addImport(
        "combine from '@magento/venia-ui/lib/util/combineValidators';"
    );
    customerForm.addImport(
        "{ validatePhoneNumber } from '@tigrensolutions/base/src/util/formValidators';"
    );
    customerForm.setJSXProps('TextInput field="telephone"', {
        validate: '{combine([isRequired, validatePhoneNumber])}',
        maxLength: '{10}'
    });
};
