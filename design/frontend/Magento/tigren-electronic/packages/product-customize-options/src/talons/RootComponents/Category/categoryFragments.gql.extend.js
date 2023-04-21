module.exports = (targetables, targetablePath) => {
    const categoryPageQuery = targetables.reactComponent(targetablePath);

    categoryPageQuery.insertBeforeSource(
        `uid
            name`,
        `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
    );
};
