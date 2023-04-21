import { useApolloClient, gql } from '@apollo/client';
import get from '@tigrensolutions/core/src/util/get';

/**
 * Routes to hide the mini cart on.
 */

/**
 *
 * @param {DocumentNode} props.queries.getItemCountQuery query to get the total cart items count
 *
 * @returns {
 *      itemCount: Number,
 *      miniCartIsOpen: Boolean,
 *      handleLinkClick: Function,
 *      handleTriggerClick: Function,
 *      miniCartRef: Function,
 *      hideCartTrigger: Function,
 *      setMiniCartIsOpen: Function
 *  }
 */
const wrapUseCartTrigger = original => props => {
    const defaultTalonsData = original(props);

    const apolloClient = useApolloClient();

    const data = apolloClient.readFragment({
        id: 'Cart', // `id` is any id that could be returned by `dataIdFromObject`.
        fragment: gql`
            fragment PriceSummaryFragment on Cart {
                prices {
                    subtotal_excluding_tax {
                        currency
                        value
                    }
                }
            }
        `
    });
    const cartTotal = get(data, 'prices.subtotal_excluding_tax', {
        currency: 'USD',
        value: 0
    });

    return {
        ...defaultTalonsData,
        cartTotal
    };
};
export default wrapUseCartTrigger;
