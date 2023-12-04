import "firebase/messaging";
import localforage from "localforage";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Initialize the Firebase app with the credentials
const firebaseConfig = {
  apiKey: "AIzaSyDFKsE0yv8zUxSiLD1gjhn1mZidnZ-O23U",
  authDomain: "blog-website-7ff75.firebaseapp.com",
  projectId: "blog-website-7ff75",
  storageBucket: "blog-website-7ff75.appspot.com",
  messagingSenderId: "492922210801",
  appId: "1:492922210801:web:d30f1b7bb0c4969af89c50",
  measurementId: "G-35XHDKQDFD",
};

export const app = initializeApp(firebaseConfig);

const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      const tokenInLocalForage = await localforage.getItem("fcm_token");

      // Return the token if it is alredy in our local storage
      // if (tokenInLocalForage !== null) {
      //   return tokenInLocalForage;
      // }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        // Get new token from Firebase
        const fcm_token = await getToken(messaging, {
          vapidKey:
            "BBEOJrEW1215_XGxprQzPWYH7ksvB8hJxj139zTBfZEfn8k5hxHMKMIw0K4M8wcocwh82WxeQNQeyfn0dO1KDQ4",
        });

        // Set token in our local storage
        if (fcm_token) {
          if (tokenInLocalForage === fcm_token) return tokenInLocalForage;
          localforage.setItem("fcm_token", fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export default firebaseCloudMessaging;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export default messaging;

// export const requestPermission = () => {
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       return getToken(messaging, {
//         vapidKey:
//           "BBEOJrEW1215_XGxprQzPWYH7ksvB8hJxj139zTBfZEfn8k5hxHMKMIw0K4M8wcocwh82WxeQNQeyfn0dO1KDQ4",
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             localforage.setItem("fcm_token", currentToken);
//             return currentToken;
//           } else {
//             toast.error("An Error has Occured!");
//           }
//         })
//         .catch((err) => {
//           console.log(
//             "An Error Occured When Requesting to Receving the token.",
//             err
//           );
//         });
//     } else {
//       toast.error("User Permission Denied");
//     }
//   });
// };

// requestPermission();

// export const onMessageListiner = () => {
//   return new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
// };
