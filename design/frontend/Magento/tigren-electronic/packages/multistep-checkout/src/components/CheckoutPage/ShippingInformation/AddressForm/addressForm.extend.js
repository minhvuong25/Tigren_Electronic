module.exports = (targetables, targetablePath) => {
    const addressForm = targetables.reactComponent(targetablePath);
    addressForm.setJSXProps('AddressForm', { ref: '{props.refForm}' });
};
