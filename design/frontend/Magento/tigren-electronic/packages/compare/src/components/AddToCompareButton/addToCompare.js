import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useCompareContext } from '../../context';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addToCompareButton.module.css';

const AddToCompareButton = props => {
    const { product, isProductDetail, isDialogOpen } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const [{ handleAddToCompare, compareItems }] = useCompareContext();

    const productId = product?.id;
    const isInCompare = compareItems?.some(
        compareItem => compareItem.uid === productId?.toString()
    );

    const classInCompare = isInCompare ? classes.inCompare : '';
    const classProductDetail = isProductDetail ? classes.compareDetail : (isDialogOpen
        ? classes.inCompareOpenIcons
        : classes.compare);
    const classInCompareOpen = isDialogOpen ? classes.inCompareOpen : '';

    return (
        <button
            className={`${classProductDetail} ${classInCompare} ${classInCompareOpen}`}
            priority="low"
            type="button"
            data-name="add-compare"
            disabled={isInCompare}
            onClick={() =>
                handleAddToCompare({
                    product
                })
            }
        >
            {isDialogOpen && <span className={classes.iconCompare} />}
            <span className={classes.text}>
                <FormattedMessage
                    id={'galleryItem.compare'}
                    defaultMessage={'Compare'}
                />
            </span>
        </button>
    );
};

export default AddToCompareButton;
