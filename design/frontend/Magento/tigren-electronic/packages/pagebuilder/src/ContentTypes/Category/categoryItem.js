import React from 'react';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import categoryImageDemo from './category-placeholder.jpg';

import defaultClasses from './category.module.css';

const CategoryItem = props => {
    const classes = useStyle(props.classes, defaultClasses);
    const { item } = props;

    if (!item) {
        return null;
    }

    const { name } = item;

    const path = `${item.url_path}${item.url_suffix}`;
    const url = resourceUrl(`/${path}`);

    const thumbnail =
        item && item.thumbnail ? (
            <Image
                classes={{
                    root: classes.categoryImage,
                    placeholder: classes.placeholder
                }}
                resource={item.thumbnail}
                alt={name}
                type={'image-category'}
                width={180}
                ratio={6 / 5}
            />
        ) : (
            <img src={categoryImageDemo} alt={name} />
        );

    return (
        <article className={classes.image}>
            <Link to={url}>
                {thumbnail}
                <span className={classes.text}>{name}</span>
            </Link>
        </article>
    );
};

export default CategoryItem;
