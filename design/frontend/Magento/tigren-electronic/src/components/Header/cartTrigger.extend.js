module.exports = targetables => {
    const cartTriggerComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Header/cartTrigger.js'
    );
    cartTriggerComponent.addImport(
        `extendClasses from 'src/components/Header/cartTrigger.module.css'`
    );
    cartTriggerComponent.addImport(`{ Price } from '@magento/peregrine';`);

    cartTriggerComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertAfterSource(`itemCount,`, `cartTotal,`);

    cartTriggerComponent
        .insertAfterSource(
            `defaultMessage: 'Shopping cart'
    });`,
            `const count = (
        <span>
            {formatMessage(
                {
                    id: 'cartTrigger.quantity',
                    defaultMessage: '{count} item(s)'
                },
                { count: itemCount || 0 }
            )}
        </span>
    );
    const subtotalPrice = (
        <Price
            currencyCode={cartTotal?.currency || 'USD'}
            value={cartTotal?.value || 0}
        />
    );

    const total = (
        <span>
            {formatMessage(
                {
                    id: 'cartPage.total',
                    defaultMessage: 'Total : {total}'
                },
                { total: subtotalPrice }
            )}
        </span>
    );`
        )
        .insertAfterSource(
            `<Icon src={ShoppingCartIcon} />`,
            `<div className={classes.right}>
                                {count}
                                {total}
                            </div>`,
            { remove: 86 }
        );
};
