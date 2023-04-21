const THEME_UI_PREFIX = `@tigrensolutions/core/src/components`;
const THEME_DEMO_PREFIX = `src/components`;
const CORE_TALON_PREFIX = '@magento/peregrine/lib/talons';
const DEMO_TALON_PREFIX = 'src/talons';
const TIGREN_DEMO_PREFIX = 'extend/tigren';

module.exports = overrideMapping = {
    components: {
        /**
         * ------------------------------------ ROOT COMPONENTS -------------------------------------------------
         */
        /**
         * ------------------------------------ COMPONENTS -----------------------------------------------------
         */
        /**
         * ------------------------------------ TALONS -------------------------------------------------
         */
        /**
         * ------------------------------------ UTILS -------------------------------------------------
         */
        /**
         * ------------------------------------ PAGE BUILDER -------------------------------------------------
         */
        /**
         * ------------------------------------ CSS -----------------------------------------------------
         */
        [`@tigrensolutions/core/src/index.module.css`]: `src/index.module.css`,
        [`@tigrensolutions/core/src/tokens.module.css`]: `src/tokens.module.css`
    }
};
