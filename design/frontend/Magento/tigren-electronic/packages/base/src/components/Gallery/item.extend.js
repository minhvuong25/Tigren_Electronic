module.exports = (targetables, targetablePath) => {
    const itemGallery = targetables.reactComponent(targetablePath);

    itemGallery.insertBeforeSource(
        `value={price_range.maximum_price.regular_price.value}`,
        `
                    type={'full'}
                    product={item}
                    layout={'listPage'}
                    `
    );
};
