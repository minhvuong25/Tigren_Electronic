import { useEffect, useState } from 'react';
// @github: https://github.com/wednesday-solutions/react-screentype-hook
const DEFAULT_BREAKPOINTS = {
    largeDesktop: 1440,
    desktop: 992,
    tablet: 768,
    mobile: 320
};
const BREAKPOINT_TYPES = {
    mobile: 'MOBILE',
    tablet: 'TABLET',
    desktop: 'DESKTOP',
    largeDesktop: 'LARGE_DESKTOP'
};
const getCurrentScreenType = currentScreenType => ({
    isMobile: currentScreenType === BREAKPOINT_TYPES.mobile,
    isTablet: currentScreenType === BREAKPOINT_TYPES.tablet,
    isDesktop:
        currentScreenType === BREAKPOINT_TYPES.desktop ||
        currentScreenType === BREAKPOINT_TYPES.largeDesktop,
    isLargeDesktop: currentScreenType === BREAKPOINT_TYPES.largeDesktop
});

const calculateCurrentScreenType = breakpoints => ({
    isMobile: window.innerWidth < breakpoints.tablet,
    isTablet:
        window.innerWidth >= breakpoints.tablet &&
        window.innerWidth < breakpoints.desktop,
    isDesktop:
        window.innerWidth >= breakpoints.desktop &&
        window.innerWidth < breakpoints.largeDesktop,
    isLargeDesktop: window.innerWidth >= breakpoints.largeDesktop
});

function useScreenType(breakpoints = DEFAULT_BREAKPOINTS) {
    const [screenType, setScreenType] = useState(
        getCurrentScreenType(breakpoints)
    );
    const handleResize = type => event =>
        event.matches && setScreenType(getCurrentScreenType(type));

    useEffect(() => {
        setScreenType(calculateCurrentScreenType(breakpoints));

        const largeDesktopQueryList = matchMedia(
            `(min-width: ${breakpoints.largeDesktop}px)`
        );
        const desktopQueryList = matchMedia(
            `(min-width: ${
                breakpoints.desktop
            }px) and (max-width: ${breakpoints.largeDesktop - 1}px)`
        );
        const tabletQueryList = matchMedia(
            `(min-width: ${
                breakpoints.tablet
            }px) and (max-width: ${breakpoints.desktop - 1}px)`
        );
        const mobileQueryList = matchMedia(
            `(max-width: ${breakpoints.tablet}px)`
        );

        mobileQueryList.addListener(handleResize(BREAKPOINT_TYPES.mobile));
        tabletQueryList.addListener(handleResize(BREAKPOINT_TYPES.tablet));
        desktopQueryList.addListener(handleResize(BREAKPOINT_TYPES.desktop));
        largeDesktopQueryList.addListener(
            handleResize(BREAKPOINT_TYPES.largeDesktop)
        );

        return () => {
            mobileQueryList.removeListener(
                handleResize(BREAKPOINT_TYPES.mobile)
            );
            tabletQueryList.removeListener(
                handleResize(BREAKPOINT_TYPES.tablet)
            );
            desktopQueryList.removeListener(
                handleResize(BREAKPOINT_TYPES.desktop)
            );
            largeDesktopQueryList.removeListener(
                handleResize(BREAKPOINT_TYPES.largeDesktop)
            );
        };
    }, []);
    return screenType;
}

export default useScreenType;
