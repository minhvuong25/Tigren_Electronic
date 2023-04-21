import React, { useCallback } from 'react';
import { func, number, oneOfType, shape, string } from 'prop-types';
import setValidator from '@magento/peregrine/lib/validators/set';

import Checkbox from '@tigrensolutions/core/src/components/Checkbox';

const FilterItem = props => {
    const { filterApi, filterState, group, item, onApply } = props;
    const { toggleItem } = filterApi;
    const { title, value } = item;
    const isSelected = filterState && filterState.has(item);

    const handleClick = useCallback(() => {
        toggleItem({ group, item });

        if (typeof onApply === 'function') {
            onApply(group, item);
        }
    }, [group, item, toggleItem, onApply]);

    return (
        <Checkbox
            isFilter={true}
            onMouseDown={handleClick}
            onApply={handleClick}
            field={`${title}-${value}`}
            fieldValue={!!isSelected}
            label={title}
            data-cy="FilterDefault-checkbox"
        />
    );
};

FilterItem.defaultProps = {
    onChange: null
};

FilterItem.propTypes = {
    filterApi: shape({
        toggleItem: func.isRequired
    }).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    item: shape({
        title: string.isRequired,
        value: oneOfType([number, string]).isRequired
    }).isRequired,
    onChange: func
};

export default FilterItem;
