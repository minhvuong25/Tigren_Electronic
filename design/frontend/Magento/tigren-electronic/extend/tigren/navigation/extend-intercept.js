module.exports = targetables => {
    const navMobileComponent = targetables.reactComponent(
        '@tigrensolutions/mobile-navigation/src/components/NavMobile/navMobile.js'
    );
    navMobileComponent.addImport(
        `extendsClasses from 'extend/tigren/navigation/src/components/NavMobile/navMobile.module.css'`
    );
    navMobileComponent.insertAfterSource(
        `useStyle(defaultClasses, props.classes`,
        `, extendsClasses`
    );
    const searchPopupComponent = targetables.reactComponent(
        '@tigrensolutions/mobile-navigation/src/components/SearchPopup/searchPopup.js'
    );
    searchPopupComponent.addImport(
        `extendsClasses from 'extend/tigren/navigation/src/components/SearchPopup/searchPopup.module.css'`
    );
    searchPopupComponent.insertAfterSource(
        `useStyle(defaultClasses, propClasses`,
        `, extendsClasses`
    );
};
