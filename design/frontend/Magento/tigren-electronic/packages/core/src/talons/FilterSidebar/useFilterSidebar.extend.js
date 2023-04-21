module.exports = (targetables, targetablePath) => {
    const useFilterSidebar = targetables.reactComponent(targetablePath);
    useFilterSidebar.insertBeforeSource(`if (pathname !==`, ``, { remove: 85 });
    useFilterSidebar.insertAfterSource(`{ label, value`, `, is_boolean_filter`);
    useFilterSidebar.insertAfterSource(
        `items.push({`,
        `label: is_boolean_filter ? name + ':' + label : label,`
    );
};
