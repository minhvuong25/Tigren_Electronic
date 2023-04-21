import { useMemo } from 'react';

const wrapUseCheckoutPage = original => props => {
    const defaultTalonsData = original(props);

    const { cartItems } = defaultTalonsData;

    const isVirtual = useMemo(() => {
        const virtual = cartItems?.filter(item => {
            return item?.product.__typename !== 'VirtualProduct';
        });
        return virtual?.length === 0;
    }, [cartItems]);

    return {
        ...defaultTalonsData,
        isVirtual
    };
};

export default wrapUseCheckoutPage;
