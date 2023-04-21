import React, { Fragment, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@magento/venia-ui/lib/components/Button';
import { FormattedMessage } from 'react-intl';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';

import { Form } from 'informed';

import defaultClasses from './productSwatches.module.css';

const AddToCartButton = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        isAddProductLoading,
        isDisabledAddToCart,
        isOutOfStock,
        isInCategoryPage,
        handleChangeQuantity,
        handleAddToCart,
        product
    } = props;

    const categoryPageStyleClass = isInCategoryPage
        ? classes.addToCartCategoryStyle
        : classes.homeStyle;

    const buttonMessage = useMemo(() => {
        if (isOutOfStock) {
            return (
                <FormattedMessage
                    id="addToCartButton.itemOutOfStock"
                    defaultMessage="OUT OF STOCK"
                />
            );
        }
        return (
            <FormattedMessage
                id="addToCartButton.addItemToCart"
                defaultMessage="Add to Cart"
            />
        );
    }, [isOutOfStock]);

    const isDisabled =
        isAddProductLoading || isOutOfStock || isDisabledAddToCart;

    return (
        <Fragment>
            <Form onSubmit={handleAddToCart} disabled={isDisabled}>
                <div className={`${classes.actions} ${categoryPageStyleClass}`}>
                    <QuantityFields
                        classes={{ root: classes.quantityRoot }}
                        initialValue={1}
                        min={1}
                        itemId={product.id}
                        onChange={handleChangeQuantity}
                    />

                    <Button
                        priority={'high'}
                        type="submit"
                        disabled={isDisabled}
                        data-action={'addToCart'}
                    >
                        <span className={classes.text}>{buttonMessage}</span>
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default AddToCartButton;
