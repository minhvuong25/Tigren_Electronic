import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';
import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';
import { useStyle } from '@magento/venia-ui/lib/classify';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import NavHeader from '@magento/venia-ui/lib/components/Navigation/navHeader';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import AuthBar from '@tigrensolutions/core/src/components/AuthBar';
import defaultClasses from './navigation.module.css';

const CategoryTree = React.lazy(() =>
    import('@magento/venia-ui/lib/components/CategoryTree')
);

const AuthModal = React.lazy(() =>
    import('@tigrensolutions/core/src/components/AuthModal')
);

const Navigation = props => {
    const {
        catalogActions,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        showCreateAccount,
        showForgotPassword,
        showMainMenu,
        showMyAccount,
        showSignIn,
        view
    } = useNavigation();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const modalClassName = hasModal ? classes.modal_open : classes.modal;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;
    const accountClass = view === 'MY_ACCOUNT' ? classes.account : '';
    const showCate = !isTopLevel ? classes.cate : '';

    // Lazy load the auth modal because it may not be needed.
    const authModal = hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <header className={`${classes.header} ${accountClass}`}>
                <NavHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    view={view}
                />
            </header>
            <AuthModal
                closeDrawer={handleClose}
                showCreateAccount={showCreateAccount}
                showForgotPassword={showForgotPassword}
                showMainMenu={showMainMenu}
                showMyAccount={showMyAccount}
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    return (
        <>
            <aside className={rootClassName}>
                <div className={classes.topLink}>
                    <AuthBar
                        disabled={hasModal}
                        closeDrawer={handleClose}
                        showMyAccount={showMyAccount}
                        showSignIn={showSignIn}
                        showCreateAccount={showCreateAccount}
                    />
                </div>
                {!isTopLevel && (
                    <header className={classes.header}>
                        <NavHeader
                            isTopLevel={isTopLevel}
                            onBack={handleBack}
                            view={view}
                        />
                    </header>
                )}
                <div className={`${bodyClassName} ${showCate}`}>
                    {!hasModal && (
                        <Suspense fallback={null}>
                            <CategoryTree
                                categoryId={categoryId}
                                onNavigate={handleClose}
                                setCategoryId={setCategoryId}
                                updateCategories={
                                    catalogActions.updateCategories
                                }
                            />
                        </Suspense>
                    )}
                </div>
                <div className={classes.footer}>
                    <div className={classes.switchers}>
                        <div className={classes.store}>
                            <StoreSwitcher />
                        </div>
                        <CurrencySwitcher />
                    </div>
                </div>
                <div className={modalClassName}>{authModal}</div>
            </aside>
            {isOpen && (
                <button className={classes.close} onClick={handleClose} />
            )}
        </>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string
    })
};
