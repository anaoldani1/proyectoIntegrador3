///todo esto lo creamos nosotros 
import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDUoz_o1r9FmkvRv-MBL-IQrLNnpCmFBmY",
  authDomain: "proyectointegradorfinal-4e6d4.firebaseapp.com",
  projectId: "proyectointegradorfinal-4e6d4",
  storageBucket: "proyectointegradorfinal-4e6d4.firebasestorage.app",
  messagingSenderId: "788662826601",
  appId: "1:788662826601:web:b1902f6b30eb2395fe14f8"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage= app.storage()
export const db= app.firestore()