module.exports = targetables => {
    const navTriggerComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Header/navTrigger.js'
    );
    navTriggerComponent.addImport(
        `extendClasses from 'src/components/Header/navTrigger.module.css'`
    );
    navTriggerComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
};
