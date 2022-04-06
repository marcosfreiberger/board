import firebase  from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: "AIzaSyAxyZvMDwQMoUFgy9STGalIAih5NFObH34",
  authDomain: "boardapp-9381a.firebaseapp.com",
  projectId: "boardapp-9381a",
  storageBucket: "boardapp-9381a.appspot.com",
  messagingSenderId: "340932065109",
  appId: "1:340932065109:web:6946225efc22cfbcaa61dc",
  measurementId: "G-K1WFFDPZ86"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;