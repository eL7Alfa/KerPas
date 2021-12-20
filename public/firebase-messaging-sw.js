import firebase from 'firebase/app';
import 'firebase/messaging';
import { firebaseConfig } from '../src/components/constants';

// See: https://github.com/microsoft/TypeScript/issues/14877
/** @type {ServiceWorkerGlobalScope} */
let self;

function initInSw() {
  // [START messaging_init_in_sw]
  // Give the service worker access to Firebase Messaging.
  // Note that you can only use Firebase Messaging here. Other Firebase libraries
  // are not available in the service worker.
  // eslint-disable-next-line no-undef
  importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
  // eslint-disable-next-line no-undef
  importScripts(
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
  );

  // Initialize the Firebase app in the service worker by passing in
  // your app's Firebase config object.
  // https://firebase.google.com/docs/web/setup#config-object
  firebase.initializeApp(firebaseConfig);

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  onBackgroundMessage();
  // [END messaging_init_in_sw]
}

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage(payload => {
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

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  // [END messaging_on_background_message]
}

initInSw();
