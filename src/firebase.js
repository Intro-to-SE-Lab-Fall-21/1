import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAw1ZzPtkdWKkGU-5CGx8KxBy7FDAR9KOo",
  authDomain: "client-a5b04.firebaseapp.com",
  projectId: "client-a5b04",
  storageBucket: "client-a5b04.appspot.com",
  messagingSenderId: "267456873836",
  appId: "1:267456873836:web:1a5a13d917c5bbdba15f49",
  measurementId: "G-D53LK4DDRH"
}; 

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider,storage };
