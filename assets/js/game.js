// Initialize connection to Firebase

var config = {
    apiKey: "AIzaSyAaSPvGSdh8VxsaIQYU2_iL8AruQRUkhHs",
    authDomain: "distributed-eye-226422.firebaseapp.com",
    databaseURL: "https://distributed-eye-226422.firebaseio.com",
    projectId: "distributed-eye-226422",
    storageBucket: "distributed-eye-226422.appspot.com",
    messagingSenderId: "439695275055"
  };
  firebase.initializeApp(config);

var database = firebase.database();