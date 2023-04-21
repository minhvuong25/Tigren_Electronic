module.exports = targetables => {
    const socialComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/SocialShare/socialShare.js'
    );
    socialComponent.addImport(
        'extendClasses from "src/components/SocialShare/socialShare.module.css"'
    );
    socialComponent.addImport(`{ LinkedinShareButton } from 'react-share';`);
    socialComponent.addImport(`{ EmailShareButton } from 'react-share';`);
    socialComponent
        .insertAfterSource(`defaultClasses, props.classes`, `, extendClasses`)
        .insertAfterSource(
            `</TwitterShareButton>
                </li>`,
            `<li className={classes.icon + ' ' + classes.iconLinkedin}>
                    <LinkedinShareButton url={shareUrl}>
                        <span className="icon icon-linkedin" />
                    </LinkedinShareButton>
                </li>
                <li className={classes.icon + ' ' + classes.iconEmail}>
                    <EmailShareButton url={shareUrl}>
                        <span className="icon icon-email" />
                    </EmailShareButton>
                </li>`
        )
        .insertBeforeSource(
            '<li className={`${classes.icon} ${classes.iconLine}`}>',
            ``,
            {
                remove: 247
            }
        );
};
