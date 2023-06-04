const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require('dotenv').config()
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId:process.env.PROJECT_ID,
    storageBucket:process.env.STORAGE_BUKET,
    messagingSenderId:process.env.MESSAGINGSENDERID ,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENTID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

exports.db = db;