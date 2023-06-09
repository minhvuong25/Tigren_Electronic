/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

const path = require('path');
const glob = require('glob');
const extendIntercept = require('./extend-intercept');
const { Targetables } = require('@magento/pwa-buildpack');
const detectTargetableFile = require('./detectTargetableFile');
const isModuleAvailable = require(`@tigrensolutions/base/helpers/isModuleAvailable`);
const handlePackageIntercepts = targetables => {
    const currentPath = path.resolve(__dirname, '../');

    const extendInterceptPaths = glob.sync(
        `${currentPath}/src/**/*.extend.js`,
        {
            ignore: [currentPath + '/node_modules/**', currentPath + '/.git/**']
        }
    );

    for (const extendInterceptPath of extendInterceptPaths) {
        const targetablePath = detectTargetableFile(
            extendInterceptPath.replace(`${currentPath}/`, '')
        );
        require(path.resolve(extendInterceptPath))(targetables, targetablePath);
    }
};
module.exports = targets => {
    /*
     * Here we explicitly list the modules that is used on the extensions.
     * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/webpack/configure/
     */
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(features => {
        features[targets.name] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true
        };
    });

    //Review Page For venia
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Product Review',
            pattern: '/review/customer',
            path: require.resolve('../src/components/ReviewPage/reviewPage.js')
        });
        routes.push({
            name: 'Product Review',
            pattern: '/review/customer/view/review_id/:id',
            path: require.resolve(
                '../src/components/ReviewPage/ReviewDetail/reviewDetail.js'
            )
        });
        return routes;
    });

    if (isModuleAvailable('@tigrensolutions/core')) {
        targets.of('@magento/venia-ui').routes.tap(routes => {
            routes.push({
                name: 'Product Review',
                pattern: '/review/customer',
                path: require.resolve('@tigrensolutions/core/src/components/MyAccount')
            });
            routes.push({
                name: 'Product Review',
                pattern: '/review/customer/view/review_id/:id',
                path: require.resolve(
                    '@tigrensolutions/core/src/components/MyAccount'
                )
            });
            return routes;
        });
    }

    extendIntercept(targets);

    // Implement custom extensions
    const targetables = Targetables.using(targets);
    handlePackageIntercepts(targetables, targets);
};
