import React, { useState } from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '@tigrensolutions/core/src/components/Footer';
import Header from '@tigrensolutions/core/src/components/Header';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    try {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) splashScreen.style.display = 'none';
    } catch (err) {
        console.warn('Spash screen was not found.');
    }

    return (
        <main className={rootClass}>
            <Header />
            <div className={pageClass}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};