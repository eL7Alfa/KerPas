import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';
import { firebaseConfig } from '../components/constants';

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token');
  },
  //initializing firebase app
  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await this.tokenInlocalforage();
        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }
        //requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          //getting token from FCM
          const fcm_token = await messaging.getToken({
            vapidKey:
              'BIrBg-y1TZFkMuIFdiBS3-3wAEzfk5_qI8RTLnMc1LhkOyxKyI-feeS00V4clez2p4RytrOPnXodxfyPhnnXIag',
          });
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token);
            console.log('fcm token', fcm_token);
            //return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
