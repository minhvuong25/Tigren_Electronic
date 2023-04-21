module.exports = (targetables, targetablePath) => {
    const message = targetables.reactComponent(targetablePath);
    message.addImport(
        "customClasses from '@tigrensolutions/core/src/components/Field/message.module.css'"
    );
    message.insertAfterSource('useStyle(defaultClasses', ', customClasses');
};
