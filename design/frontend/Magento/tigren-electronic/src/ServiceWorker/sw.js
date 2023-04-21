importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

import { onBackgroundMessage } from 'firebase/messaging/sw';

import { handleMessageFromClient } from '@tigrensolutions/core/src/ServiceWorker/Utilities/messageHandler';
import setupWorkbox from '@tigrensolutions/core/src/ServiceWorker/setupWorkbox';
import registerRoutes from '@tigrensolutions/core/src/ServiceWorker/registerRoutes';
import registerMessageHandlers from '@tigrensolutions/core/src/ServiceWorker/registerMessageHandlers';

setupWorkbox();

registerRoutes();

registerMessageHandlers();

self.addEventListener('message', e => {
    const { type, payload } = e.data;

    handleMessageFromClient(type, payload, e);
});

self.addEventListener('notificationclick', function(event) {
    if (
        !event.notification.data ||
        event.notification.data.click_action == '#'
    ) {
        return false;
    }

    const target = event.notification.data.click_action || '/';
    event.notification.close();

    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            .then(function(clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];

                    if (client.url === target && 'focus' in client) {
                        return client.focus();
                    }
                }

                return clients.openWindow(target);
            })
    );
});

const firebaseSettings = {
    apiKey: 'AIzaSyCqRHODY0P2mfiwql6qYr7xbGEHd1FT3Zs',
    authDomain: 'demo.firebaseapp.com',
    projectId: 'demo',
    storageBucket: 'demo.appspot.com',
    messagingSenderId: '468910327199',
    appId: '1:468910327199:web:9df735991708b096ffe9aa'
};

firebase.initializeApp(firebaseSettings);

// Retrieve firebase messaging
const messaging = firebase.messaging();

onBackgroundMessage(messaging, function(payload) {
    let notificationTitle;
    let notificationOptions;

    if (payload.notification) {
        notificationTitle = payload.notification.title;
        notificationOptions = payload.notification;
        if (notificationOptions.icon === undefined) {
            notificationOptions.icon = payload.notification.image;
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

    self.registration.showNotification(notificationTitle, notificationOptions);
});
