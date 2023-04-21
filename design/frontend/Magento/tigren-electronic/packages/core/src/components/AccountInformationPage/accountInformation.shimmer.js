import React, { Fragment } from 'react';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './accountInformationPage.module.css';

const AccountInformationPageShimmer = (props = {}) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            <div className={classes.skeleton}>
                <div className={classes.profileInfo}>
                    <Shimmer width="100%" height={'100%'} />
                </div>

                <div className={classes.selection}>
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </Fragment>
    );
};

AccountInformationPageShimmer.defaultProps = {
    classes: {}
};

AccountInformationPageShimmer.propTypes = {};

export default AccountInformationPageShimmer;
