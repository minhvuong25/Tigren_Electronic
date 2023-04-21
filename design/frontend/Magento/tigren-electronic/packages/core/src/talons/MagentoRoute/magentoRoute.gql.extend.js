module.exports = targetables => {
    const productDetailFragment = targetables.reactComponent(
        `@magento/peregrine/lib/talons/MagentoRoute/magentoRoute.gql.js`
    );
    productDetailFragment.insertAfterSource(
        `redirect_code`,
        `
            url_key`
    );
};
