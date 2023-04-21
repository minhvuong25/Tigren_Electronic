module.exports = targetables => {
    const suggestedProduct = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SearchBar/suggestedProduct.js'
    );
    suggestedProduct.addImport(
        'extendClasses from "src/components/SearchBar/suggestedProduct.module.css"'
    );
    suggestedProduct.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendClasses`
    );
};
