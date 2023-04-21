module.exports = targetables => {
    const headerComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/Header/header.js'
    );
    headerComponent.addImport(`{ useLocation } from 'react-router-dom';`);
    headerComponent.addImport(`{ useEffect } from 'react';`);
    headerComponent.addImport(
        `import ComparePopupComponent from '@tigrensolutions/compare/src/components/ComparePopup/comparePopup.js'`
    );
    headerComponent.addImport(
        `extendClasses from 'src/components/Header/header.module.css'`
    );
    headerComponent
        .insertAfterSource(
            `useStyle(defaultClasses, props.classes`,
            `,extendClasses`
        )
        .insertAfterSource(
            `<CmsBlockGroup
                                identifiers={'pbh-header-promo'}
                                dynamicJS={true}
                                disableLazyLoad={true}
                            />
                        </div>`,
            `
                        <div className={classes.rightNav}>
                            {!isBotOrHeadless && (
                                <CartTrigger isShowMiniCart={true} />
                            )}
                        </div>`
        )
        .insertAfterSource(
            '<div className={classes.rightNav}>',
            `
                            <Suspense fallback={null}>
                                <ComparePopupComponent />
                            </Suspense>`
        )
        .insertAfterSource(
            `<AccountTrigger />
                        </div>`,
            `<div className={classes.help}>
                            <CmsBlockGroup
                                identifiers={\`pbh-header-help\`}
                                dynamicJS={true}
                                disableLazyLoad={true}
                            />
                        </div>`
        )
        .insertBeforeSource(`pbh-header-link`, `pbh-header-promo`, {
            remove: 15
        })
        .insertBeforeSource(
            `<div className={classes.accountActions}>`,
            `<div className={classes.headerContact}>
                            <CmsBlockGroup
                                identifiers={\`pbh-header-link\`}
                                dynamicJS={true}
                                disableLazyLoad={true}
                            />
                        </div>`
        )
        .insertBeforeSource(
            `const { isMobile, isPhablet } = useWindowSize();`,
            `
    const { pathname } = useLocation();
    useEffect(() => {
        document.documentElement.setAttribute(
                'data-page',
                pathname
        );
    }, [pathname]);
    `
        );
};
