module.exports = targetables => {
    const orderHistoryPageComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/OrderHistoryPage/orderHistoryPage.js'
    );
    orderHistoryPageComponent.addImport(
        `extendClasses from 'src/components/OrderHistoryPage/orderHistoryPage.module.css'`
    );
    orderHistoryPageComponent.insertAfterSource(
        `defaultClasses, props.classes`,
        ', extendClasses'
    );
    orderHistoryPageComponent.insertBeforeSource(
        `<div className={classes.titleTable} />`,
        `<div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.action'}
                                    defaultMessage={'Action'}
                                />
                            </h5>
                        </div>`,
        {
            remove: 38
        }
    );
};
