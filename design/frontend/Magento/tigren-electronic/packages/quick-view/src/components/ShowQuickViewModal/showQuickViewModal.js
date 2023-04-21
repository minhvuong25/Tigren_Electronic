import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './showQuickViewModal.module.css';
import { useTgQuickViewContext } from '@tigrensolutions/quick-view/src/context';
import { Search } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';

const ShowQuickViewModal = props => {
    const { product } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const { showQuickView } = useTgQuickViewContext();

    const handleClick = () => {
        showQuickView(product.sku);
    };

    return (
        <div className={classes.openButton} onClick={handleClick}>
            <Icon src={Search} />
        </div>
    );
};

ShowQuickViewModal.propTypes = {};

export default ShowQuickViewModal;
