module.exports = targetables => {
    // auto show
    const compareComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/ComparePopup/comparePopup.js'
    );
    compareComponent.insertAfterSource(
        `<span className={classes.textLabel}>`,
        ``,
        {
            remove: 536
        }
    );

    compareComponent.insertAfterSource(
        `<span className={classes.textLabel}>`,
        `{compareItems.length || '0'}`
    );
    compareComponent.insertAfterSource(
        `useMemo(() => {
        return (
            `,
        `true`,
        { remove: 23 }
    );
    compareComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/ComparePopup/comparePopup.module.css'`
    );
    compareComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
    const compareButtonComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/AddToCompareButton/addToCompare.js'
    );
    compareButtonComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/CompareButton/compareButton.module.css'`
    );
    compareButtonComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );

    const comparePageComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/ComparePage/comparePage.js'
    );
    comparePageComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/ComparePage/comparePage.module.css'`
    );
    comparePageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );

    const itemsComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/ComparePage/CompareProduct/items.js'
    );
    itemsComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/ComparePage/CompareProduct/items.module.css'`
    );
    itemsComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );

    const itemComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/ComparePage/CompareProduct/item.js'
    );
    itemComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/ComparePage/CompareProduct/item.module.css'`
    );
    itemComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );

    const compareListComponent = targetables.reactComponent(
        '@tigrensolutions/compare/src/components/ComparePage/CompareProduct/list.js'
    );
    compareListComponent.addImport(
        `extendsClasses from 'extend/tigren/compare/src/components/ComparePage/CompareProduct/list.module.css'`
    );
    compareListComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        `, extendsClasses`
    );
};
