import firebase from 'firebase';    
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyChEFiofLXAAqFxEFUFrowGNVz_aoL6s6A",
  authDomain: "projectname-f2949.firebaseapp.com",
  databaseURL: "https://projectname-f2949.firebaseio.com",
  projectId: "projectname-f2949",
  storageBucket: "projectname-f2949.appspot.com",
  messagingSenderId: "568419130155",
  appId: "1:568419130155:web:db09a94d02d565a5a9c36e"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()