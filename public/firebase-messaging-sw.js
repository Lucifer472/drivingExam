importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDFKsE0yv8zUxSiLD1gjhn1mZidnZ-O23U",

  authDomain: "blog-website-7ff75.firebaseapp.com",

  projectId: "blog-website-7ff75",

  storageBucket: "blog-website-7ff75.appspot.com",

  messagingSenderId: "492922210801",

  appId: "1:492922210801:web:d30f1b7bb0c4969af89c50",

  measurementId: "G-35XHDKQDFD",
};

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging
  .getToken({
    vapidKey:
      "BBEOJrEW1215_XGxprQzPWYH7ksvB8hJxj139zTBfZEfn8k5hxHMKMIw0K4M8wcocwh82WxeQNQeyfn0dO1KDQ4",
  })
  .then((currentToken) => {
    console.log(currentToken);

    document.querySelector("body").append(currentToken);

    sendTokenToServer(currentToken);
  })
  .catch((err) => {
    console.log(err);

    // if error

    setTokenSentToServer(false);
  });

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server ...");
    setTokenSentToServer(true);
  } else {
    console.log("Token already available in the server");
  }
}
function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

messaging.onBackgroundMessage(function (payload) {
  if (!payload.hasOwnProperty("notification")) {
    console.log("working");
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "/asset/logo.webp",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.addEventListener("notificationclick", function (event) {
      const clickedNotification = event.notification;
      clickedNotification.close();
      event.waitUntil(clients.openWindow(payload.data.click_action));
    });
  }
});
