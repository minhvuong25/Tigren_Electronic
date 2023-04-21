import React, { useMemo } from 'react';
import Option from './option';

const CustomizeOptions = props => {
    const { options, product, onOptionChange, isProduct } = props;

    const optionList = useMemo(
        () =>
            options.map(option => {
                return (
                    <Option
                        isProduct={isProduct}
                        product={product}
                        option={option}
                        key={option.option_id}
                        onOptionChange={onOptionChange}
                    />
                );
            }),
        [options, product, onOptionChange]
    );

    return optionList;
};

export default CustomizeOptions;
