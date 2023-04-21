module.exports = (targetables, targetablesPath) => {
    const searchPageTalons = targetables.reactComponent(targetablesPath);

    // fix search filter set pageSize 1 not work
    searchPageTalons.insertAfterSource(`setCurrentPage(1, `, `false`, {
        remove: 4
    });
};
