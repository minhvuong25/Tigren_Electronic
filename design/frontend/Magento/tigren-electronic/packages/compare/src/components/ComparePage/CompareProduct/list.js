import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Items, { emptyData } from './items';

import defaultClasses from './list.module.css';
import { FormattedMessage } from 'react-intl';
import { useCompareContext } from '@tigrensolutions/compare/src/context';
import { useHistory } from 'react-router-dom';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const List = props => {
    const { layout, data, pageSize, addToCart, isPrint } = props;
    const listIdItems =
        data &&
        data.map(item => {
            return item.product && item.product.id;
        });
    const [{ handleRemoveAllProduct }] = useCompareContext();

    const hasData = Array.isArray(data) && data.length;
    const items = hasData ? data : emptyData;

    const classes = useStyle(defaultClasses, props.classes);

    const history = useHistory();
    const storage = new BrowserPersistence();

    const handlePrintCompare = useCallback(() => {
        storage.setItem('compareDataPrint', items);
        history.push('/compare/print/view');
    }, [items]);

    return (
        <div className={classes.root}>
            {!isPrint && (
                <div className={classes.heading}>
                    <h3 className={classes.title}>
                        <FormattedMessage
                            id="compare.title"
                            defaultMessage="Compare Products"
                        />
                    </h3>
                    <div className={classes.wrapBtnPrint}>
                        <button
                            className={classes.btnPrint}
                            onClick={handlePrintCompare}
                        >
                            <span className={classes.printIcon} />
                            <FormattedMessage
                                id={'compare.print'}
                                defaultMessage={'Print This Page'}
                            />
                        </button>
                        <button
                            className={classes.deleteAll}
                            onClick={() => handleRemoveAllProduct(listIdItems)}
                        >
                            <span className={classes.deleteIcon} />
                            <FormattedMessage
                                id="comparePage.deleteAll"
                                defaultMessage="Delete All"
                            />
                        </button>
                    </div>
                </div>
            )}
            <Items
                layout={layout}
                items={items}
                pageSize={pageSize}
                addToCart={addToCart}
                isPrint={isPrint}
            />
        </div>
    );
};

List.propTypes = {
    classes: PropTypes.shape({})
};

export default List;
