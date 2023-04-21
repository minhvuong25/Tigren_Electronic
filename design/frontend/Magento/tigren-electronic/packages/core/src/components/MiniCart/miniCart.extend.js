module.exports = targets => {
    const miniCartComponent = targets.reactComponent(
        '@magento/venia-ui/lib/components/MiniCart/miniCart.js'
    );
    miniCartComponent.insertBeforeSource(`useScrollLock(isOpen);`, '', {
        remove: 22
    });
};
