const detectTargetableFile = path => {
    const talonRegex = /talons\/(.*)\//s;
    const isTalon = talonRegex.test(path);

    const packageName = isTalon
        ? '@magento/peregrine/lib'
        : '@magento/pagebuilder/lib';

    return (
        packageName + '/' + path.replace('src/', '').replace('.extend.', '.')
    );
};

module.exports = detectTargetableFile;
