module.exports = (targetables, targetablesPath) => {
    const billingAddressComponent = targetables.reactComponent(targetablesPath);

    billingAddressComponent.insertAfterSource(
        `<Region`,
        `
                    fieldInput={'region'}
                    fieldSelect={'region_id'}
                    optionValueKey={'id'}`
    );
    billingAddressComponent.addImport(
        `{ useUserContext } from '@magento/peregrine/lib/context/user'`
    );
    billingAddressComponent.insertAfterSource(
        '} = useBillingAddress(props);',
        `
    const [{ isSignedIn }] = useUserContext();
    `
    );

    billingAddressComponent.insertBeforeSource(
        '} = useBillingAddress(props);',
        `,
        customerAddresses,
        scrollShippingInformationIntoView,
        billingAddressData
    `
    );
    const AddressBook = billingAddressComponent.addReactLazyImport(
        '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/BillingAddress/AddressBook'
    );
    billingAddressComponent.insertBeforeSource(
        '<div className={billingAddressFieldsClassName}>',
        `
            {customerAddresses && customerAddresses.length > 0 && !isBillingAddressSame &&
                <${AddressBook}
                    {...props}
                    activeContent={'addressBook'}
                    customerAddresses={customerAddresses}
                    isSignedIn={isSignedIn}
                    onSuccess={scrollShippingInformationIntoView}
                    billingAddressData={billingAddressData}
                />
            }
            `
    );
    billingAddressComponent.insertBeforeSource(
        '<div className={billingAddressFieldsClassName}>',
        `
            {(!isSignedIn || !customerAddresses || !customerAddresses.length) &&
                `
    );
    billingAddressComponent.insertAfterSource(
        `</Field>
            </div>`,
        `
            }
        `
    );
};
