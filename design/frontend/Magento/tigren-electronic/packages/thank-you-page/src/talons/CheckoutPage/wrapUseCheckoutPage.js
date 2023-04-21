import { useEffect } from 'react';
import { Util } from '@magento/peregrine';
import { useHistory } from 'react-router-dom';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const wrapUseCheckoutPage = original => props => {
    const defaultTalonsData = original(props);

    const { orderNumber, orderDetailsData } = defaultTalonsData;
    const history = useHistory();
    useEffect(() => {
        if (orderNumber && orderDetailsData) {
            storage.setItem('lastOrderNumber', orderNumber);
            history.push('/checkout/onepage/success');
        }
    }, [orderNumber]);

    return {
        ...defaultTalonsData
    };
};

export default wrapUseCheckoutPage;
