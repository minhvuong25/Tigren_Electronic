import React, { useCallback } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useHistory } from 'react-router-dom';

import defaultClasses from './optionTab.module.css';

const Options = (props = {}) => {
    const { tabs, onChange, selectedIndex, tabsDetails } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const history = useHistory();

    const handleChange = useCallback(
        event => {
            const value = event.target.value;
            if (onChange) {
                const tabIndex = Number(value);
                onChange(Number(value));

                if (tabsDetails) {
                    const tabInfo = tabsDetails[tabIndex];
                    history.push(tabInfo.path);
                }
            }
        },
        [onChange]
    );

    return (
        <div className={classes.root}>
            <select onChange={handleChange} className={classes.select}>
                {tabs.map((child, index) => {
                    if (child && child.props) {
                        const { label } = child.props.tabDetail;
                        const isSelected = selectedIndex === index;

                        return (
                            <option
                                key={index}
                                value={index}
                                selected={isSelected}
                            >
                                {label}
                            </option>
                        );
                    }
                    return null;
                })}
            </select>
        </div>
    );
};

export default Options;
