import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCfinPB4UVUlGBtaNQlAll9vvIjObleBXo",
    authDomain: "crwn-db-e75b7.firebaseapp.com",
    projectId: "crwn-db-e75b7",
    storageBucket: "crwn-db-e75b7.appspot.com",
    messagingSenderId: "167414284618",
    appId: "1:167414284618:web:0df6eae18c9958286281b3",
    measurementId: "G-2MGHDQSECP"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) 
    return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

   if(!snapShot.exists) {
     const { displayName, email } = userAuth;
     const createdAt = new Date();

     try {
      await userRef.set ({
        displayName,
        email, 
        createdAt,
        ...additionalData
      })
     } catch (error) {
      console.log('error creating user', error.message);
     }
    }
    return userRef;
  }; 

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
