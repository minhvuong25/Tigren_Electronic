const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    const checkoutPage = targetables.reactComponent(targetablePath);
    checkoutPage.addImport(
        `GuestFormForCartVirtual from '@tigrensolutions/virtual-product/src/components/GuestFormForCartVirtual/guestFormForCartVirtual';`
    );
    checkoutPage
        .insertBeforeSource(
            `} = talonProps;`,
            `,
        isVirtual
    `
        )
        .insertBeforeSource(
            `<div className={classes.shipping_information_container`,
            `

                {isVirtual && <GuestFormForCartVirtual
                    onSave={setCheckoutStep}
                    onSuccess={scrollShippingInformationIntoView}
                    toggleActiveContent={toggleAddressBookContent}
                    toggleSignInContent={toggleSignInContent}
                    setGuestSignInUsername={setGuestSignInUsername}

                />}

                {!isVirtual && `
        )
        .insertBeforeSource(
            `<div className={classes.shipping_method_container`,
            `}

                {!isVirtual && `
        )
        .insertBeforeSource(
            `<div className={classes.payment_information_container`,
            `}

                `
        );
    if (isModuleAvailable('@tigrensolutions/multistep-checkout')) {
        checkoutPage.setJSXProps(`ShippingAddressButton`, {
            isVirtual: `{ isVirtual }`
        });
        checkoutPage.setJSXProps(`ShippingMethodButton`, {
            isVirtual: `{ isVirtual }`
        });
    }
};
