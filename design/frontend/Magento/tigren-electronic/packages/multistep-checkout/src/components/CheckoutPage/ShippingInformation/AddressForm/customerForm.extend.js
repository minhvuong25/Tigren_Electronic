module.exports = (targetables, targetablePath) => {
    const customerForm = targetables.reactComponent(targetablePath);

    customerForm
        .insertAfterSource(
            'const CustomerForm = ',
            'React.forwardRef((props, ref)',
            { remove: 5 }
        )
        .insertAfterSource(
            `);
}`,
            ')'
        );

    customerForm.addImport("{ useState } from 'react'");
    customerForm.addImport("{ useImperativeHandle } from 'react'");

    customerForm.insertAfterSource(
        '} = talonProps;',
        `
        const [formApi, setFormApi] = useState();

    useImperativeHandle(
        ref,
        () => {
            return {
                handleSubmit: () => formApi.submitForm(),
                isLoading: isLoading || isSaving
            };
        },
        [formApi, isLoading, isSaving]
    );
    `
    );

    //hide button
    customerForm
        .insertBeforeSource(
            `<div className={classes.buttons`,
            '{hasDefaultShipping ? ('
        )
        .insertAfterSource(
            `<div className={classes.buttons}>
                    {cancelButton}
                    <Button
                        {...submitButtonProps}
                        data-cy="CustomerForm-submitButton"
                    >
                        {submitButtonText}
                    </Button>
                </div>`,
            ') : null}'
        );

    customerForm.setJSXProps('Form', { getApi: '{setFormApi}' });
};
