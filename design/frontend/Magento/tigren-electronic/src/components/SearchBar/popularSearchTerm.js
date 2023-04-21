import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { GET_POPULAR_SEARCH_TERMS } from 'src/components/SearchBar/searchTerm.gql';
import defaultClasses from './popularSearch.module.css';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button';
import { Link } from 'react-router-dom';

const PopularSearchTerm = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();

    const { data: popularSearchTerms } = useQuery(GET_POPULAR_SEARCH_TERMS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const popularSearchTermsItems = useMemo(() => {
        if (popularSearchTerms) {
            return popularSearchTerms.popularSearchTerms.items;
        }
    }, [popularSearchTerms]);

    const headerText = formatMessage({
        id: 'searchPage.popularKeyword',
        defaultMessage: 'Popular Keywords'
    });
    const buttonList = useMemo(() => {
        if (popularSearchTermsItems) {
            return popularSearchTermsItems.map(item => {
                return (
                    <Button
                        priority={'high'}
                        type={'button'}
                        className={classes.button}
                    >
                        <Link
                            className={classes.link}
                            to={`/search.html?query=${item.query_text}`}
                        >
                            {item.query_text}
                        </Link>
                    </Button>
                );
            });
        }
    }, [popularSearchTermsItems]);

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{headerText}</h2>
            <div className={classes.list}>{buttonList}</div>
        </div>
    );
};

PopularSearchTerm.propTypes = {
    classes: shape({
        root: string,
        title: string,
        list: string,
        button: string,
        link: string
    })
};

export default PopularSearchTerm;
