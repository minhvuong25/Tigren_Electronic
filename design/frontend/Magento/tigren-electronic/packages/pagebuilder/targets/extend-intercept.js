/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    targets.of('@magento/pagebuilder').customContentTypes.tap(contentTypes =>
        contentTypes.add({
            contentType: 'category',
            importPath: '@tigrensolutions/pagebuilder/src/ContentTypes/Category'
        })
    );
};
