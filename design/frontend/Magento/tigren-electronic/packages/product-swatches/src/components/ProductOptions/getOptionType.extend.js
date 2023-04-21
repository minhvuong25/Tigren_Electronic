module.exports = (targetables, targetablePath) => {
    const getOptionsType = targetables.esModule(targetablePath);

    getOptionsType.insertAfterSource(
        `fashion_color: 'swatch'`,
        `,
        color: 'swatch'`
    );
};
