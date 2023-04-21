/*firebase daniel start*/
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyCqRHODY0P2mfiwql6qYr7xbGEHd1FT3Zs',
    authDomain: 'demo.firebaseapp.com',
    projectId: 'demo',
    storageBucket: 'demo.appspot.com',
    messagingSenderId: '468910327199',
    appId: '1:468910327199:web:9df735991708b096ffe9aa'
};

const YOUR_PUBLIC_VAPID_KEY =
    'BEnrnYQdiUoAcgdgCONAeYJimc9HxyIMFWC7Lsf1fsgR7JfqpipBdcCFu-016l4dSovMXPDaz7cUOO5633nZDhU';

let messaging = null;

if (navigator && navigator.serviceWorker) {
    const fapp = initializeApp(firebaseConfig);
    messaging = getMessaging(fapp);
}

export { YOUR_PUBLIC_VAPID_KEY, messaging };
