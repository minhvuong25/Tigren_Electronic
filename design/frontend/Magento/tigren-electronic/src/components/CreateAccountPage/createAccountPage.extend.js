module.exports = targetables => {
    const createAccountPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CreateAccountPage/createAccountPage.js'
    );
    createAccountPageComponent.addImport(
        `extendClasses from 'src/components/CreateAccountPage/createAccountPage.module.css'`
    );
    createAccountPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
