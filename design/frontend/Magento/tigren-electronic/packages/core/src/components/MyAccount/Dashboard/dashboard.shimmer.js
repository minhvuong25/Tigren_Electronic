import React, { Fragment } from 'react';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './dashboard.module.css';

const DashboardShimmer = (props = {}) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            <div className={classes.skeleton}>
                <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <div className={classes.content}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.content}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                    </div>
                </div>

                <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <div className={classes.content}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.content}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

DashboardShimmer.defaultProps = {
    classes: {}
};

DashboardShimmer.propTypes = {};

export default DashboardShimmer;
