/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

module.exports = (targetables, targetablePath) => {
    const configAggregator = targetables.esModule(targetablePath);

    configAggregator.wrapWithFile(
        `@tigrensolutions/pagebuilder/src/ContentTypes/Products/wrapConfigAggregator.js`
    );
};
