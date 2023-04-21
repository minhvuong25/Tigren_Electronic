module.exports = (targetables, targetablePath) => {
    const swatchListComponent = targetables.reactComponent(targetablePath);

    swatchListComponent.insertAfterSource(
        `import defaultClasses from `,
        `'@tigrensolutions/product-swatches/src/components/ProductOptions/swatchList.module.css'`,
        {
            remove: 25
        }
    );

    swatchListComponent.addImport(
        `{ findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant'`
    );

    swatchListComponent.insertBeforeSource(
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

    swatchListComponent.insertAfterSource(
        `<Swatch`,
        `
                        isDisabled={isDisabled}`
    );
};
