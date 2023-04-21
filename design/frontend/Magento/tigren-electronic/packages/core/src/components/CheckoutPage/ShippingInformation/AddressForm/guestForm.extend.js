module.exports = (targetables, targetablePath) => {
    const guestForm = targetables.reactComponent(targetablePath);

    guestForm.addImport(
        "combine from '@magento/venia-ui/lib/util/combineValidators';"
    );
    guestForm.addImport(
        "{ validatePhoneNumber } from '@tigrensolutions/base/src/util/formValidators';"
    );
    guestForm.setJSXProps('TextInput field="telephone"', {
        validate: '{combine([isRequired, validatePhoneNumber])}',
        maxLength: '{10}'
    });
};
