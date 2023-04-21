const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');
module.exports = targetables => {
    const isGoogleTagManagerModuleAvailable = isModuleAvailable(
        '@tigrensolutions/google-tag-manager'
    );
    const headComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Head/index.js'
    );

    headComponent
    .insertAfterSource(
        `storeConfig {`,
        `
            head_title_suffix
            head_title_prefix`
    )
    .insertBeforeSource(
        `let titleText;`,
        `
    const headTitlePrefix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_prefix : '';
    }, [storeNameData]);

    const headTitleSuffix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_suffix : '';
    }, [storeNameData]);

    `
    )
    .insertAfterSource(
        `titleText = storeName;
    }`,
        `
    if (headTitlePrefix) {
        titleText = \`\${headTitlePrefix} \${titleText}\`;
    }

    if (headTitleSuffix) {
        titleText = \`\${titleText} \${headTitleSuffix}\`;
    }

    `
    );

    if (isGoogleTagManagerModuleAvailable) {
        headComponent
        .insertBeforeSource(
            `return (
        <Helmet>
            <title {...tagProps}>{children}</title>
        </Helmet>
    );`,
            `
    const storeName = useMemo(() => {
        return storeNameData
            ? storeNameData.storeConfig.store_name
            : STORE_NAME;
    }, [storeNameData]);

    const headTitlePrefix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_prefix : '';
    }, [storeNameData]);

    const headTitleSuffix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_suffix : '';
    }, [storeNameData]);

    let defaultTitleText;
    if (children) {
        defaultTitleText = \`\${children}\`;
    } else {
        defaultTitleText = storeName;
    }

    if (headTitlePrefix) {
        defaultTitleText = \`\${headTitlePrefix} \${defaultTitleText}\`;
    }

    if (headTitleSuffix) {
        defaultTitleText = \`\${defaultTitleText} \${headTitleSuffix}\`;
    }
`
        )
        .insertBeforeSource(
            `<title {...tagProps}>{children}</title>`,
            `<title {...tagProps}>{defaultTitleText}</title>`,
            { remove: 39 }
        );
    } else {
        headComponent
        .insertAfterSource(
            `export const Title = props => {
    const { children, ...tagProps } = props;`,
            `
    const { data: storeNameData } = useQuery(STORE_NAME_QUERY);
    
    const storeName = useMemo(() => {
        return storeNameData
            ? storeNameData.storeConfig.store_name
            : STORE_NAME;
    }, [storeNameData]);
    
    const headTitlePrefix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_prefix : '';
    }, [storeNameData]);

    const headTitleSuffix = useMemo(() => {
        return storeNameData ? storeNameData.storeConfig.head_title_suffix : '';
    }, [storeNameData]);

    let defaultTitleText;
    if (children) {
        defaultTitleText = \`\${children}\`;
    } else {
        defaultTitleText = storeName;
    }

    if (headTitlePrefix) {
        defaultTitleText = \`\${headTitlePrefix} \${defaultTitleText}\`;
    }

    if (headTitleSuffix) {
        defaultTitleText = \`\${defaultTitleText} \${headTitleSuffix}\`;
    }
`
        )
        .insertBeforeSource(
            `<title {...tagProps}>{children}</title>`,
            `<title {...tagProps}>{defaultTitleText}</title>`,
            { remove: 39 }
        );
    }
};
