module.exports = targetables => {
    const accountInformationPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/AccountInformationPage/accountInformationPage.js'
    );
    accountInformationPageComponent.addImport(
        `extendClasses from 'src/components/AccountInformationPage/accountInformationPage.module.css'`
    );
    accountInformationPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
