module.exports = targetables => {
    const footerComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Footer/footer.js'
    );
    footerComponent.addImport(
        `extendClasses from 'src/components/Footer/footer.module.css'`
    );
    footerComponent
        .insertAfterSource(`defaultClasses, props.classes`, `, extendClasses`)
        .insertAfterSource(
            `<div className={classes.footerTop}>`,
            `<div className={classes.newsletters}>
                        <Newsletter />
                    </div>`,
            { remove: 138 }
        )
        .insertBeforeSource(`<div className={classes.social}>`, ``, {
            remove: 336
        });
};
