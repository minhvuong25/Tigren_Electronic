module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderParseStorageHtml = targetables.reactComponent(
        targetablePath
    );

    magentoPageBuilderParseStorageHtml.insertAfterSource(
        `if (currentNode.nodeType !== Node.ELEMENT_NODE) {
            currentNode = tree.nextNode();
            continue;
        }
`,
        `let contentType = currentNode.getAttribute('data-content-type');`,
        { remove: 76 }
    );
    magentoPageBuilderParseStorageHtml.insertBeforeSource(
        `const props = createContentTypeObject(contentType, currentNode);`,
        `

        if (contentType === 'html' && currentNode.innerText) {
            if (
                currentNode.innerHTML.includes('data-content-type="category"')
            ) {
                contentType = 'category';
            }
            // pending fix page builder work with module "amasty shop by brand"
            if (currentNode.innerHTML.includes('var amBrandConfig')) {
                contentType = 'block';
            }
        }
`
    );
};
