import React, { PureComponent, useEffect, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useStyle } from '@magento/venia-ui/lib/classify';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';
import { useHistory } from 'react-router-dom';

import CompareProduct from '../ComparePage/CompareProduct/list';

import defaultClasses from './printPage.module.css';
import Logo from '@tigrensolutions/base/src/components/Logo';

const PrintComparePage = props => {
    const { classes: propsClasses } = props;

    const classes = useStyle(defaultClasses, propsClasses);
    const componentRef = useRef();
    const storage = new BrowserPersistence();
    const history = useHistory();

    const compareItems = storage.getItem('compareDataPrint');

    if (!compareItems) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforePrint: () => {},
        onAfterPrint: () => {
            history.push('/catalog/product_compare');
            storage.removeItem('compareDataPrint');
        }
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks

    class ContentCompare extends PureComponent {
        render() {
            return (
                <div>
                    <div className={classes.header}>
                        <Logo height={26} width={118} />
                    </div>
                    <div className={classes.content}>
                        <CompareProduct data={compareItems} isPrint={true} />
                    </div>
                </div>
            );
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pageContents = useMemo(() => {
        return <ContentCompare ref={componentRef} />;
    }, [compareItems]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        handlePrint();
    }, []);

    return pageContents;
};

export default PrintComparePage;
