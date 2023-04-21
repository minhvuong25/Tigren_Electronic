module.exports = targetables => {
    const signInPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SignInPage/signInPage.js'
    );
    signInPageComponent.addImport(
        `extendClasses from 'src/components/SignInPage/signInPage.module.css'`
    );
    signInPageComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<Breadcrumbs`,
            `<Breadcrumbs
                staticPart={formatMessage({
                    id: 'signInPage.login',
                    defaultMessage: 'Login'
                })}
            />`,
            {
                remove: 181
            }
        )
        .insertBeforeSource(`signInPage.title`, `signInPage.loginTitle`, {
            remove: 16
        })
        .insertBeforeSource(
            `<FormattedMessage
                            id="signInPage.title"
                            defaultMessage="Sign In"
                        />`,
            `<FormattedMessage
                            id="signInPage.loginTitle"
                            defaultMessage="Sign In"
                        />`,
            { remove: 147 }
        );
};
