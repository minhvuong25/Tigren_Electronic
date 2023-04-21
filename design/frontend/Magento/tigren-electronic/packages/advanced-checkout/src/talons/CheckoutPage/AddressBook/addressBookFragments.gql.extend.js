module.exports = (targetables, targetablesPath) => {
    const addressBookFragment = targetables.reactComponent(targetablesPath);

    addressBookFragment.insertAfterSource(
        `CustomerAddress {`,
        `
        country_name`
    );
};
