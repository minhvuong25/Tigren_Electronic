/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

const { Targetables } = require('@magento/pwa-buildpack');
/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    //Check/Money payment method
    const checkmoGql = targetables.esModule(
        '@magento/venia-sample-payments-checkmo/src/talons/checkmo.gql.js'
    );
    checkmoGql.insertAfterSource(
        `store_code`,
        `
            payment_checkmo_payable_to
            payment_checkmo_mailing_address`,
        { remove: 99 }
    );
};
