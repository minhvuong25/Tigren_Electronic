import React, { useCallback } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './sortItemRadio.module.css';

const SortItemRadio = props => {
    const { active, onClick, sortItem, handleClose } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const activeClass = active ? classes.active : '';
    const handleClick = useCallback(
        e => {
            // use only left click for selection
            if (e.button === 0) {
                onClick(sortItem);
                handleClose();
            }
        },
        [sortItem, onClick]
    );

    const handleKeyDown = useCallback(
        e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(sortItem);
                handleClose();
            }
        },
        [onClick, sortItem]
    );

    return (
        <button
            className={`${classes.root} ${activeClass}`}
            data-cy={active ? 'SortItem-activeButton' : 'SortItem-button'}
            onMouseDown={handleClick}
            onKeyDown={handleKeyDown}
        >
            <span className={classes.radio} />
            <span className={classes.content}>
                <span className={classes.text}>{sortItem.text}</span>
            </span>
        </button>
    );
};

SortItemRadio.propTypes = {
    active: bool,
    classes: shape({
        content: string,
        root: string,
        radio: string,
        text: string
    }),
    onClick: func,
    handleClose: func
};

export default SortItemRadio;
