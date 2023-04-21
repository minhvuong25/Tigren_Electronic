import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

export const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!product || !isProductConfigurable(product)) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options } = product;
    const numProductOptions = configurable_options.length;
    const numProductSelections = Array.from(optionSelections.values()).filter(
        value => !!value
    ).length;

    return numProductSelections < numProductOptions;
};
