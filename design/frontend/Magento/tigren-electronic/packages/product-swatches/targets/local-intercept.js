const extendIntercept = require('./extend-intercept');
const path = require('path');
const glob = require('glob');
const detectTargetableFile = require('./detectTargetableFile');
const { Targetables } = require('@magento/pwa-buildpack');

const handlePackageIntercepts = targets => {
    const targetables = Targetables.using(targets);
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

    /*
     * Peregrine will dynamically inject the code from the passed module "around" the implementation of a talon,
     * by passing the talon function through the wrapper function before exporting it.
     * @see https://developer.adobe.com/commerce/pwa-studio/api/peregrine/targets/
     */
    const peregrineTargets = targets.of('@magento/peregrine');
    const talonsTarget = peregrineTargets.talons;

    talonsTarget.tap(talons => {
        talons.FilterSidebar.useFilterSidebar.wrapWith(
            '@tigrensolutions/product-swatches/targets/wrapUseFilterSidebar'
        );
    });

    handlePackageIntercepts(targets);

    extendIntercept(targets);
};
