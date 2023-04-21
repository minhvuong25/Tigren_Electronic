/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from '@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns/ordersAndReturns.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

export const useOrderAndReturnsDetail = (props = {}) => {
    const { items } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getProductThumbnailsByUrlKey } = operations;

    const urlKeys = useMemo(() => {
        return items?.map(item => item.product_url_key).sort();
    }, [items]);

    const { data, loading } = useQuery(getProductThumbnailsByUrlKey, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            urlKeys
        }
    });

    const imagesData = useMemo(() => {
        if (data) {
            // Images data is taken from simple product or from configured variant and assigned to item sku
            const mappedImagesData = {};
            items.forEach(item => {
                const product = data.products.items.find(
                    element => item.product_url_key === element.url_key
                );
                if (product.variants && product.variants.length > 0) {
                    const foundVariant = product.variants.find(variant => {
                        return variant.product.sku === item.product_sku;
                    });
                    mappedImagesData[item.product_sku] = foundVariant.product;
                } else {
                    mappedImagesData[item.product_sku] = product;
                }
            });
            return mappedImagesData;
        } else {
            return {};
        }
    }, [data, items]);

    return {
        imagesData,
        loading
    };
};
