import Vue from 'vue'
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import VueFirestore from "vue-firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCqLrMnrljzG_oovs0WtFGM79tG5R0tHJk",
    authDomain: "gamefirst-c6064.firebaseapp.com",
    databaseURL: "https://gamefirst-c6064.firebaseio.com",
    projectId: "gamefirst-c6064",
    storageBucket: "gamefirst-c6064.appspot.com",
    messagingSenderId: "346205447283",
    appId: "1:346205447283:web:2f03a46565ec50f0"
});

Vue.use(VueFirestore);

export const db = firebaseApp.firestore();


