module.exports = targetables => {
    const dialog = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Dialog/dialog.js'
    );

    dialog.addImport(
        "customClasses from '@tigrensolutions/core/src/components/Dialog/dialog.module.css'"
    );
    dialog.insertAfterSource('useStyle(defaultClasses', ', customClasses');

    dialog.insertBeforeSource(
        '} = props;',
        `,
        disableForm = false,
        `
    );
    dialog.insertBeforeSource(
        'const maybeForm =',
        `const maybeContent =
        (isOpen || !shouldUnmountOnHide) && disableForm ? (
            <div className={classes.form}>
                {/* The Mask. */}
                <button
                    className={classes.mask}
                    disabled={isMaskDisabled}
                    onClick={onCancel}
                    type="reset"
                />
                {/* The Dialog. */}
                <div className={classes.dialog} data-cy={title}>
                    <div className={classes.header}>
                        <span
                            className={classes.headerText}
                            data-cy="Dialog-headerText"
                        >
                            {title}
                        </span>
                        {maybeCloseXButton}
                    </div>
                    <div className={classes.body}>
                        <div className={classes.contents}>{children}</div>
                        {maybeButtons}
                    </div>
                </div>
            </div>
        ) : null;
        `
    );

    dialog.insertBeforeSource('maybeForm}', 'disableForm ? maybeContent : ');
};
