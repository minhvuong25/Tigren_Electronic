import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { number, shape, string } from 'prop-types';

import { Form } from 'informed';
import { useAddToCartButton } from '@tigrensolutions/core/src/talons/Gallery/useAddToCartButton';
import Button from '@magento/venia-ui/lib/components/Button';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addToCartButton.module.css';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';

const AddToCartButton = props => {
    const { item, isShowQuantity } = props;
    const talonProps = useAddToCartButton({
        item,
        isShowQuantity
    });
    const {
        handleAddToCart,
        isDisabled,
        isInStock,
        handleChangeQuantity
    } = talonProps;
    const { formatMessage } = useIntl();

    const classes = mergeClasses(defaultClasses, props.classes);

    const buttonInStock = (
        <Button
            aria-label={formatMessage({
                id: 'addToCartButton.addItemToCart',
                defaultMessage: 'ADD TO CART'
            })}
            className={classes.root}
            disabled={isDisabled}
            onPress={handleAddToCart}
            priority="high"
            type="button"
        >
            <span className={classes.text}>
                <FormattedMessage
                    id="addToCartButton.addItemToCart"
                    defaultMessage="ADD TO CART"
                />
            </span>
        </Button>
    );

    const buttonOutOfStock = (
        <Button
            aria-label={formatMessage({
                id: 'addToCartButton.itemOutOfStock',
                defaultMessage: 'OUT OF STOCK'
            })}
            className={classes.root}
            disabled={isDisabled}
            onPress={handleAddToCart}
            priority="high"
            type="button"
        >
            <span className={classes.text}>
                <FormattedMessage
                    id="addToCartButton.itemOutOfStock"
                    defaultMessage="OUT OF STOCK"
                />
            </span>
        </Button>
    );

    const button = isInStock ? buttonInStock : buttonOutOfStock;
    const classQty = isShowQuantity ? '' : classes.noQuantity;

    return (
        <Form className={`${classes.addToCart} ${classQty}`}>
            {isShowQuantity && (
                <div className={classes.quantity}>
                    <QuantityFields
                        min={1}
                        classes={{ root: classes.quantityRoot }}
                        initialValue={1}
                        itemId={item.id}
                        onChange={handleChangeQuantity}
                    />
                </div>
            )}
            {button}
        </Form>
    );
};

export default AddToCartButton;

AddToCartButton.propTypes = {
    classes: shape({
        root: string,
        root_selected: string
    }),
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string
        }),
        stock_status: string.isRequired,
        type_id: string.isRequired,
        url_key: string.isRequired,
        url_suffix: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    value: number,
                    currency: string
                })
            })
        })
    })
};
