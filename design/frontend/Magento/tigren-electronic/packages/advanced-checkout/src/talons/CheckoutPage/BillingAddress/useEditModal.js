import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useEditModal = () => {
    const [{ drawer }, { closeDrawer }] = useAppContext();
    const isOpen = drawer === 'billingAddress.edit';

    return {
        handleClose: closeDrawer,
        isOpen
    };
};
