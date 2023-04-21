module.exports = (targetables, targetablePath) => {
    const currentFilter = targetables.reactComponent(targetablePath);
    currentFilter
        .insertBeforeSource(`item.title}`, `item.label ? item.label : `)
        .insertAfterSource(`name: `, `item.label ? item.label : `);
};
