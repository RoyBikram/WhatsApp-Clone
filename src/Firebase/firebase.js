// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc, addDoc, collection,serverTimestamp} from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkUXlKNpMPaAxZ9Ki_P_TGeiVcAPB5hU8",
  authDomain: "my-whatsapp-eebf1.firebaseapp.com",
  projectId: "my-whatsapp-eebf1",
  storageBucket: "my-whatsapp-eebf1.appspot.com",
  messagingSenderId: "205236177179",
  appId: "1:205236177179:web:dfcaf97249a851c3936bbe",
  measurementId: "G-4GJRGP37YD"
};



// const firebaseConfig = {
//     apiKey: "AIzaSyBx2QoevVz53Yf8hv68io0pnPWmIEvqlMo",
//     authDomain: "whatsapp-clone-e25da.firebaseapp.com",
//     projectId: "whatsapp-clone-e25da",
//     storageBucket: "whatsapp-clone-e25da.appspot.com",
//     messagingSenderId: "1063040707979",
//     appId: "1:1063040707979:web:c7f98475b1801c8ff9138e",
//     measurementId: "G-BLRY8J41DF",
// };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


































// Initialize Firebase
// initializeApp(firebaseConfig);
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
            console.log(error.message);
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
        // console.log(docSnap.data())
       return docSnap.data()
    } else {
        console.log("No such document!");
    }
};

export const CreateMessageStore = async (Uid) => {
    const docRef = await addDoc(collection(db, "MessagesStore"), {
        WhoCreated:Uid
      });
    return docRef.id
}

export const AddToYourFriend = async (MyUid, FriendUid,MessageLocationId) => {
    // Add to my friend
    const UserRef = doc(db, `Users/${MyUid}/Friends/${FriendUid}`);
    const UserSnap = await getDoc(UserRef);
    if (!UserSnap.exists()) {
        try {
            await setDoc(UserRef, {
                MessageLocation: MessageLocationId,
                LastActive: serverTimestamp()
            });
        } catch (error) {}
    }
    // Add me to your friend
    const FriendRef = doc(db, `Users/${FriendUid}/Friends/${MyUid}`);
    const FriendSnap = await getDoc(FriendRef);
    if (!FriendSnap.exists()) {
        try {
            await setDoc(FriendRef, {
                MessageLocation: MessageLocationId,
                LastActive: serverTimestamp()
            });
        } catch (error) {}
    }


}


