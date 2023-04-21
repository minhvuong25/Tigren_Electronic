export const trackPageView = location => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'virtualPageView',
        page: location.pathname + location.search
    });
};
