const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = (targetables, targetablePath) => {
    if (!isModuleAvailable('@tigrensolutions/core')) {
        const productOptions = targetables.reactComponent(targetablePath);
        productOptions.addImport(
            `import { FormattedMessage } from 'react-intl'`
        );

        productOptions
            .insertAfterSource(
                `<div key={key} className={classes.optionLabel}>`,
                `
                        {open &&
                            <>
                                `
            )
            .insertAfterSource(`React, { useMemo`, `, useState`);

        productOptions
            .insertAfterSource(
                ` = props;`,
                `const [open, setOpen] = useState(false)`
            )
            .insertAfterSource(
                `{value_label}
                        </dd>`,
                `
                            </>
                        }
                    `
            )
            .insertBeforeSource(
                `return <dl className={`,
                "const expandButton = <button type={'button'} className={classes.expandButton}\n" +
                    '                                 onClick={() => setOpen(open => !open)}>{open\n' +
                    "        ? (<FormattedMessage id={'global.showLess'} defaultMessage={'Show less'} />)\n" +
                    "        : (<FormattedMessage id={'global.showMore'} defaultMessage={'Show more'} />)}</button>;"
            )
            .insertAfterSource(
                `<dl className={classes.options}>`,
                `{expandButton}`
            );
    }
    const productOptions = targetables.reactComponent(
        '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions'
    );

    productOptions.insertBeforeSource(
        'const ProductOptions = props',
        `const convertCustomizeToConfig = (options = []) => {
            return options.reduce((result, option) => {
                if (!option) {
                    return result;
                }

                const optionLabel = option.label;

                const valueLabelMap = ((option && option.values) || []).reduce(
                    (valueLabels, value) => {
                        valueLabels = [...valueLabels, value.label];
                        return valueLabels;
                    },
                    []
                );
                const valueLabel = valueLabelMap.join(', ');

                result.push({
                    option_label: optionLabel,
                    value_label: valueLabel
                });
                return result;
            }, []);
        };

        `
    );

    productOptions.insertAfterSource(
        'const { options = []',
        `,
        configurableCustomizable = [],
        simpleCustomizable = []`
    );

    productOptions.insertBeforeSource(
        `const classes = useStyle`,
        `const customizeoptions = [
        ...options,
        ...convertCustomizeToConfig(configurableCustomizable),
        ...convertCustomizeToConfig(simpleCustomizable)
    ];
    `
    );

    productOptions.insertBeforeSource('options.map', `customize`);

    productOptions.insertBeforeSource('options]', `customize`);
};
