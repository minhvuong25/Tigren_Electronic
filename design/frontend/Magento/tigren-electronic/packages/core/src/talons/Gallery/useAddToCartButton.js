import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import operations from '@magento/peregrine/lib/talons/Gallery/addToCart.gql';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import galleryOperations from '@magento/peregrine/lib/talons/Gallery/gallery.gql.ce';

import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';

/**
 * @param {String} props.item.uid - uid of item
 * @param {String} props.item.name - name of item
 * @param {String} props.item.stock_status - stock status of item
 * @param {String} props.item.type_id - product type
 * @param {String} props.item.url_key - item url key
 * @param {String} props.item.sku - item sku
 *
 * @returns {
 *      handleAddToCart: Function,
 *      isDisabled: Boolean,
 *      isInStock: Boolean
 * }
 *
 */
const UNSUPPORTED_PRODUCT_TYPES = [
    'virtual',
    'bundle',
    'grouped',
    'downloadable'
];

export const useAddToCartButton = props => {
    const { item, isShowQuantity } = props;

    const [isLoading, setIsLoading] = useState(false);

    const isInStock = item.stock_status === 'IN_STOCK';

    const productType = item.type_id;
    const isUnsupportedProductType = UNSUPPORTED_PRODUCT_TYPES.includes(
        productType
    );
    const isDisabled = isLoading || !isInStock || isUnsupportedProductType;

    const history = useHistory();

    const [{ cartId }] = useCartContext();

    const [addToCart] = useMutation(operations.ADD_ITEM);
    const [quantity, setQuantity] = useState(1);
    const { data: storeConfigData } = useQuery(
        galleryOperations.getStoreConfigQuery,
        {
            fetchPolicy: 'cache-and-network'
        }
    );
    const storeConfig = storeConfigData ? storeConfigData.storeConfig : null;
    const handleChangeQuantity = useCallback(
        value => {
            setQuantity(value);
        },
        [setQuantity]
    );
    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;
    const productUrl = getProductUrl({
        product: item,
        url_suffix: productUrlSuffix
    });
    const productLink = resourceUrl(`/${productUrl}`);
    const handleAddToCart = useCallback(async () => {
        try {
            if (productType === 'simple') {
                setIsLoading(true);
                const quantityProduct = isShowQuantity ? quantity : 1;
                await addToCart({
                    variables: {
                        cartId,
                        cartItem: {
                            quantity: quantityProduct,
                            entered_options: [
                                {
                                    uid: item.uid,
                                    value: item.name
                                }
                            ],
                            sku: item.sku
                        }
                    }
                });

                setIsLoading(false);
            } else if (productType === 'configurable') {
                history.push(productLink);
            } else {
                console.warn('Unsupported product type unable to handle.');
            }
        } catch (error) {
            console.error(error);
        }
    }, [
        addToCart,
        cartId,
        history,
        item.sku,
        item.url_key,
        productType,
        item.uid,
        item.name,
        isShowQuantity,
        quantity
    ]);

    return {
        handleAddToCart,
        isDisabled,
        isInStock,
        handleChangeQuantity
    };
};
