const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

module.exports = targets => {
    const targetables = Targetables.using(targets);
    const footer = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Footer/footer.js'
    );
    const NavMobile = footer.addReactLazyImport(
        '@tigrensolutions/mobile-navigation/src/components/NavMobile'
    );

    footer.addImport("{ Suspense } from 'react'");
    footer.insertBeforeSource(
        `<Link to={resourceUrl('/')} className={classes.logoContainer}>
                    <Logo classes={{ logo: classes.logo }} />
                </Link>`,
        `<Suspense fallback={null}>
            <${NavMobile} />
        </Suspense>`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const footer = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Footer/footer.js'
        );
        const NavMobile = footer.addReactLazyImport(
            '@tigrensolutions/mobile-navigation/src/components/NavMobile'
        );

        footer.addImport("{ Suspense } from 'react'");
        footer.insertBeforeSource(
            `<div className={classes.branding}>
                <p className={classes.copyright}>{copyrightText || null}</p>
            </div>`,
            `<Suspense fallback={null}>
            <${NavMobile} />
        </Suspense>`
        );
        const useNavMobile = targetables.esModule(
            `@tigrensolutions/mobile-navigation/src/talons/useNavMobile.js`
        );

        useNavMobile
            .insertBeforeSource(`/cart':`, ` /checkout`)
            .insertBeforeSource(`/sign-in`, `/customer/account/login`, {
                remove: 8
            })
            .insertBeforeSource(`/account-information`, `/customer/account`, {
                remove: 20
            })
            .insertBeforeSource(`/cart')`, `/checkout`);
    }
};
