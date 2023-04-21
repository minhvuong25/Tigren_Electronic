const addToCartGA4 = (product = '', quantity) => {
    const price = product?.price_range?.minimum_price?.final_price?.value;
    const currencyCode =
        product?.price_range?.minimum_price?.final_price?.currency;

    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    affiliation: null,
                    coupon: null,
                    currency: currencyCode || 'USD',
                    discount: null,
                    index: 0,
                    item_brand: null,
                    item_category: null,
                    item_list_id: null,
                    item_list_name: null,
                    item_variant: null,
                    location_id: null,
                    price,
                    quantity: quantity
                }
            ]
        }
    });
};

export default addToCartGA4;
