module.exports = (targetables, targetablePath) => {
    const searchPageQuery = targetables.reactComponent(targetablePath);

    searchPageQuery.insertBeforeSource(
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
