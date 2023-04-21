import { useEffect } from 'react';
import { useSuccessPopupContext } from '../context';
import { useHistory } from 'react-router-dom';

export const useSuccessPopup = () => {
    const history = useHistory();
    const { item, toggleSuccessPopup } = useSuccessPopupContext();

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (item) toggleSuccessPopup();
        }, 10000);

        return () => clearTimeout(timeOutId);
    }, [item]);

    const { small_image, name } = item || { small_image: '', name: '' };

    const handleClose = () => {
        toggleSuccessPopup();
    };

    const handleViewCart = () => {
        handleClose();
        history.push('/cart');
    };

    return {
        item,
        small_image,
        name,
        handleClose,
        handleViewCart
    };
};
