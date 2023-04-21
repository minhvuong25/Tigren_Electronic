module.exports = targetables => {
    const miniCartComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/MiniCart/miniCart.js'
    );
    miniCartComponent.addImport(
        `extendClasses from 'src/components/MiniCart/miniCart.module.css'`
    );
    miniCartComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
    miniCartComponent
        .insertBeforeSource(
            `<div className={classes.header}>{header}</div>`,
            ``,
            {
                remove: 46
            }
        )
        .insertBeforeSource(
            `<div className={classes.footer}>`,
            `<div className={classes.header}>{header}</div>`
        )
        .insertBeforeSource(
            `onClick={handleEditCart}
                    priority="high"`,
            ``,
            {
                remove: 60
            }
        )
        .insertBeforeSource(
            `className={classes.editCartButton}`,
            `
                    onClick={handleEditCart}
                    priority="low"
                    `
        );
};
