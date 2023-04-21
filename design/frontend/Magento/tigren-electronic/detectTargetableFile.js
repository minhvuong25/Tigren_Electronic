const coreOverrideMap = require('@tigrensolutions/core/overrideMapping.js');

const getFullPath = (package = 'core|venia|classic', extendPath = '') => {
    let packageName = `@tigrensolutions/${package}/src`;

    if (package === 'venia') {
        const talonRegex = /talons\/(.*)\//s;
        const isTalon = talonRegex.test(extendPath);

        packageName = isTalon
            ? '@magento/peregrine/lib'
            : '@magento/venia-ui/lib';
    }

    return (
        packageName +
        '/' +
        extendPath.replace('src/', '').replace('.extend.', '.')
    );
};

const isInOverrideMap = (fullPath, overrideMap) => {
    const { components } = overrideMap;

    // no .js, no index.js,
    const pathWithNoJSExt = fullPath.replace('.js', '');
    const pathWithNoIndexJS = fullPath.replace('/index.js', '');

    return (
        components[fullPath] ||
        components[pathWithNoJSExt] ||
        components[pathWithNoIndexJS]
    );
};

const detectTargetableFile = path => {
    const fullPathCore = getFullPath('core', path);
    const fullPathVenia = getFullPath('venia', path);

    let useablePath = fullPathVenia;

    if (isInOverrideMap(fullPathVenia, coreOverrideMap)) {
        useablePath = fullPathCore;
    }

    return useablePath;
};

module.exports = detectTargetableFile;
