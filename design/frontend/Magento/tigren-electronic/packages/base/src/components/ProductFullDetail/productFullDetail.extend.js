module.exports = (targetables, targetablePath) => {
    const productFullDetail = targetables.reactComponent(targetablePath);

    productFullDetail.insertAfterSource(
        `currencyCode={productDetails.price.currency}`,
        `
                    type={'full'}
                    product={product}`
    );
};
