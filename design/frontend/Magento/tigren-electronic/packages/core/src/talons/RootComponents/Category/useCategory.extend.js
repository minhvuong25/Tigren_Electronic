module.exports = (targetables, targetablePath) => {
    const useCategory = targetables.reactComponent(targetablePath);
    useCategory
        .insertBeforeSource(
            `newFilters['category_uid'] = { eq: id };`,
            `
        if(!newFilters['category_id']) {
        `
        )
        .insertAfterSource(
            `newFilters['category_uid'] = { eq: id };`,
            `
        }
        `
        );
};
