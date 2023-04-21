module.exports = targetables => {
    const signInPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SignIn/signIn.js'
    );
    signInPageComponent.addImport(
        `extendClasses from 'src/components/SignIn/signIn.module.css'`
    );
    signInPageComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `id={'signInPage.title'}
                            defaultMessage={'Sign In'}`,
            `id={'signInPage.loginTitle'}
                            defaultMessage={'Log In'}`,
            {
                remove: 78
            }
        )
        .insertBeforeSource(`signIn.signInText`, `signInPage.loginTitle`, {
            remove: 17
        })
        .insertBeforeSource(
            `isToggleButtonHidden={true}`,
            `isToggleButtonHidden={false}`,
            {
                remove: 27
            }
        );
};
