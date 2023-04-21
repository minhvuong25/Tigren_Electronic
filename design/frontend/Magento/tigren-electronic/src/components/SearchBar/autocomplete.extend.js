module.exports = targetables => {
    const autocomplete = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchBar/autocomplete.js'
    );
    autocomplete.addImport(
        'extendClasses from "src/components/SearchBar/autocomplete.module.css"'
    );
    autocomplete.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendClasses`
    );
};
