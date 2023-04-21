import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Item from '../item';

import defaultClasses from '../items.module.css';
import { FormattedMessage } from 'react-intl';

const Items = props => {
    const { items, imagesData } = props.data;
    const classes = useStyle(defaultClasses, props.classes);

    const itemsComponent = items.map(item => (
        <Item key={item.id} {...item} {...imagesData[item.product_sku]} />
    ));

    return (
        <div className={classes.root}>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id="orderHistoryPage.orderedProduct"
                    defaultMessage="Ordered Products"
                />
            </h3>
            <div className={classes.topTitle}>
                <h5 className={classes.itemTitle}>
                    <FormattedMessage
                        id={'orderHistoryPage.item'}
                        defaultMessage={'Item'}
                    />
                </h5>
                <div className={classes.wrapContentTitle}>
                    <h5 className={classes.contentTitleInfo}>
                        <FormattedMessage
                            id={'orderDetails.subtotal'}
                            defaultMessage={'Subtotal'}
                        />
                    </h5>
                    <h5 className={classes.contentTitle}>
                        <FormattedMessage
                            id={'orderDetails.subtotal'}
                            defaultMessage={'Subtotal'}
                        />
                    </h5>
                    <h5 className={classes.contentTitle}>
                        <FormattedMessage
                            id={'productForm.quantity'}
                            defaultMessage={'Quantity'}
                        />
                    </h5>
                    <h5 className={classes.contentTitle}>
                        <FormattedMessage
                            id={'orderHistoryPage.totalPrice'}
                            defaultMessage={'Total price'}
                        />
                    </h5>
                </div>
            </div>
            <div className={classes.itemsContainer}>{itemsComponent}</div>
        </div>
    );
};

export default Items;

Items.propTypes = {
    classes: shape({
        root: string
    }),
    data: shape({
        items: arrayOf(
            shape({
                id: string,
                product_name: string,
                product_sale_price: shape({
                    currency: string,
                    value: number
                }),
                product_sku: string,
                product_url_key: string,
                selected_options: arrayOf(
                    shape({
                        label: string,
                        value: string
                    })
                ),
                quantity_ordered: number
            })
        ),
        imagesData: arrayOf(
            shape({
                id: number,
                sku: string,
                thumbnail: shape({
                    url: string
                }),
                url_key: string,
                url_suffix: string
            })
        )
    })
};
