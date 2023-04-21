const isModuleAvailable = require('@tigrensolutions/base/helpers/isModuleAvailable');

module.exports = (targetables, targetablePath) => {
    if (isModuleAvailable(`@tigrensolutions/core`)) {
        // Import Suspense
        const AppComponent = targetables.reactComponent(
            '@tigrensolutions/core/src/components/App/app.js'
        );
        AppComponent.addImport("{ Suspense } from 'react'");
    }
};
