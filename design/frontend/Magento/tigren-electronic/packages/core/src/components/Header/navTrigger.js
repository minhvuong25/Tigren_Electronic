import React from 'react';
import { node, shape, string } from 'prop-types';
import { Menu as MenuIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './navTrigger.module.css';
import { useNavigationTrigger } from '@magento/peregrine/lib/talons/Header/useNavigationTrigger';

/**
 * A component that toggles the navigation menu.
 */
const NavigationTrigger = props => {
    const { formatMessage } = useIntl();
    const { handleOpenNavigation } = useNavigationTrigger();

    const classes = useStyle(defaultClasses, props.classes);
    return (
        <button
            className={classes.root}
            aria-label={formatMessage({
                id: 'navigationTrigger.text',
                defaultMessage: 'Product Categories'
            })}
            onClick={handleOpenNavigation}
        >
            <Icon src={MenuIcon} />
            <span className={classes.text}>
                {formatMessage({
                    id: 'navigationTrigger.text',
                    defaultMessage: 'Product Categories'
                })}
            </span>
        </button>
    );
};

NavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default NavigationTrigger;
