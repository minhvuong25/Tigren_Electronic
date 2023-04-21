import React, { useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './verticaltab.module.css';

const VerticalTab = props => {
    const {
        tabIndex,
        selectedIndex,
        label,
        path,
        tabsDetails,
        changeTab
    } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const location = useLocation();

    const currentTabDetails = tabsDetails[tabIndex];

    const isRelatedOfTab = (currentTabDetails.relatedPaths || []).some(path =>
        location.pathname.includes(path)
    );

    const classItemList = `${classes.tabListItem} ${
        selectedIndex === tabIndex || isRelatedOfTab
            ? classes.tabListItemActive
            : ''
    }`;

    const handleOnClickTab = useCallback(() => {
        if (changeTab) {
            changeTab(tabIndex);
        }
    }, [tabIndex]);

    return (
        <Link to={path} className={classItemList} onClick={handleOnClickTab}>
            <span className={classes.label}>{label}</span>
        </Link>
    );
};
export default VerticalTab;
