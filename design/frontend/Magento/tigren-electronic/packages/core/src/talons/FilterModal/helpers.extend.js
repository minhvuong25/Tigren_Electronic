module.exports = (targetables, targetablesPath) => {
    const filterHelpers = targetables.reactComponent(targetablesPath);
    filterHelpers.insertAfterSource(
        `if (b['attribute_code'] === 'category_id') {
            return 1;
        }`,
        `

        // Place Price filter second
        if (a['attribute_code'].includes('price')) {
            return -1;
        }
        if (b['attribute_code'].includes('price')) {
            return 1;
        }

        return 0;`
    );
};
