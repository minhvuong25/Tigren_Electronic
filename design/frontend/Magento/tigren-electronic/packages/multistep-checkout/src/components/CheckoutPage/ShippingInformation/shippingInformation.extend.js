module.exports = (targetables, targetablePath) => {
    const shippingInformation = targetables.reactComponent(targetablePath);

    shippingInformation.setJSXProps('AddressForm', {
        refForm: '{props.refForm}'
    });
    shippingInformation.addImport(`{ useEffect } from 'react';`);
    shippingInformation
        .insertAfterSource(
            `toggleSignInContent,`,
            `
            shippingInformationData,
            setShippingInformationData,
            `
        )
        .insertBeforeSource(
            `const rootClassName`,
            `
            useEffect(() => {
        if (doneEditing) {
            setShippingInformationData(shippingData);
        }
        }, [shippingData, doneEditing])
        `
        );
};
