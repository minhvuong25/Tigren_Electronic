/**
 * This file is augmented at build time using the @magento/pagebuilder build
 * target "customContentTypes", which allows third-party modules to add
 * content types rendering strategies to the PageBuilder component.
 */
import React from 'react';

import categoryConfigAggregator from '@tigrensolutions/pagebuilder/src/ContentTypes/Category/configAggregator';

export default {
    name: 'category',
    component: React.lazy(() =>
        import('@tigrensolutions/pagebuilder/src/ContentTypes/Category/category')
    ),
    configAggregator: categoryConfigAggregator
};
