module.exports = (targetables, targetablePath) => {
    const field = targetables.reactComponent(targetablePath);
    field.insertBeforeSource(
        'const optionalSymbol = optional ? (',
        `
        let itemValidate = []
        if( children && children['props']) {
            const items = children && children['props'];
            const validOne = items && items.field && items.validate;
            if(!!validOne) {
                itemValidate.push(items && items.field && items.validate);
            }
        } else if(children && children.length && children.length > 1) {
            children.map(item => {
                const valid = item && item['props'] && item['props'].field && item['props'].validate;
                if(!!valid) {
                    itemValidate.push(valid);
                }
            })
        }

        const requireSymbol = (!!itemValidate && itemValidate.length > 0 ) || props.isRequired ? (
            <span className={classes.requiredSymbol}>*</span>
        ) : null;

        const hiddenClass = props.isHidden ? classes.hidden : '';
    `
    );
    field.insertAfterSource('{optionalSymbol}', '{requireSymbol}');

    field.insertAfterSource('className={classes.root', " + ' ' + hiddenClass");

    field.addImport(
        "customClasses from '@tigrensolutions/core/src/components/Field/field.module.css'"
    );
    field.insertAfterSource('useStyle(defaultClasses', ', customClasses');
};
