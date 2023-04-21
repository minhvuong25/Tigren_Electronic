import React from 'react';
import { Link } from 'react-router-dom';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Breadcrumbs/breadcrumbs.module.css';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Breadcrumbs = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { currentText } = props;
    return (
        <div className={classes.root}>
            <Link className={classes.link} to="/">
                <FormattedMessage id={'global.home'} defaultMessage={'Home'} />
            </Link>
            <span className={classes.divider}>/</span>
            <span className={classes.text}>{currentText}</span>
        </div>
    );
};

Breadcrumbs.propTypes = {
    currentBrand: string.isRequired
};

export default Breadcrumbs;
