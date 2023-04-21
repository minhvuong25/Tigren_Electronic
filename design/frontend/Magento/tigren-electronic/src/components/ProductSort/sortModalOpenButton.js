import React from 'react';
import { shape, string, array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button/button.js';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './sortModalOpenButton.module.css';
import { useSortModal } from './useSortModal';

const SortModalOpenButton = props => {
    const { sortProps, classes: propsClasses } = props;
    const classes = useStyle(defaultClasses, propsClasses);
    const { handleOpen } = useSortModal({ sortProps });

    return (
        <Button
            priority={'low'}
            classes={{
                root_lowPriority: classes.sortButton
            }}
            data-cy="SortModalOpenButton-button"
            onClick={handleOpen}
            type="button"
            aria-live="polite"
            aria-busy="false"
        >
            <FormattedMessage
                id={'productSort.sortButton'}
                defaultMessage={'Sort'}
            />
        </Button>
    );
};

export default SortModalOpenButton;

SortModalOpenButton.propTypes = {
    classes: shape({
        sortButton: string
    }),
    sortProps: array
};
