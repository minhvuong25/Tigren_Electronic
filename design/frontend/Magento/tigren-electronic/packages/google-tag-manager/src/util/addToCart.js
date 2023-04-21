const addToCart = (product = '', quantity) => {
    const price = product?.price_range?.minimum_price?.final_price?.value;
    const currencyCode =
        product?.price_range?.minimum_price?.final_price?.currency;
    
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
        event: 'addToCart',
        ecommerce: {
            currencyCode: currencyCode || 'USD',
            add: {
                products: [
                    {
                        name: product.name,
                        id: product.id,
                        price: price,
                        brand: null,
                        category: null,
                        variant: null,
                        quantity: quantity
                    }
                ]
            }
        }
    });
};

export default addToCart;
