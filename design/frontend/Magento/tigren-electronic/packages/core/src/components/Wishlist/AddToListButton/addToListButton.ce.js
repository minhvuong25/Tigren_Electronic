import React, { useRef } from 'react';
import { element, func, shape, string } from 'prop-types';
import { useAddToListButton } from '@tigrensolutions/core/src/talons/Wishlist/AddToListButton/useAddToListButton';
import { useButton } from 'react-aria';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addToListButton.module.css';
import { useCommonToasts } from '@magento/venia-ui/lib/components/Wishlist/AddToListButton/useCommonToasts';

const AddToListButton = props => {
    const talonProps = useAddToListButton(props);
    const buttonRef = useRef();

    const {
        buttonProps,
        buttonText,
        errorToastProps,
        isSelected,
        loginToastProps,
        successToastProps
    } = talonProps;

    useCommonToasts({ errorToastProps, loginToastProps, successToastProps });
    const { buttonProps: ariaButtonProps } = useButton(buttonProps, buttonRef);

    const classes = useStyle(defaultClasses, props.classes);
    const buttonClass = isSelected ? classes.root_selected : classes.root;

    return (
        <button ref={buttonRef} className={buttonClass} {...ariaButtonProps}>
            <span className={classes.text}>{buttonText}</span>
        </button>
    );
};

export default AddToListButton;

AddToListButton.propTypes = {
    afterAdd: func,
    beforeAdd: func,
    classes: shape({
        root: string,
        root_selected: string
    }),
    icon: element
};
