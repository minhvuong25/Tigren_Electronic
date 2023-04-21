/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

const wrapConfigAggregator = original => (node, props) => {
    const defaultData = original(node, props);

    const forms = node.querySelectorAll(
        '.product-item-details > .product-item-name > a.product-item-link'
    );
    const productSkus = [...forms].map(
        form => form.getAttribute('data-sku') || ''
    );

    return {
        ...defaultData,
        productSkus: productSkus || []
    };
};

export default wrapConfigAggregator;
