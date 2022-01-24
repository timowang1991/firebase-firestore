const { initializeApp } = require('firebase/app');
// const { getAnalytics } = require('firebase/analytics');
const { getFirestore } = require('firebase/firestore');

const {
    FIREBASE_APIKEY,
    FIREBASE_AUTH_DOMAIN,
    // FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    // databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
initializeApp(firebaseConfig);
// getAnalytics(app);

const firestore = getFirestore();

module.exports = {
    firestore,
}