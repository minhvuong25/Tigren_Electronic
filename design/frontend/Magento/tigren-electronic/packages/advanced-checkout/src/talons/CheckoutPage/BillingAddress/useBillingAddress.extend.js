module.exports = (targetables, targetablesPath) => {
    const useBillingAddressTalon = targetables.reactComponent(targetablesPath);

    useBillingAddressTalon.insertAfterSource(
        `region: region.code`,
        `,
                region_id: region.region_id`
    );
    useBillingAddressTalon
        .insertAfterSource(
            `sameAsShipping: false`,
            `,
                region: formState.values.region || '',
                region_id: formState.values.region_id,`
        )
        .insertBeforeSource(
            `const client = useApolloClient();`,
            `
    const shippingInformationRef = useRef();
    `
        )
        .insertAfterSource(
            `const isBillingAddressSame = formState.values.isBillingAddressSame;`,
            `
    const scrollShippingInformationIntoView = useCallback(() => {
        if (shippingInformationRef.current) {
            shippingInformationRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [shippingInformationRef]);
    `
        )
        .insertAfterSource(
            `initialValues,`,
            `
        scrollShippingInformationIntoView,
        `
        )
        .insertAfterSource(`useEffect,`, ` useRef,`);

    // Show list of existing billing addresses
    const addressOperations = useBillingAddressTalon.addImport(
        `DEFAULT_ADDRESS_OPERATIONS from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/BillingAddress/customerAddress.gql.js'`
    );
    useBillingAddressTalon.insertAfterSource(
        `DEFAULT_OPERATIONS,`,
        `${addressOperations}, `
    );
    useBillingAddressTalon.insertBeforeSource(
        `} = operations;`,
        `,
        getCustomerAddressesQuery
    `
    );
    useBillingAddressTalon.addImport(
        `{ useUserContext } from '@magento/peregrine/lib/context/user'`
    );
    useBillingAddressTalon.insertAfterSource(
        '} = operations;',
        `
    const [{ isSignedIn }] = useUserContext();
    `
    );
    useBillingAddressTalon.insertAfterSource(
        `] = useMutation(setBillingAddressMutation);`,
        `

    const {
        data: customerAddressesData,
        loading: customerAddressesLoading
    } = useQuery(getCustomerAddressesQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !isSignedIn
    });

    const customerAddresses =
        (customerAddressesData && customerAddressesData.customer.addresses) ||
        [];`
    );

    useBillingAddressTalon
        .insertBeforeSource(
            `initialValues,`,
            `
        customerAddresses,
        billingAddressData,
        `
        )
        .insertBeforeSource(
            `setBillingAddress();`,
            `
                        if (isSignedIn) {
                            return;
                        }
                        `
        );
    useBillingAddressTalon.insertAfterSource(
        `if (
                billingAddressMutationCompleted &&
                !billingAddressMutationError
            ) {`,
        '',
        { remove: 37 }
    );
};
