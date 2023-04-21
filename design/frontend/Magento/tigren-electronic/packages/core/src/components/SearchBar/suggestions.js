import React, { Fragment } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useSuggestions } from '@magento/peregrine/lib/talons/SearchBar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import SuggestedCategories from '@magento/venia-ui/lib/components/SearchBar/suggestedCategories';
import SuggestedProducts from '@tigrensolutions/core/src/components/SearchBar/suggestedProducts';

import defaultClasses from './suggestions.module.css';

const Suggestions = props => {
    const {
        displayResult,
        filters,
        products,
        searchValue,
        setVisible,
        visible,
        isShowCategories,
        handleSubmit,
        resultCount
    } = props;
    const { items } = products;

    const talonProps = useSuggestions({
        displayResult,
        filters,
        items,
        setVisible,
        visible
    });
    const { categories, onNavigate, shouldRender } = talonProps;
    const classes = useStyle(defaultClasses, props.classes);

    // render null without data
    if (!shouldRender) {
        return null;
    }

    return (
        <Fragment>
            {isShowCategories && (
                <div className={classes.categories}>
                    <SuggestedCategories
                        categories={categories}
                        onNavigate={onNavigate}
                        value={searchValue}
                    />
                </div>
            )}
            <div className={classes.products}>
                <SuggestedProducts
                    onNavigate={onNavigate}
                    products={items}
                    limit={5}
                    value={searchValue}
                />
            </div>

            {items && items.length && items.length < resultCount ? (
                <button
                    className={classes.viewAllResult}
                    onClick={handleSubmit}
                >
                    <FormattedMessage
                        id={'Suggestions.viewAll'}
                        defaultMessage={'View all {count} products'}
                        values={{
                            count: resultCount
                        }}
                    />
                </button>
            ) : null}
        </Fragment>
    );
};

export default Suggestions;

Suggestions.propTypes = {
    classes: shape({
        heading: string
    }),
    products: shape({
        filters: arrayOf(
            shape({
                filter_items: arrayOf(shape({})),
                name: string.isRequired
            }).isRequired
        ),
        items: arrayOf(shape({}))
    }),
    searchValue: string,
    setVisible: func,
    visible: bool
};
