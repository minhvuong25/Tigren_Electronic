module.exports = targetables => {
    const useCartTrigger = targetables.reactComponent(
        '@magento/peregrine/lib/talons/Header/useCartTrigger.js'
    );

    useCartTrigger.wrapWithFile(
        'useCartTrigger',
        'src/talons/Header/wrapUseCartTrigger.js'
    );
};
