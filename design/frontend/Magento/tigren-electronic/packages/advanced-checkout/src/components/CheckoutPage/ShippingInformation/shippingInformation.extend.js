module.exports = (targetables, targetablePath) => {
    const shippingInformation = targetables.reactComponent(targetablePath);

    shippingInformation.addImport(
        "ShippingInformationShimmer from '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingInformation/shippingInformation.shimmer.js'"
    );

    shippingInformation.insertAfterSource(
        'if (isLoading) {',
        'return <ShippingInformationShimmer />;',
        { remove: 307 }
    );

    shippingInformation.removeJSX('Card shippingData={shippingData} ');
    shippingInformation.removeJSX('div className={classes.cardHeader}');
    const shippingAddress = shippingInformation.addReactLazyImport(
        '@tigrensolutions/advanced-checkout/src/components/CheckoutPage/ShippingInformation/shippingAddress.js'
    );

    shippingInformation
        .insertAfterSource(
            '<Card shippingData={shippingData} />',
            `
                <Suspense fallback={null}>
                    <${shippingAddress}
                        onSuccess={onSuccess}
                        toggleActiveContent={toggleActiveContent}
                        doneEditing={doneEditing}
                        handleEditShipping={handleEditShipping}
                        isSignedIn={isSignedIn}
                        shippingData={shippingData}
                    />
                </Suspense>
                `
        )
        .insertBeforeSource('editModal}', `!isSignedIn && `);
};
