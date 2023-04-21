module.exports = targetables => {
    const tabsComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Tabs/tabs.js'
    );
    tabsComponent.addImport(
        `extendClasses from 'src/components/Tabs/tabs.module.css'`
    );
    tabsComponent.addImport(`{ useIntl } from 'react-intl';`);
    tabsComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `const tabRootClass =`,
            `
            const { formatMessage } = useIntl();
            let welcomeText;
            if (!currentUser || !currentUser.firstname) {
                welcomeText = "Hi";
            } else {
                welcomeText = formatMessage(
                        { id: 'accountChip.chipText', defaultMessage: 'Hi, {name}' },
                        { name: currentUser.firstname + ' ' + currentUser.lastname }
                );
            }
            `
        )
        .insertAfterSource(
            `<div className={classes.verticalTabContainer}>`,
            `<span className={classes.welcome}>
                    {welcomeText}
                    </span>
                    `
        );
};
