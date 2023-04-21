/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

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
        const orderDetails = targetables.esModule(
            `@tigrensolutions/thank-you-page/src/components/CheckoutSuccess/OrderDetails/orderDetails.js`
        );

        orderDetails.insertAfterSource(
            `const orderUrl = isSignedIn ?`,
            " `/sales/order/view/order_id/${orderNumber}` : '/customer/account/login';",
            { remove: 31 }
        );

        const checkoutSuccess = targetables.esModule(
            `@tigrensolutions/thank-you-page/src/components/CheckoutSuccess/checkoutSuccess.js`
        );

        checkoutSuccess.insertBeforeSource(
            `account-information`,
            `customer/account`,
            { remove: 19 }
        );
        checkoutSuccess.insertBeforeSource(`cart`, `checkout/`);
    }
};
