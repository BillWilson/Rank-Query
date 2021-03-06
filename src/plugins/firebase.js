import Vue from 'vue'
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import VueFirestore from "vue-firestore";

const firebaseObj = firebase.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGEING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
});

Vue.use(VueFirestore);

export const firebaseApp = {
    db: firebaseObj.firestore(),
};


