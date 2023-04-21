import {
    VALID_SERVICE_WORKER_ENVIRONMENT,
    handleMessageFromSW
} from '@magento/venia-ui/lib/util/swUtils';
import { messaging, YOUR_PUBLIC_VAPID_KEY } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const storage = new BrowserPersistence();

const apiBase = new URL('/graphql', location.origin).toString();

export const registerSW = () => {
    if (VALID_SERVICE_WORKER_ENVIRONMENT) {
        if (navigator && navigator.serviceWorker) {
            navigator.serviceWorker
                .register('/sw.js', {
                    scope: '/'
                })
                .then(registration => {
                    let serviceWorker;
                    if (registration.installing) {
                        serviceWorker = registration.installing;
                        // console.log('Service worker installing');
                    } else if (registration.waiting) {
                        serviceWorker = registration.waiting;
                        // console.log('Service worker installed & waiting');
                    } else if (registration.active) {
                        serviceWorker = registration.active;
                        // console.log('Service worker active');
                    }

                    if (serviceWorker) {
                        console.log('sw current state', serviceWorker.state);
                        if (serviceWorker.state == 'activated') {
                            /**
                             * Push notifications
                             */
                            if (!('Notification' in window)) {
                                // Check browser support
                                window.console.log(
                                    'This browser does not support notifications!'
                                );
                            } else {
                                Notification.requestPermission(status => {
                                    // Request permission
                                    window.console.log(
                                        'Notification permission status:',
                                        status
                                    );
                                });
                                if ('PushManager' in window && messaging) {
                                    const firebaseToken = storage.getItem(
                                        'token_firebase'
                                    );
                                    const customerToken = storage.getItem(
                                        'signin_token'
                                    );
                                    const storeCode =
                                        storage.getItem('store_view_code') ||
                                        null;
                                    if (!firebaseToken) {
                                        Notification.requestPermission(
                                            status => {
                                                if (
                                                    status === 'granted' &&
                                                    customerToken
                                                ) {
                                                    getToken(messaging, {
                                                        vapidKey: YOUR_PUBLIC_VAPID_KEY,
                                                        serviceWorkerRegistration: registration
                                                    }).then(currentToken => {
                                                        if (currentToken) {
                                                            const url = new URL(
                                                                '/graphql',
                                                                apiBase
                                                            );
                                                            fetch(url, {
                                                                method: 'POST',
                                                                credentials:
                                                                    'include',
                                                                headers: new Headers(
                                                                    {
                                                                        'Content-Type':
                                                                            'application/json',
                                                                        Authorization: customerToken
                                                                            ? `Bearer ${customerToken}`
                                                                            : '',
                                                                        Store:
                                                                            storeCode ||
                                                                            ''
                                                                    }
                                                                ),
                                                                body: JSON.stringify(
                                                                    {
                                                                        query: `
                                                                mutation subscribeFirebase($token: String!) {
                                                                    subscribeFirebase(token: $token) {
                                                                        result
                                                                        message
                                                                    }
                                                                }
                                                            `.trim(),
                                                                        variables: {
                                                                            token: currentToken
                                                                        }
                                                                    }
                                                                )
                                                            })
                                                                .then(res =>
                                                                    res.json()
                                                                )
                                                                .then(res => {
                                                                    if (
                                                                        res.errors
                                                                    ) {
                                                                        window.console.warn(
                                                                            res.errors
                                                                        );
                                                                    } else {
                                                                        storage.setItem(
                                                                            'token_firebase',
                                                                            currentToken
                                                                        );
                                                                    }
                                                                });
                                                        } else {
                                                            window.console.warn(
                                                                'Cannot fetch the current token!'
                                                            );
                                                        }
                                                    });
                                                }
                                            }
                                        );
                                    }

                                    onMessage(messaging, function(payload) {
                                        let notificationTitle;
                                        let notificationOptions;

                                        if (payload.notification) {
                                            notificationTitle =
                                                payload.notification.title;
                                            notificationOptions =
                                                payload.notification;
                                            if (
                                                notificationOptions.icon ===
                                                undefined
                                            ) {
                                                notificationOptions.icon =
                                                    payload.notification.image;
                                            }
                                            notificationOptions = {
                                                ...notificationOptions,
                                                data: payload.data
                                            };
                                        } else {
                                            notificationTitle = 'Test';
                                            notificationOptions = {
                                                body: 'Send From Firebase Cloud'
                                            };
                                        }

                                        registration.showNotification(
                                            notificationTitle,
                                            notificationOptions
                                        );
                                    });
                                }
                            }
                        }
                    }
                })
                .catch(e => {
                    /**
                     * console.* statements are removed by webpack
                     * in production mode. window.console.* are not.
                     */
                    window.console.warn(e);
                    window.console.warn('Failed to register SW.');
                });

            navigator.serviceWorker.addEventListener('message', e => {
                const { type, payload } = e.data;
                handleMessageFromSW(type, payload, e);
            });
        }
    }
};
