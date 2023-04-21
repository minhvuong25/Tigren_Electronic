/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

const glob = require('glob');
const path = require('path');
const { Targetables } = require('@magento/pwa-buildpack');
const moduleOverridePlugin = require('@tigrensolutions/core/moduleOverrideWebpackPlugin');
const { components: componentOverrideMapping } = require('./overrideMapping');
const detectTargetableFile = require('./detectTargetableFile');

const handlePackageIntercepts = (targetables, targets) => {
    const currentPath = path.resolve(__dirname);

    const extendInterceptPaths = glob.sync(
        `${currentPath}/src/**/*.extend.js`,
        {
            ignore: ['**/node_modules/**', '**/.git/**']
        }
    );
    const extendInterceptPackages = glob.sync(
        `${currentPath}/extend/**/extend-intercept.js`
    );

    for (const extendInterceptPath of extendInterceptPaths) {
        const targetablePath = detectTargetableFile(
            extendInterceptPath.replace(`${currentPath}/`, '')
        );
        require(path.resolve(extendInterceptPath))(targetables, targetablePath);
    }

    for (const extendInterceptPackage of extendInterceptPackages) {
        require(extendInterceptPackage)(targetables, targets);
    }
};

module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });

    // Implement custom extensions
    const targetables = Targetables.using(targets);
    handlePackageIntercepts(targetables);
};
