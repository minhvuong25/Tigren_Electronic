export const getPriceSelectedValue = (option, dynamic_price) => {
    let exclMinimal = 0;
    let realMinimal = 0;
    if (dynamic_price) {
        exclMinimal =
            option?.product?.price_range?.minimum_price
                ?.minimum_final_price_excl_tax?.value;
        realMinimal =
            option?.product?.price_range?.minimum_price?.final_price?.value;
    } else {
        exclMinimal = option.final_price_excl_tax;
        realMinimal = option.final_price;
    }

    return {
        exclMinimal,
        realMinimal
    };
};

const getCustomizeOptionPrice = (price, type, product) => {
    if (type === 'FIXED') {
        return price;
    } else if (type === 'PERCENT') {
        if (product.special_price) {
            price = (price * product.special_price) / 100;
        } else {
            price = (price * product.final_price) / 100;
        }
        return price;
    }
};

export const getOptionPrice = (product, customizeOptions = []) => {
    if (!Array.isArray(product.options)) return 0;

    let optionPrice = 0;

    for (const [id, value] of customizeOptions) {
        if (!value) continue;
        const optionSelected = product.options.find(
            option => option.option_id == id
        );
        if (!optionSelected) continue;
        if (optionSelected.value) {
            if (Array.isArray(optionSelected.value)) {
                if (Array.isArray(value)) {
                    optionSelected.value.forEach(optionValue => {
                        value.forEach(valueSelected => {
                            if (optionValue.option_type_id == valueSelected) {
                                optionPrice += getCustomizeOptionPrice(
                                    optionValue.final_price,
                                    optionValue.price_type,
                                    product
                                );
                            }
                        });
                    });
                } else {
                    optionSelected.value.forEach(optionValue => {
                        if (optionValue.option_type_id == value) {
                            optionPrice += getCustomizeOptionPrice(
                                optionValue.final_price,
                                optionValue.price_type,
                                product
                            );
                        }
                    });
                }
            } else {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.value.final_price,
                    optionSelected.value.price_type,
                    product
                );
            }
        } else {
            if (optionSelected.typeId == 'field') {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.field.final_price,
                    optionSelected.field.price_type,
                    product
                );
            } else if (optionSelected.typeId == 'file') {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.file.final_price,
                    optionSelected.file.price_type,
                    product
                );
            }
        }
    }
    return optionPrice;
};

export const getOptionPriceExclTax = (product, customizeOptions = []) => {
    if (!Array.isArray(product.options)) return 0;

    let optionPrice = 0;

    for (const [id, value] of customizeOptions) {
        if (!value) continue;
        const optionSelected = product.options.find(
            option => option.option_id == id
        );
        if (!optionSelected) continue;
        if (optionSelected.value) {
            if (Array.isArray(optionSelected.value)) {
                if (Array.isArray(value)) {
                    optionSelected.value.forEach(optionValue => {
                        value.forEach(valueSelected => {
                            if (optionValue.option_type_id == valueSelected) {
                                optionPrice += getCustomizeOptionPrice(
                                    optionValue.price,
                                    optionValue.price_type,
                                    product
                                );
                            }
                        });
                    });
                } else {
                    optionSelected.value.forEach(optionValue => {
                        if (optionValue.option_type_id == value) {
                            optionPrice += getCustomizeOptionPrice(
                                optionValue.price,
                                optionValue.price_type,
                                product
                            );
                        }
                    });
                }
            } else {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.value.price,
                    optionSelected.value.price_type,
                    product
                );
            }
        } else {
            if (optionSelected.typeId == 'field') {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.field.price,
                    optionSelected.field.price_type,
                    product
                );
            } else if (optionSelected.typeId == 'file') {
                optionPrice += getCustomizeOptionPrice(
                    optionSelected.file.price,
                    optionSelected.file.price_type,
                    product
                );
            }
        }
    }
    return optionPrice;
};
