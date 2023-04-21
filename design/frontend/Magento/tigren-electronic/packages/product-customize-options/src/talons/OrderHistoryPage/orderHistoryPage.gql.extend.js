module.exports = (targetables, targetablePath) => {
    const orderHistoryPageFragment = targetables.reactComponent(targetablePath);

    orderHistoryPageFragment.insertBeforeSource(
        `selected_options {`,
        `customize_options {
                    label
                    value
                }
                `
    );
};
