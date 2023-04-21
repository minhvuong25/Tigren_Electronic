import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useCompareContext } from '../../context';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './comparePopup.module.css';
import { useHistory } from 'react-router-dom';

const MAX_COMPARE_ITEM = 4;
const ComparePopup = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const history = useHistory();
    const [{ compareItems }] = useCompareContext();

    const compareButton = useMemo(() => {
        return (
            compareItems.length > 0 && (
                <Button
                    name="compareLink"
                    priority="high"
                    classes={{ root_highPriority: classes.compareBtn }}
                    onClick={() => history.push('/catalog/product_compare')}
                >
                    <span className={classes.itemCount}>
                        <span className={classes.iconCompare} />
                        <span className={classes.textLabel}>
                            {formatMessage(
                                {
                                    id: 'comparePopup.compareTitle',
                                    defaultMessage:
                                        'Comparison List ({count}/{max})'
                                },
                                {
                                    count: compareItems.length || '0',
                                    max: MAX_COMPARE_ITEM
                                }
                            )}
                        </span>
                    </span>
                </Button>
            )
        );
    }, [compareItems]);

    return (
        <>
            <div>{compareButton}</div>
        </>
    );
};

export default ComparePopup;
