module.exports = targetables => {
    const orderRowComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/OrderHistoryPage/orderRow.js'
    );
    orderRowComponent.addImport(
        `extendClasses from 'src/components/OrderHistoryPage/orderRow.module.css'`
    );
    orderRowComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<div className={classes.orderTotalContainer}>
                <span className={classes.orderTotalLabel}>
                    <FormattedMessage
                        id={'orderHistoryPage.consignee'}
                        defaultMessage={'Consignee'}
                    />
                </span>
                <div className={classes.name}>{name}</div>
            </div>`,
            `<div className={classes.orderConsigneeContainer}>
                <span className={classes.orderConsigneeLabel}>
                    <FormattedMessage
                        id={'orderHistoryPage.consignee'}
                        defaultMessage={'Consignee'}
                    />
                </span>
                <div className={classes.name}>{name}</div>
            </div>`,
            {
                remove: 378
            }
        )
        .insertBeforeSource(
            `<div>
                <button`,
            `<div className={classes.button}>
                <button`,
            {
                remove: 29
            }
        );
};
