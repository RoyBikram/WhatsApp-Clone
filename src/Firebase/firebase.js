// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBx2QoevVz53Yf8hv68io0pnPWmIEvqlMo",
  authDomain: "whatsapp-clone-e25da.firebaseapp.com",
  projectId: "whatsapp-clone-e25da",
  storageBucket: "whatsapp-clone-e25da.appspot.com",
  messagingSenderId: "1063040707979",
  appId: "1:1063040707979:web:c7f98475b1801c8ff9138e",
  measurementId: "G-BLRY8J41DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);