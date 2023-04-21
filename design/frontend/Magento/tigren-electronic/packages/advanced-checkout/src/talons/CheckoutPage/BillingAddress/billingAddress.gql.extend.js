module.exports = (targetables, targetablesPath) => {
    const billingAddressGraphQl = targetables.reactComponent(targetablesPath);

    //Region code type is number on checkout page
    billingAddressGraphQl.insertAfterSource(
        `shippingAddresses: shipping_addresses {`,
        `
                firstName: firstname
                lastName: lastname
                country {
                    code
                }
                street
                city
                region {
                    code
                    region_id
                }
                postcode
                phoneNumber: telephone`,
        { remove: 317 }
    );
    billingAddressGraphQl.insertAfterSource(
        `billingAddress: billing_address {`,
        `
                firstName: firstname
                lastName: lastname
                country {
                    code
                }
                street
                city
                region {
                    code
                    region_id
                }
                postcode
                phoneNumber: telephone`,
        { remove: 317 }
    );
    billingAddressGraphQl.insertAfterSource(
        `telephone: $phoneNumber`,
        `
                region_id: $region_id`
    );
    billingAddressGraphQl.insertAfterSource(
        `$city: String!`,
        `
        $region: String
        $region_id: Int`,
        { remove: 25 }
    );
};
