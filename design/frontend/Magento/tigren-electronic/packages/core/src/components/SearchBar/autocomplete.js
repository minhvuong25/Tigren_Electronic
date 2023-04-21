import React from 'react';
import { gql } from '@apollo/client';
import { bool, func, shape, string } from 'prop-types';
import { useAutocomplete } from '@magento/peregrine/lib/talons/SearchBar';
import { useIntl } from 'react-intl';

import defaultClasses from './autocomplete.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Suggestions from './suggestions';

const GET_AUTOCOMPLETE_RESULTS = gql`
    query getAutocompleteResults($inputText: String!) {
        # Limit results to first three.
        products(search: $inputText, currentPage: 1, pageSize: 5) {
            aggregations {
                label
                count
                attribute_code
                options {
                    label
                    value
                }
            }
            items {
                id
                uid
                sku
                type_id
                stock_status
                name
                small_image {
                    url
                }
                url_rewrites {
                    url
                }
                url_key
                url_suffix
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
                price_range {
                    minimum_price {
                        minimum_final_price_excl_tax {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        discount {
                            percent_off
                            amount_off
                        }
                    }
                    maximum_price {
                        maximum_final_price_excl_tax {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
            }
            page_info {
                total_pages
            }
            total_count
        }
    }
`;

const Autocomplete = props => {
    const {
        setVisible,
        valid,
        visible,
        isShowCategories,
        handleSubmit
    } = props;
    const talonProps = useAutocomplete({
        queries: {
            getAutocompleteResults: GET_AUTOCOMPLETE_RESULTS
        },
        valid,
        visible
    });
    const {
        displayResult,
        filters,
        messageType,
        products,
        resultCount,
        value
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = visible ? classes.root_visible : classes.root_hidden;

    const { formatMessage } = useIntl();
    const MESSAGES = new Map()
        .set(
            'ERROR',
            formatMessage({
                id: 'autocomplete.error',
                defaultMessage: 'An error occurred while fetching results.'
            })
        )
        .set(
            'LOADING',
            formatMessage({
                id: 'autocomplete.loading',
                defaultMessage: 'Fetching results...'
            })
        )
        .set(
            'PROMPT',
            formatMessage({
                id: 'autocomplete.prompt',
                defaultMessage: 'Search for a product'
            })
        )
        .set(
            'EMPTY_RESULT',
            formatMessage({
                id: 'autocomplete.emptyResult',
                defaultMessage: 'No results were found.'
            })
        )
        .set(
            'INVALID_CHARACTER_LENGTH',
            formatMessage({
                id: 'autocomplete.invalidCharacterLength',
                defaultMessage: 'Search term must be at least three characters'
            })
        );

    const messageTpl = MESSAGES.get(messageType);
    const message =
        typeof messageTpl === 'function'
            ? messageTpl`${resultCount}`
            : messageTpl;

    return (
        <div className={rootClassName}>
            {valid && (!products || (products && !resultCount)) && (
                <div className={classes.message}>{message}</div>
            )}
            <div className={classes.suggestions}>
                <Suggestions
                    displayResult={displayResult}
                    products={products || {}}
                    filters={filters}
                    searchValue={value}
                    setVisible={setVisible}
                    visible={visible}
                    isShowCategories={isShowCategories}
                    resultCount={resultCount}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Autocomplete;

Autocomplete.propTypes = {
    classes: shape({
        message: string,
        root_hidden: string,
        root_visible: string,
        suggestions: string
    }),
    setVisible: func,
    visible: bool
};
