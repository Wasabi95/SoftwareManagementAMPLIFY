//components/config.js
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRkc0wpJoGnpwgnfCJDPEQJPvG306o5cg",
  authDomain: "senainfoempleados.firebaseapp.com",
  projectId: "senainfoempleados",
  storageBucket: "senainfoempleados.appspot.com",
  messagingSenderId: "1049110654575",
  appId: "1:1049110654575:web:7f548b165fad5f9ac0a79a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
