module.exports = targetables => {
    const addressCardComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/AddressBookPage/addressCard.js'
    );
    addressCardComponent.addImport(
        `extendClasses from 'src/components/AddressBookPage/addressCard.module.css'`
    );
    addressCardComponent.insertAfterSource(
        `defaultClasses, propClasses`,
        ', extendClasses'
    );
    addressCardComponent
        .insertBeforeSource(`{telephone}`, '{`T: ${telephone}`}', {
            remove: 11
        })
        .insertAfterSource(
            `<LinkButton
                    classes={{ root: classes.editButton }}
                    onClick={onEdit}
                >`,
            `
            <span className={classes.iconEdit} />
                `
        )
        .insertAfterSource(
            `<LinkButton
                classes={{ root: classes.deleteButton }}
                onClick={onDelete}
            >`,
            `
            <span className={classes.iconDelete} />
                `
        );
};
