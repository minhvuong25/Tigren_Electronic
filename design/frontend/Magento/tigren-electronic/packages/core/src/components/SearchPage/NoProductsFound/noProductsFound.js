import React from 'react';
import { number, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from '@magento/venia-ui/lib/components/Image';
import { useStyle } from '@magento/venia-ui/lib/classify';
import noProductsFound from './noProductsFound.png';
import defaultClasses from './noProductsFound.module.css';

const NoProductsFound = props => {
    const { searchTerm } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const { formatMessage } = useIntl();

    const headerText = formatMessage(
        {
            id: 'searchPageNotFound.title',
            defaultMessage:
                'Search results of <highlight>{searchTerm}</highlight> product not found.'
        },
        {
            searchTerm,
            // eslint-disable-next-line react/jsx-no-literals
            highlight: chunks => <span>{`'${chunks}'`}</span>
        }
    );

    return (
        <div className={classes.root}>
            <Image
                alt={headerText}
                classes={{ image: classes.image, root: classes.imageContainer }}
                src={noProductsFound}
            />
            <h2 className={classes.title}>{headerText}</h2>
            <div className={classes.categories}>
                <p>
                    <FormattedMessage
                        id={'searchPageNotFound.description'}
                        defaultMessage={
                            'Please check the spelling of your search again.'
                        }
                    />
                </p>
            </div>
        </div>
    );
};

export default NoProductsFound;

NoProductsFound.propTypes = {
    categoryId: number,
    classes: shape({
        root: string,
        title: string,
        list: string,
        categories: string,
        listItem: string,
        image: string,
        imageContainer: string
    })
};
