import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { ShoppingBag as ShoppingCartIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './cartTrigger.module.css';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

const MiniCart = React.lazy(() =>
    import('@magento/venia-ui/lib/components/MiniCart')
);

const CartTrigger = props => {
    const { isShowMiniCart } = props;
    const {
        handleLinkClick,
        handleTriggerClick,
        itemCount,
        miniCartRef,
        miniCartIsOpen,
        hideCartTrigger,
        setMiniCartIsOpen,
        miniCartTriggerRef
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const buttonAriaLabel = formatMessage(
        {
            id: 'cartTrigger.ariaLabel',
            defaultMessage:
                'Toggle mini cart. You have {count} items in your cart.'
        },
        { count: itemCount }
    );

    const cartText = formatMessage({
        id: 'cartPage.heading',
        defaultMessage: 'Shopping cart'
    });
    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;
    const triggerClassName = miniCartIsOpen
        ? classes.triggerContainer_open
        : classes.triggerContainer;

    const maybeItemCounter = itemCount ? (
        <span className={classes.counter}>{itemCountDisplay}</span>
    ) : null;

    const cartTrigger = hideCartTrigger ? null : (
        // Because this button behaves differently on desktop and mobile
        // we render two buttons that differ only in their click handler
        // and control which one displays via CSS.
        <Fragment>
            {isShowMiniCart ? (
                <>
                    <div className={triggerClassName} ref={miniCartTriggerRef}>
                        <button
                            aria-label={buttonAriaLabel}
                            className={classes.trigger}
                            onClick={handleTriggerClick}
                        >
                            <Icon src={ShoppingCartIcon} />
                            {cartText}
                            {maybeItemCounter}
                        </button>
                    </div>
                    <button
                        aria-label={buttonAriaLabel}
                        className={classes.link}
                        onClick={handleLinkClick}
                    >
                        <Icon src={ShoppingCartIcon} />
                        {maybeItemCounter}
                    </button>
                    <Suspense fallback={null}>
                        <MiniCart
                            isOpen={miniCartIsOpen}
                            setIsOpen={setMiniCartIsOpen}
                            ref={miniCartRef}
                        />
                    </Suspense>
                </>
            ) : (
                <button
                    aria-label={buttonAriaLabel}
                    className={classes.linkAll}
                    onClick={handleLinkClick}
                >
                    <Icon src={ShoppingCartIcon} />
                    {cartText}
                    {maybeItemCounter}
                </button>
            )}
        </Fragment>
    );

    return cartTrigger;
};

export default CartTrigger;

CartTrigger.propTypes = {
    classes: shape({
        counter: string,
        link: string,
        openIndicator: string,
        root: string,
        trigger: string,
        triggerContainer: string
    })
};
