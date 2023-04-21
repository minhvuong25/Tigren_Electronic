module.exports = targetables => {
    const richContentComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/RichContent/richContent.js'
    );
    richContentComponent.addImport("LazyLoad from 'react-lazyload'");

    richContentComponent.insertBeforeSource(
        'if (canRender(rendererProps.html)) {',
        `if ((!props.disableLazyLoad && !Renderer.disableLazyLoad) && canRender(rendererProps.html)) {
        return (
            <LazyLoad height={300} once={true}>
                <Component {...rendererProps} />
            </LazyLoad>
        );
    } else `
    );
};
