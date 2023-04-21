module.exports = targetables => {
    const verticalTabComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Tabs/VerticalTab/verticaltab.js'
    );
    verticalTabComponent.addImport(
        `extendClasses from 'src/components/Tabs/VerticalTab/verticalTab.module.css'`
    );
    verticalTabComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `const classItemList =`,
            `let classIcon = classes.icon;
            const CUSTOMER_ICON = {
                "/customer/account": classes.account,
                "/customer/account/edit": classes.accountEdit,
                "/customer/address": classes.accountAddress,
                "/sales/order/history": classes.orderHistory,
                "/wishlist": classes.wishlist,
                "/review/customer": classes.reviewCustomer,
                "/customer/account/logout": classes.accountLogout
            };
                `
        )
        .insertBeforeSource(
            `<span className={classes.label}>{label}</span>`,
            `<span className={CUSTOMER_ICON[currentTabDetails.path.toString().toLowerCase()]}></span>`
        );
};
