import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

const DRAWER_NAME = 'sort';

export const useSortModal = props => {
    const { sortProps } = props;

    const [isApplying, setIsApplying] = useState(false);
    const [{ drawer }, { toggleDrawer, closeDrawer }] = useAppContext();
    const prevDrawer = useRef(null);
    const isOpen = drawer === DRAWER_NAME;

    const history = useHistory();
    const { pathname, search } = useLocation();

    useEffect(() => {
        if (isApplying) {
            // mark the operation as complete
            setIsApplying(false);
        }
    }, [history, isApplying, pathname, search]);

    const handleOpen = useCallback(() => {
        toggleDrawer(DRAWER_NAME);
    }, [toggleDrawer]);

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const handleApply = useCallback(() => {
        setIsApplying(true);
        handleClose();
    }, [handleClose]);

    const handleKeyDownActions = useCallback(
        event => {
            // do not handle keyboard actions when the modal is closed
            if (!isOpen) {
                return;
            }

            switch (event.keyCode) {
                // when "Esc" key fired -> close the modal
                case 27:
                    handleClose();
                    break;
            }
        },
        [isOpen, handleClose]
    );

    useEffect(() => {
        const justOpened =
            prevDrawer.current === null && drawer === DRAWER_NAME;
        const justClosed =
            prevDrawer.current === DRAWER_NAME && drawer === null;

        // on drawer close, update the modal visibility state
        if (justClosed) {
            handleClose();
        }

        prevDrawer.current = drawer;
    }, [drawer, search, handleClose]);

    return {
        handleApply,
        handleClose,
        handleKeyDownActions,
        handleOpen,
        isApplying,
        isOpen
    };
};
