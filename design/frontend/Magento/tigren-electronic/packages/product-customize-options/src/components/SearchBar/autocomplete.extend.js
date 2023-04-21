module.exports = (targetables, targetablePath) => {
    const autoCompleteComponent = targetables.reactComponent(targetablePath);

    autoCompleteComponent.insertAfterSource(
        `items {`,
        `
                ... on CustomizableProductInterface {
                    options {
                        required
                    }
                }`
    );
};
