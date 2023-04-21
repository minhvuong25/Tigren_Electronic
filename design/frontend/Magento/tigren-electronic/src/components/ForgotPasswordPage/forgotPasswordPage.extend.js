module.exports = targetables => {
    const forgotPasswordPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/ForgotPasswordPage/forgotPasswordPage.js'
    );
    forgotPasswordPageComponent.addImport(
        `extendClasses from 'src/components/ForgotPasswordPage/forgotPasswordPage.module.css'`
    );
    forgotPasswordPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
