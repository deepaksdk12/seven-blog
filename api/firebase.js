// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCLTarsDBfN99zD6qjKYjCLaL8TCU4GX5E",
  authDomain: "imagestorage-7b8da.firebaseapp.com",
  projectId: "imagestorage-7b8da",
  storageBucket: "imagestorage-7b8da.appspot.com",
  messagingSenderId: "549114950858",
  appId: "1:549114950858:web:aedcd851c84560cbcfb033",
  measurementId: "G-JR5L752DMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage };
