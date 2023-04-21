module.exports = targets => {
    const productOptions = targets.reactComponent(
        '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions.js'
    );
    productOptions.addImport(`import { FormattedMessage } from 'react-intl'`);
    productOptions
        .insertAfterSource(
            ` = props;`,
            `const [open, setOpen] = useState(false)`
        )
        .insertAfterSource(
            `key={key} className={`,
            '`${classes.optionLabel} ${open ? classes.showLabel : classes.hideLabel}`',
            { remove: 19 }
        )
        .insertBeforeSource(
            `return <dl className={`,
            "const expandButton = <button type={'button'} className={classes.expandButton}\n" +
                '                                 onClick={() => setOpen(open => !open)}>{open\n' +
                "        ? (<FormattedMessage id={'global.showLess'} defaultMessage={'Show less'} />)\n" +
                "        : (<FormattedMessage id={'global.showMore'} defaultMessage={'Show more'} />)}</button>;"
        )
        .insertAfterSource(`<dl className={classes.options}>`, `{expandButton}`)
        .insertAfterSource(`React, { useMemo`, `, useState`);
};
