export const trackPageViewGa4 = location => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'virtual_page_view',
        page: location.pathname + location.search
    });
};
