import React, { useState, useEffect } from 'react';
import Button from './Button';
import Channel from './Channel';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



firebase.initializeApp(
  {
    apiKey: "AIzaSyA5iB4ceMdIPH3AQX6qTv6mcsRk44wxYcw",
    authDomain: "livechat-aa362.firebaseapp.com",
    projectId: "livechat-aa362",
    storageBucket: "livechat-aa362.appspot.com",
    messagingSenderId: "770391750057",
    appId: "1:770391750057:web:4cd9fca269652f40e540b8"
  }
)

const auth = firebase.auth();
const db = firebase.firestore();


function App() {

  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user =>{
    if (user) {
      setUser(user);
    }
    else {
      setUser(null);
    }

    if(initializing){
      setInitializing(false);
    }

  });

  return unsubscribe;
}, []);

  const signInWithGoogle = async () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try{
      await auth.signInWithPopup(provider);
    }
    catch(error) {
      console.error(error);
    }
  };

  const signOut = async() => {
    try{
      await firebase.auth().signOut();
    }
    catch(error) {
      console.error(error);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div >
      {user ? (
        <>
        <Button onClick={signOut}>Sign out</Button>
        <Channel user={user} db={db}/>
        </>
      )  : (

        <button onClick= {signInWithGoogle}>Sign in with Google</button>

      )}
        
      
    </div>
  );
}

export default App;
