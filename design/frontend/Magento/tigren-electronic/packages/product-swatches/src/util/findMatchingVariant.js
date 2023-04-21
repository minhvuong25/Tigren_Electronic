const equals = (a, b) => {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
        const aCount = a.filter(e => e === v).length;
        const bCount = b.filter(e => e === v).length;
        if (aCount !== bCount) return false;
    }
    return true;
};

export const findMatchingVariant = (selectedOptions, variants) => {
    return variants.find(variant => {
        const { attributes } = variant;
        const attributeUids = attributes.map(({ uid }) => uid);

        return equals(selectedOptions, attributeUids);
    });
};
