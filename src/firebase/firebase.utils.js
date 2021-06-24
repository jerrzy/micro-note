import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAqYHzFJftF9z-zbiSM0CtPbqDVfztJPB0",
  authDomain: "micro-note-react.firebaseapp.com",
  projectId: "micro-note-react",
  storageBucket: "micro-note-react.appspot.com",
  messagingSenderId: "270964150313",
  appId: "1:270964150313:web:fe99f65b429138f5280c38",
  measurementId: "G-08902N950C",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGooglePopup = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    try {
      await userRef.set({
        display_name: displayName,
        email: email,
        create_time: new Date(),
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  }
  return userRef;
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
