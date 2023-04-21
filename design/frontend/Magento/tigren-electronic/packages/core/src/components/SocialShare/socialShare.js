import React from 'react';
import {
    FacebookShareButton,
    LineShareButton,
    TwitterShareButton
} from 'react-share';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './socialShare.module.css';

const DEFAULT_URL = window.location.href;

const SocialShare = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { shareUrl = DEFAULT_URL, media } = props;

    return (
        <div className={`${classes.socialShare} ${props.className}`}>
            <ul className={'social-share'}>
                <li className={`${classes.icon} ${classes.iconFacebook}`}>
                    <FacebookShareButton url={shareUrl}>
                        <span className="icon icon-facebook" />
                    </FacebookShareButton>
                </li>
                <li className={`${classes.icon} ${classes.iconTwitter}`}>
                    <TwitterShareButton url={shareUrl}>
                        <span className="icon icon-twitter" />
                    </TwitterShareButton>
                </li>
                <li className={`${classes.icon} ${classes.iconLine}`}>
                    <LineShareButton url={shareUrl} media={media}>
                        <span className="icon icon-pinterest" />
                    </LineShareButton>
                </li>
            </ul>
        </div>
    );
};

export default SocialShare;
