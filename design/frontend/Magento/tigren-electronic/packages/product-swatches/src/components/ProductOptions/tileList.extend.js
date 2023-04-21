module.exports = (targetables, targetablePath) => {
    const tileListComponent = targetables.reactComponent(targetablePath);

    tileListComponent.insertAfterSource(
        `import defaultClasses from `,
        `'@tigrensolutions/product-swatches/src/components/ProductOptions/tileList.module.css'`,
        {
            remove: 23
        }
    );

    tileListComponent.addImport(
        `{ findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant'`
    );

    tileListComponent.insertBeforeSource(
        `const isSelected = item.label === selectedValue.label;`,
        `let isSelected = item.label === selectedValue.label;

                let isDisabled = false;
                if (props.optionSelections) {
                    const nextOptionSelections = new Map([...props.optionSelections]);
                    nextOptionSelections.set(props.attribute_id, item.value_index);
                    const variant = findMatchingVariant({
                        optionCodes: props.optionCodes,
                        optionSelections: nextOptionSelections,
                        variants: props.inStockVariants
                    });

                    isDisabled =
                        !variant || variant.product.stock_status !== 'IN_STOCK';

                    isSelected =
                        item.value_index === props.optionSelections.get(props.attribute_id);
                }`,
        {
            remove: 54
        }
    );

    tileListComponent.insertAfterSource(
        `<Tile`,
        `
                        isDisabled={isDisabled}`
    );
};
