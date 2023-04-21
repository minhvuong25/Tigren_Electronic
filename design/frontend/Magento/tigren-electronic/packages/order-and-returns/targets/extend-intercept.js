const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    const HeaderComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Header/header.js'
    );
    const OrderAndReturnsComponent = HeaderComponent.addReactLazyImport(
        '@tigrensolutions/order-and-returns/src/components/OrderAndReturnsButton'
    );
    HeaderComponent.insertBeforeSource(
        '<div className={classes.switchersContainer}>',
        `<Suspense fallback={null}>
            <${OrderAndReturnsComponent} />
        </Suspense>`
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        const HeaderComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Header/header.js'
        );
        const OrderAndReturnsHeaderComponent = HeaderComponent.addReactLazyImport(
            '@tigrensolutions/order-and-returns/src/components/OrderAndReturnsButton'
        );
        HeaderComponent.insertBeforeSource(
            '<div className={classes.current}',
            `<Suspense fallback={null}>
            <${OrderAndReturnsHeaderComponent} />
        </Suspense>`
        );

        const NavigationComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/Navigation/navigation.js'
        );
        NavigationComponent.insertBeforeSource(
            `const Navigation = props => {`,
            `const OrderAndReturnsButton = React.lazy(() =>
    import('@tigrensolutions/order-and-returns/src/components/OrderAndReturnsButton')
);

`
        );
        NavigationComponent.insertBeforeSource(
            `<div className={classes.switchers}`,
            `<Suspense fallback={null}>
            <OrderAndReturnsButton classes={classes} />
        </Suspense>`
        );
    }
};
