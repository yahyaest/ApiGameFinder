import firebase from "firebase";

// Connect firebase to our react frontend

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAl0SO9lvr9Er2bspwxD1k9-8vOzFjMl9g",
  authDomain: "games-api-finder.firebaseapp.com",
  databaseURL: "https://games-api-finder.firebaseio.com",
  projectId: "games-api-finder",
  storageBucket: "games-api-finder.appspot.com",
  messagingSenderId: "728713058349",
  appId: "1:728713058349:web:21a6b253d3473938c580a4",
  measurementId: "G-8PK3BFWPSR"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
