module.exports = targetables => {
    const myAccountComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/MyAccount/myAccount.js'
    );
    myAccountComponent.addImport(
        `extendClasses from 'src/components/MyAccount/myAccount.module.css'`
    );
    myAccountComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
