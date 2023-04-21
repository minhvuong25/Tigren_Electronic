module.exports = (targetables, targetablePath) => {
    const headerComponent = targetables.reactComponent(targetablePath);
    headerComponent.addImport(
        `CustomLogo from '@tigrensolutions/base/src/components/Logo/logo.js'`
    );
    headerComponent.insertAfterSource(
        `<Link
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                    >`,
        `
                        <CustomLogo classes={{ logo: classes.logo }} />`,
        { remove: 66 }
    );
};
