const { Targetables } = require('@magento/pwa-buildpack');
const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

/*
 * We are using the targetable module to add common transforms to React components.
 * With the per project, we should edit the component below.
 * @see https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targetables/TargetableReactComponent
 */
module.exports = targets => {
    const targetables = Targetables.using(targets);

    //Display mode  category page
    const categoryFragmentGraphql = targetables.reactComponent(
        `@magento/peregrine/lib/talons/RootComponents/Category/categoryFragments.gql.js`
    );
    categoryFragmentGraphql.insertAfterSource(
        `meta_description`,
        `
        display_mode
        landing_page
    `
    );

    const categoryContentComponent = targetables.reactComponent(
        `@magento/venia-ui/lib/RootComponents/Category/categoryContent.js`
    );
    categoryContentComponent.addImport(
        `import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';`
    );

    categoryContentComponent.insertBeforeSource(
        `const maybeSortButton = shouldShowSortButtons ? (`,
        `
    const displayMode =
        data?.categories?.items &&
        data?.categories?.items[0] &&
        data.categories.items[0].display_mode !== 'false'
            ? data.categories.items[0].display_mode
            : null;
    const landingPage =
        data?.categories?.items &&
        data?.categories?.items[0] &&
        data.categories.items[0].landing_page !== 'false'
            ? data.categories.items[0].landing_page
            : null;
    `
    );

    categoryContentComponent.insertAfterSource(
        `{categoryDescriptionElement}
                </div>`,
        `
                {displayMode && displayMode !=  "PRODUCTS" && (
                    <CmsBlockGroup
                        identifiers={landingPage}
                        dynamicJS={true}
                    />
                )}
                { displayMode !=  "PAGE" && (
                `
    );
    categoryContentComponent.insertBeforeSource(
        `</article>`,
        `
                )}
            `
    );

    if (isModuleAvailable('@tigrensolutions/core')) {
        //Display mode  category page
        const categoryFragmentGraphql = targetables.reactComponent(
            `@tigrensolutions/core/src/talons/RootComponents/Category/categoryFragments.gql.js`
        );
        categoryFragmentGraphql.insertAfterSource(
            `meta_description`,
            `
        display_mode
        landing_page
    `
        );

        const categoryContentComponent = targetables.reactComponent(
            `@tigrensolutions/core/src/RootComponents/Category/categoryContent.js`
        );
        categoryContentComponent.addImport(
            `import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';`
        );

        categoryContentComponent.insertBeforeSource(
            `const maybeSortButton = shouldShowSortButtons ? (`,
            `
    const displayMode =
        data?.categories?.items &&
        data?.categories?.items[0] &&
        data.categories.items[0].display_mode !== 'false'
            ? data.categories.items[0].display_mode
            : null;
    const landingPage =
        data?.categories?.items &&
        data?.categories?.items[0] &&
        data.categories.items[0].landing_page !== 'false'
            ? data.categories.items[0].landing_page
            : null;
    `
        );

        categoryContentComponent.insertAfterSource(
            `{categoryDescriptionElement}
                </div>`,
            `
                {displayMode && displayMode !=  "PRODUCTS" && (
                    <CmsBlockGroup
                        identifiers={landingPage}
                        dynamicJS={true}
                    />
                )}
                `
        );

        categoryContentComponent.insertBeforeSource(
            `currentFilter && (`,
            `displayMode != "PAGE" && `
        );

        categoryContentComponent.insertBeforeSource(
            `<div
                    className=`,
            `{displayMode != "PAGE" &&(
                    `
        );

        categoryContentComponent.insertBeforeSource(
            `</article>`,
            `
                )}
            `
        );
    }
};
