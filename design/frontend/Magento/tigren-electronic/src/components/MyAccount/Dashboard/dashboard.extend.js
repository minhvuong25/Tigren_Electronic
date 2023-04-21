module.exports = targetables => {
    const dashboardComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/MyAccount/Dashboard/dashboard.js'
    );
    dashboardComponent.addImport(
        `extendClasses from 'src/components/MyAccount/Dashboard/dashboard.module.css'`
    );
    dashboardComponent.addImport(`{ useHistory } from 'react-router-dom';`);
    dashboardComponent.addImport(
        `Button from '@magento/venia-ui/lib/components/Button';`
    );
    dashboardComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertAfterSource(
            `const talonProps = useDashboard();`,
            `
        const history = useHistory();
    `
        )
        .insertBeforeSource(`<Link to={'/customer/address'}>`, ``, {
            remove: 249
        })
        .insertBeforeSource(
            `</Fragment>`,
            `<div className={classes.manageAddress}>
                    <Button
                    priority="high"
                    onClick={() => history.push('/customer/address')}
                >
                    <FormattedMessage
                            id="dashboard.editAddressBook"
                            defaultMessage="Manage Addresses"
                        />
                </Button>
                </div>`
        )
        .insertBeforeSource(
            `<Link
                                        to={'/customer/account/edit'}
                                        `,
            `<Button
                    priority="high"
                    onClick={() => history.push('/customer/account/edit')}
                >
                    <FormattedMessage
                        id="global.edit"
                        defaultMessage="Edit"
                    />
                </Button>`,
            {
                remove: 450
            }
        )
        .insertBeforeSource(
            `<Link
                                to={'/customer/account/edit'}`,
            `<Button
                    priority="high"
                    onClick={() => history.push('/customer/account/edit')}
                >
                    <FormattedMessage
                        id="global.edit"
                        defaultMessage="Edit"
                    />
                </Button>`,
            {
                remove: 386
            }
        )
        .insertBeforeSource(
            `<LinkButton`,
            `<Button
                    priority="high"
                    onClick={handleChangePassword}
                    class={classes.changePassword}
                >
                    <FormattedMessage
                        id="dashboard.changePassword"
                        defaultMessage="Change Password"
                    />
            </Button>`,
            { remove: 493 }
        );
};
