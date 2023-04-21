import React, { useMemo } from 'react';

import VerticalTab from '@tigrensolutions/core/src/components/Tabs/VerticalTab';
import Options from '@tigrensolutions/core/src/components/Tabs/OptionTab';

import { any, func, oneOf, shape, string } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './tabs.module.css';

import { useWindowSize } from '@magento/peregrine';

export const SUPPORT_TAB_TYPES = {
    VERTICAL_TAB: 'VerticalTab',
    OPTION: 'option'
};

const Tabs = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { innerWidth } = useWindowSize();
    const {
        children,
        extendClass,
        currentUser,
        getUserDetails,
        config,
        countries,
        selectedTabIndex,
        changeTab,
        tabsDetails
    } = props;

    const tabRootClass =
        extendClass !== '' ? classes[extendClass] : classes.tabRoot;

    const tabHead = useMemo(() => {
        const tabs =
            children && children.length > 0 && children.filter(Boolean);

        if (innerWidth >= 768) {
            return (
                <div className={classes.verticalTabContainer}>
                    {tabs.map((child, index) => {
                        if (child && child.props) {
                            return (
                                <VerticalTab
                                    selectedIndex={selectedTabIndex}
                                    tabIndex={index}
                                    key={index}
                                    path={tabsDetails[index].path}
                                    tabsDetails={tabsDetails}
                                    {...child.props.tabDetail}
                                    changeTab={changeTab}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }

        if (innerWidth < 768) {
            return (
                <Options
                    tabs={tabs}
                    tabsDetails={tabsDetails}
                    onChange={changeTab}
                    selectedIndex={selectedTabIndex}
                />
            );
        }

        return null;
    }, [selectedTabIndex, changeTab, tabsDetails, innerWidth]);

    return (
        <div className={tabRootClass}>
            <div
                className={`${classes.tabList} ${
                    selectedTabIndex === null
                        ? classes.showMenu
                        : classes.hideMenu
                }`}
            >
                {tabHead}
                {selectedTabIndex !== -1 && (
                    <div className={classes.tabContent}>
                        {children.map((child, index) => {
                            if (
                                index !== selectedTabIndex ||
                                !child ||
                                !child.props
                            )
                                return undefined;
                            return React.cloneElement(child.props.children, {
                                getUserDetails,
                                key: index,
                                config,
                                countries,
                                currentUser,
                                changeTab,
                                path: tabsDetails[index].path,
                                className: 'account-tabContent'
                            });
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;

Tabs.propTypes = {
    classes: shape({}),
    extendClass: string,
    currentUser: any,
    selectedTabIndex: any,
    changeTab: func,
    tabsDetails: any,
    tabType: oneOf(Object.values(SUPPORT_TAB_TYPES))
};

Tabs.defaultProps = {
    tabType: SUPPORT_TAB_TYPES.OPTION
};
