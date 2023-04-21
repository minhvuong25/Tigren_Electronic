module.exports = (targetables, targetablePath) => {
    const guestForm = targetables.reactComponent(targetablePath);

    guestForm
        .insertAfterSource(
            'const GuestForm = ',
            'React.forwardRef((props, ref)',
            { remove: 5 }
        )
        .insertAfterSource(
            `);
}`,
            ')'
        );

    guestForm.addImport("{ useState } from 'react'");
    guestForm.addImport("{ useImperativeHandle } from 'react'");
    guestForm.insertBeforeSource(
        'const classes',
        `

    useImperativeHandle(
        ref,
        () => {
            return {
                handleSubmit: () => formApiRef.current.submitForm(),
                isLoading: isSaving
            };
        },
        [formApiRef, isSaving]
    );
    `
    );

    //hide button
    guestForm
        .insertBeforeSource(`<div className={classes.buttons`, '{isUpdate ? (')
        .insertAfterSource(
            `<div className={classes.buttons}>
                    {cancelButton}
                    <Button
                        {...submitButtonProps}
                        data-cy="GuestForm-submitButton"
                    >
                        {submitButtonText}
                    </Button>
                </div>`,
            ') : null}'
        );
};
