// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import { getFirestore, collection } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDsS5T_a8qaXeF_XG8-JPYmIj1wTXrC_nM',
  authDomain: 'makasa-mart.firebaseapp.com',
  projectId: 'makasa-mart',
  storageBucket: 'makasa-mart.appspot.com',
  messagingSenderId: '562304743045',
  appId: '1:562304743045:web:6b4751ff08fe3b768f9bec',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const ref = firebase.firestore().collection('products');

export { db, auth, ref };
