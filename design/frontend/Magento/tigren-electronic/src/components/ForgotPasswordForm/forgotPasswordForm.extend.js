module.exports = targetables => {
    const forgotPasswordFormComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/ForgotPassword/ForgotPasswordForm/forgotPasswordForm.js'
    );
    forgotPasswordFormComponent.addImport(
        `extendClasses from 'src/components/ForgotPasswordForm/forgotPasswordForm.module.css'`
    );
    forgotPasswordFormComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
