module.exports = targetables => {
    const breadcrumbsComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Breadcrumbs/breadcrumbs.js'
    );
    breadcrumbsComponent.addImport(
        `extendClasses from 'src/components/Breadcrumbs/breadcrumbs.module.css'`
    );
    breadcrumbsComponent.addImport("{ useState } from 'react'");
    breadcrumbsComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertAfterSource(
            `const talonProps = useBreadcrumbs({ categoryId });`,
            'const [lastBreadcrumbs, setLastBreadcrumbs] = useState("/");'
        )
        .insertAfterSource(
            `return normalizedData.map(({ text, path }) => {`,
            `setLastBreadcrumbs(path);`
        )
        .insertAfterSource(
            `{currentProductNode}`,
            `<Link className={classes.navigate} to={resourceUrl(lastBreadcrumbs)} onClick={handleClick}>
            </Link>`
        );
};
