import { useQuery } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummary.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

const wrapUsePriceSummary = original => props => {
    const defaultTalonsData = original(props);
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const { getPriceSummaryQuery } = operations;

    const [{ cartId }] = useCartContext();

    const { data } = useQuery(getPriceSummaryQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: {
            cartId
        }
    });
    const totalQuantity = data ? +data.cart.total_quantity : 0;
    return {
        ...defaultTalonsData,
        totalQuantity: totalQuantity || 0
    };
};
export default wrapUsePriceSummary;
