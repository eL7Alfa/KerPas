import { firebaseConfig } from '../src/components/constants';
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
