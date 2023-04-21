const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    if (isModuleAvailable('@tigrensolutions/core')) {
        const failrue = targetables.esModule(
            `@tigrensolutions/failure-page/src/components/CheckoutFailure/failure.js`
        );

        failrue.insertBeforeSource(`/order-history`, `/sales/order/history`, {
            remove: 14
        });
    }
};
