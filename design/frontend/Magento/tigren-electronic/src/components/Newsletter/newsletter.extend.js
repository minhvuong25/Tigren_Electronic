module.exports = targetables => {
    const newsLetterComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Newsletter/newsletter.js'
    );
    newsLetterComponent.addImport(
        `extendClasses from 'src/components/Newsletter/newsletter.module.css'`
    );
    newsLetterComponent
        .insertAfterSource(`defaultClasses, props.classes`, `, extendClasses`)
        .insertAfterSource(
            `}
    }, [submitError]);`,
            `const titleSection = (
        <div className={classes.titleSection}>
            <span className={classes.title}>
                <FormattedMessage
                    id={'newsletter.titleText'}
                    defaultMessage={'Enter your email to receive information.'}
                />
            </span>
            <span className={classes.message}>
                <FormattedMessage
                    id={'newsletter.message'}
                    defaultMessage={
                        'Get all the latest information on Events, Sales and Offers.'
                    }
                />
            </span>
        </div>
    );`
        )
        .insertAfterSource(`{maybeLoadingIndicator}`, `{titleSection}`, {
            remove: 246
        });
};
