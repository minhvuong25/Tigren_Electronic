import { useEffect } from 'react';
import { useGoogleTagManagerContext } from '../../context';

const successfulCheckout = data => {
    const {
        google_tag_manager_general_enabled,
        google_tag_manager_general_enabled_ga4
    } = useGoogleTagManagerContext();

    useEffect(() => {
        if (google_tag_manager_general_enabled && data) {
            if (data.order.gtm) {
                window.dataLayer = window.dataLayer || [];
                try {
                    const dataLayer = JSON.parse(data.order.gtm);
                    for (const value of dataLayer) {
                        window.dataLayer.push({ ecommerce: null });
                        window.dataLayer.push(value);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }, [data]);

    useEffect(() => {
        if (google_tag_manager_general_enabled_ga4 && data) {
            if (data.order.gtm_ga4) {
                window.dataLayer = window.dataLayer || [];
                try {
                    const dataLayer = JSON.parse(data.order.gtm_ga4);
                    for (const value of dataLayer) {
                        window.dataLayer.push({ ecommerce: null });
                        window.dataLayer.push(value);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }, [data]);
};

export default successfulCheckout;
