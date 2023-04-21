/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

module.exports = (targetables, targetablePath) => {
    const useBreadcrumbs = targetables.esModule(targetablePath); // @magento/peregrine/lib/talons/Breadcrumbs/useBreadcrumbs.js
    useBreadcrumbs
        .insertAfterSource(
            `if (!loading && data`,
            `?.categories?.items?.length > 0`
        )
        .insertAfterSource(
            `currentCategory: (data`,
            `?.categories?.items?.length > 0`
        )
        .insertAfterSource(
            `currentCategoryPath:
            (data`,
            `?.categories?.items?.length > 0`
        );
};
