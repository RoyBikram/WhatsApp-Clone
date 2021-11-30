import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBx2QoevVz53Yf8hv68io0pnPWmIEvqlMo",
    authDomain: "whatsapp-clone-e25da.firebaseapp.com",
    projectId: "whatsapp-clone-e25da",
    storageBucket: "whatsapp-clone-e25da.appspot.com",
    messagingSenderId: "1063040707979",
    appId: "1:1063040707979:web:c7f98475b1801c8ff9138e",
    measurementId: "G-BLRY8J41DF",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore();

export const LoginWithGoogle = () => {
    const user = signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            return result.user;
            // return user;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            // console.log(error.message);
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    return user;
};

export const SignOutFromApp = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
};

export const CreateNewUser = async (User) => {
    let uid = User?.uid;
    const UserRef = doc(db, `Users/${uid}`);
    const UserSnap = await getDoc(UserRef);
    if (!UserSnap.exists()) {
        try {
            await setDoc(UserRef, {
                Name: User.displayName,
                Email: User.email,
                ProfileImg: User.photoURL,
                Uid: uid,
            });
        } catch (error) {}
    }
};

export const GetDataFromUid = async (uid) => {
    const docRef = doc(db, `Users/${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       return docSnap.data()
    } else {
        console.log("No such document!");
    }
};
