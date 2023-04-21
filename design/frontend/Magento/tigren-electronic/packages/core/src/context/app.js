import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';

import actions from '@tigrensolutions/core/src/store/actions/app/actions';
import * as asyncActions from '@tigrensolutions/core/src/store/actions/app/asyncActions';
import * as coreActions from '@magento/peregrine/lib/store/actions/app/actions';
import * as coreAsyncActions from '@magento/peregrine/lib/store/actions/app/asyncActions';
import bindActionCreators from '@magento/peregrine/lib/util/bindActionCreators';

const AppContext = createContext();

const AppContextProvider = props => {
    const { actions, asyncActions, children, appState } = props;

    const appApi = useMemo(
        () => ({
            actions,
            ...asyncActions
        }),
        [actions, asyncActions]
    );

    const contextValue = useMemo(() => [appState, appApi], [appApi, appState]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

const mapStateToProps = ({ app, theme_app }) => ({
    appState: { ...app, ...theme_app }
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions, ...coreActions }, dispatch),
    asyncActions: bindActionCreators(
        { ...asyncActions, ...coreAsyncActions },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContextProvider);

/**
 * @returns {[AppState, AppActions]}
 */
export const useAppContext = () => useContext(AppContext);
