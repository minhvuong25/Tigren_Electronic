const glob = require('glob');
const path = require('path');
const { Targetables } = require('@magento/pwa-buildpack');
const detectTargetableFile = require('./detectTargetableFile');
const extendIntercept = require('./extend-intercept');

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
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(features => {
        features[targets.name] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true
        };
    });

    const peregrineTargets = targets.of('@magento/peregrine');

    const talonsTarget = peregrineTargets.talons;

    talonsTarget.tap(({ ProductFullDetail }) => {
        ProductFullDetail.useProductFullDetail.wrapWith(
            '@tigrensolutions/product-customize-options/src/talons/ProductFullDetail/wrapUseProductFullDetail.js'
        );
    });

    extendIntercept(targets);
    // Implement custom extensions
    const targetables = Targetables.using(targets);
    handlePackageIntercepts(targetables, targets);
};
