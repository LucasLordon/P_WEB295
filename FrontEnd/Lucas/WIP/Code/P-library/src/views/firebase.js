import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDBldAcA2yukAAFYZ_rj5mZoY2_JYOsqiw",
    authDomain: "p-295-f7ddf.firebaseapp.com",
    projectId: "p-295-f7ddf",
    storageBucket: "p-295-f7ddf.appspot.com",
    messagingSenderId: "667372183205",
    appId: "1:667372183205:web:555dcce4f9678bfeaff74c",
    measurementId: "G-TVQP2ENPDC"
}

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;