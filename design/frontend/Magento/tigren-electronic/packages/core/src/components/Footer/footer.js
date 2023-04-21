import React from 'react';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';
import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';
import Newsletter from '@tigrensolutions/core/src/components/Newsletter';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './footer.module.css';

const Footer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    return (
        <footer className={classes.root}>
            <div className={classes.footerTop}>
                <CmsBlockGroup
                    identifiers={`pbh-footer-top`}
                    dynamicJS={true}
                />
            </div>
            <div className={classes.links}>
                <div className={classes.linkFooter}>
                    <CmsBlockGroup
                        identifiers={`pbh-footer-link`}
                        dynamicJS={true}
                    />
                </div>
                <div className={classes.social}>
                    <div className={classes.newsletters}>
                        <Newsletter />
                    </div>
                    <CmsBlockGroup
                        identifiers={`pbh-footer-social`}
                        dynamicJS={true}
                    />
                </div>
            </div>
            <div className={classes.branding}>
                <p className={classes.copyright}>{copyrightText || null}</p>
            </div>
        </footer>
    );
};

export default Footer;

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
