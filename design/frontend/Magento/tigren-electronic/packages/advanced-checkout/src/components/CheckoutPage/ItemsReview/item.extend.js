module.exports = (targetables, targetablePath) => {
    const itemCheckout = targetables.reactComponent(targetablePath);
    itemCheckout.insertAfterSource(
        'const configured_variant = configuredVariant(configurable_options, product);',
        `
        const { price_including_tax } = props.prices || [];
        const { value: unitPrice, currency } = price_including_tax;
    `
    );
    itemCheckout.addImport(
        "Price from '@magento/venia-ui/lib/components/Price'"
    );
    itemCheckout.insertAfterSource(
        '<span className={classes.name}>{product.name}</span>',
        `
            <div className={classes.price}>
                <Price value={unitPrice} currencyCode={currency || 'USD'} />
            </div>
            `
    );
};
