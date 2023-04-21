module.exports = (targetables, targetablePath) => {
    const shippingMethod = targetables.reactComponent(targetablePath);
    shippingMethod
        .insertAfterSource(
            'const ShippingMethod = ',
            'React.forwardRef((props, ref)',
            { remove: 5 }
        )
        .insertAfterSource(
            `return <Fragment>{contents}</Fragment>;
}`,
            ')'
        );

    shippingMethod.addImport("{ useState } from 'react'");
    shippingMethod.addImport("{ useImperativeHandle } from 'react'");
    shippingMethod.addImport(`{ useEffect } from 'react';`);
    shippingMethod.insertAfterSource(
        'let contents;',
        `
                const [formApi, setFormApi] = useState();

                useImperativeHandle(ref, () => {
                    return {
                        handleSubmit: () => formApi.submitForm(),
                        isLoading: pageIsUpdating || isLoading
                    };
                }, [formApi, pageIsUpdating, isLoading]);
                `
    );

    shippingMethod.removeJSX('div className={classes.formButtons}');

    shippingMethod.setJSXProps('Form', { getApi: '{setFormApi}' });
    shippingMethod
        .insertAfterSource(
            `useShippingMethod({
        onSave,`,
            `
        checkoutStep,
        setCheckoutStep,`
        )
        .insertAfterSource(
            `, setPageIsUpdating`,
            `, checkoutStep, setCheckoutStep, shippingMethodData, setShippingMethodData`
        )
        .insertAfterSource(
            `let contents;`,
            `
            useEffect(() => {
            setShippingMethodData(selectedShippingMethod);
        }, [])

        `
        );
};
