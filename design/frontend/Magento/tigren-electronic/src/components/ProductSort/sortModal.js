import React, { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FocusScope } from 'react-aria';
import { array, shape, string } from 'prop-types';
import { useSortModal } from './useSortModal';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Portal from '@magento/venia-ui/lib/components/Portal/portal.js';
import defaultClasses from './sortModal.module.css';
import SortItemRadio from './sortItemRadio';

const SortModal = props => {
    const { availableSortMethods, sortProps } = props;
    const [currentSort, setSort] = sortProps;
    const talonProps = useSortModal({ sortProps });
    const { handleClose, handleKeyDownActions, isOpen } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const modalClass = isOpen ? classes.root_open : classes.root;
    const { formatMessage, locale } = useIntl();

    const orderSortingList = useCallback(
        list => {
            return list.sort((a, b) => {
                return a.text.localeCompare(b.text, locale, {
                    sensitivity: 'base'
                });
            });
        },
        [locale]
    );
    const sortMethodsFromConfig = availableSortMethods
        ? availableSortMethods
              .map(method => {
                  const { value, label } = method;
                  if (value !== 'price' && value !== 'position') {
                      return {
                          id: `sortItem.${value}`,
                          text: label,
                          attribute: value,
                          sortDirection: 'ASC'
                      };
                  }
              })
              .filter(method => !!method)
        : null;
    // click event for menu items
    const handleItemClick = useCallback(
        sortAttribute => {
            setSort(prevSort => {
                return {
                    sortText: sortAttribute.text,
                    sortId: sortAttribute.id,
                    sortAttribute: sortAttribute.attribute,
                    sortDirection: sortAttribute.sortDirection,
                    sortFromSearch: prevSort.sortFromSearch
                };
            });
        },
        [setSort]
    );
    const sortElements = useMemo(() => {
        const defaultSortMethods = [
            {
                id: 'sortItem.relevance',
                text: formatMessage({
                    id: 'sortItem.relevance',
                    defaultMessage: 'Best Match'
                }),
                attribute: 'relevance',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceDesc',
                text: formatMessage({
                    id: 'sortItem.priceDesc',
                    defaultMessage: 'Price: High to Low'
                }),
                attribute: 'price',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.priceAsc',
                text: formatMessage({
                    id: 'sortItem.priceAsc',
                    defaultMessage: 'Price: Low to High'
                }),
                attribute: 'price',
                sortDirection: 'ASC'
            }
        ];

        // Do not display Position in Search
        if (!currentSort.sortFromSearch) {
            defaultSortMethods.push({
                id: 'sortItem.position',
                text: formatMessage({
                    id: 'sortItem.position',
                    defaultMessage: 'Position'
                }),
                attribute: 'position',
                sortDirection: 'ASC'
            });
        }

        const allSortingMethods = sortMethodsFromConfig
            ? orderSortingList(
                  [sortMethodsFromConfig, defaultSortMethods].flat()
              )
            : defaultSortMethods;

        const itemElements = Array.from(allSortingMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;
            const isActive =
                currentSort.sortAttribute === attribute &&
                currentSort.sortDirection === sortDirection;

            const key = `${attribute}--${sortDirection}`;
            return (
                <li key={key} className={classes.menuItem}>
                    <SortItemRadio
                        sortItem={sortItem}
                        active={isActive}
                        onClick={handleItemClick}
                        handleClose={handleClose}
                    />
                </li>
            );
        });

        return (
            <div className={classes.menu}>
                <ul>{itemElements}</ul>
            </div>
        );
    }, [
        classes.menu,
        classes.menuItem,
        currentSort.sortAttribute,
        currentSort.sortDirection,
        currentSort.sortFromSearch,
        formatMessage,
        handleItemClick,
        orderSortingList,
        sortMethodsFromConfig
    ]);
    const closeAriaLabel = formatMessage({
        id: 'filterModal.filters.close.ariaLabel',
        defaultMessage: 'Close filters popup.'
    });

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <FocusScope contain restoreFocus autoFocus>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <aside
                    className={modalClass}
                    onKeyDown={handleKeyDownActions}
                    data-cy="SortModal-root"
                >
                    <div className={classes.body}>
                        <div className={classes.header}>
                            <h2 className={classes.headerTitle}>
                                <FormattedMessage
                                    id={'productSort.sortButton'}
                                    defaultMessage={'Sort'}
                                />
                            </h2>
                            <button
                                onClick={handleClose}
                                aria-disabled={false}
                                aria-label={closeAriaLabel}
                            />
                        </div>
                        <div className={classes.sortBy}>
                            <span className={classes.name}>
                                <FormattedMessage
                                    id={'productSort.sortByButton'}
                                    defaultMessage={'Sort by'}
                                />
                            </span>
                        </div>
                        {sortElements}
                    </div>
                </aside>
            </FocusScope>
        </Portal>
    );
};

SortModal.propTypes = {
    classes: shape({
        body: string,
        header: string,
        headerTitle: string,
        root: string,
        root_open: string
    }),
    sortProps: array
};

export default SortModal;
