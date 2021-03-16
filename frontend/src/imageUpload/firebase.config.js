import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB5luaGCZN03Xsou9GCyZaUjRULhTQbRH0",
  authDomain: "eshop--ecommerce.firebaseapp.com",
  projectId: "eshop--ecommerce",
  storageBucket: "eshop--ecommerce.appspot.com",
  messagingSenderId: "720427442520",
  appId: "1:720427442520:web:5cb7718ca9c7dc0c74052d",
  measurementId: "G-JZG7JSR14G",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };
