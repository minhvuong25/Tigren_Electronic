import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './wrapStockStatusMessage.module.css';

const WrapStockStatusMessage = Component => props => {
    const { cart = {} } = props;
    const { messages = [] } = cart;
    const classes = useStyle(props.classes, defaultClasses);

    const stockStatusMessageElement = useMemo(() => {
        if (!!messages.length) {
            return messages.map(({ message }) => {
                return (
                    <div className={classes.root}>
                        <div className={classes.message}>
                            <span>{message}</span>
                        </div>
                    </div>
                );
            });
        }

        return null;
    }, [messages, classes]);

    return !!cart ? (
        <div className={classes.wrap}>{stockStatusMessageElement}</div>
    ) : (
        <Component {...props} />
    );
};

export default WrapStockStatusMessage;
