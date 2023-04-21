import { useEffect } from 'react';
import { useGoogleTagManagerContext } from '../../context';

const productDetailImpressions = product => {
    const {
        google_tag_manager_general_enabled,
        google_tag_manager_general_enabled_ga4
    } = useGoogleTagManagerContext();

    useEffect(() => {
        if (google_tag_manager_general_enabled && product) {
            const { price } = product;
            const amount = price.regularPrice.amount;
            const category = product.categories[product.categories.length - 1];

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'productClick',
                ecommerce: {
                    click: {
                        actionField: {
                            list: category !== undefined ? category.name : ''
                        },
                        products: [
                            {
                                name: product.name,
                                id: product.id,
                                price: amount.value,
                                brand: null,
                                category:
                                    category !== undefined ? category.name : '',
                                variant: null,
                                position: 1
                            }
                        ]
                    }
                }
            });

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                ecommerce: {
                    detail: {
                        actionField: {
                            list: category !== undefined ? category.name : ''
                        },
                        products: [
                            {
                                name: product.name,
                                id: product.id,
                                price: amount.value,
                                brand: null,
                                category:
                                    category !== undefined ? category.name : '',
                                variant: null
                            }
                        ]
                    }
                }
            });
        }
    }, [product]);

    useEffect(() => {
        if (google_tag_manager_general_enabled_ga4 && product) {
            const { price } = product;
            const amount = price.regularPrice.amount;
            const category = product.categories[product.categories.length - 1];
            const currencyCode =
                product?.price_range?.minimum_price?.final_price?.currency;

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'select_item',
                ecommerce: {
                    items: [
                        {
                            item_id: product.id,
                            item_name: product.name,
                            affiliation: '',
                            coupon: '',
                            currency: currencyCode || 'USD',
                            discount: '',
                            index: 0,
                            item_brand: '',
                            item_category:
                                category !== undefined ? category.name : '',
                            item_list_id: '',
                            item_list_name: '',
                            item_variant: '',
                            location_id: '',
                            price: amount.value,
                            quantity: 1
                        }
                    ]
                }
            });

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: 'view_item',
                ecommerce: {
                    items: [
                        {
                            item_id: product.id,
                            item_name: product.name,
                            affiliation: '',
                            coupon: '',
                            currency: currencyCode || 'USD',
                            discount: '',
                            index: 0,
                            item_brand: '',
                            item_category:
                                category !== undefined ? category.name : '',
                            item_list_id: '',
                            item_list_name: '',
                            item_variant: '',
                            location_id: '',
                            price: amount.value,
                            quantity: 1
                        }
                    ]
                }
            });
        }
    }, [product]);
};

export default productDetailImpressions;
