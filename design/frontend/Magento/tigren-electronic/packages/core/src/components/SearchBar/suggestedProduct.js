import React, { useCallback, useMemo } from 'react';
import { func, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Image from '@magento/venia-ui/lib/components/Image';
import defaultClasses from './suggestedProduct.module.css';
import AddToCartbutton from '../Gallery/addToCartButton';
import ProductPrice from '@tigrensolutions/base/src/components/ProductPrice';
import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';

const IMAGE_WIDTH = 65;

const SuggestedProduct = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        small_image,
        name,
        onNavigate,
        url_suffix,
        value,
        stock_status
    } = props;

    const isInStock = stock_status === 'IN_STOCK';

    const handleClick = useCallback(() => {
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [onNavigate]);

    const productUrl = getProductUrl({ product: props, url_suffix });
    const uri = useMemo(() => resourceUrl(`/${productUrl}`), [productUrl]);

    const nameValue = useMemo(() => {
        const regex = value.replace(/[^\w\s]/gi, '');
        const parts = name.split(new RegExp(`(${regex})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === value.toLowerCase() ? (
                        <span key={index} className={classes.highlight}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    }, [value, name]);

    return (
        <div className={classes.item}>
            <Link className={classes.root} to={uri} onClick={handleClick}>
                <div className={classes.images}>
                    <Image
                        alt={name}
                        classes={{
                            image: classes.thumbnail,
                            root: classes.image
                        }}
                        resource={small_image}
                        width={IMAGE_WIDTH}
                    />
                    {!isInStock && (
                        <div className={classes.outOfStock}>
                            <span>
                                <FormattedMessage
                                    id={'galleryItem.outOfStock'}
                                    defaultMessage={'Out of stock'}
                                />
                            </span>
                        </div>
                    )}
                </div>
                <span className={classes.info}>
                    <span className={classes.name}>{nameValue}</span>
                    <span className={classes.price}>
                        <ProductPrice product={props} layout={'searchPopup'} />
                    </span>
                </span>
            </Link>
            <AddToCartbutton item={props} isShowQuantity={false} />
        </div>
    );
};

SuggestedProduct.defaultProps = {
    value: ''
};

SuggestedProduct.propTypes = {
    url_key: string.isRequired,
    small_image: string.isRequired,
    name: string.isRequired,
    onNavigate: func,
    price: shape({
        regularPrice: shape({
            amount: shape({
                currency: string,
                value: number
            })
        })
    }).isRequired,
    classes: shape({
        root: string,
        image: string,
        name: string,
        price: string,
        thumbnail: string
    })
};

export default SuggestedProduct;
