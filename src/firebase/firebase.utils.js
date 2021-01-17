import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAEFFdyGdLxbIUeDgUOQJ7SC3YZOKQH6_0",
    authDomain: "crowncrown-5ac4f.firebaseapp.com",
    projectId: "crowncrown-5ac4f",
    storageBucket: "crowncrown-5ac4f.appspot.com",
    messagingSenderId: "151688858884",
    appId: "1:151688858884:web:f259b5ed576002450d1451",
    measurementId: "G-6R9892E559"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error ccreating user', error.message);
        }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;