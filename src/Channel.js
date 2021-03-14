import React, { useState, useEffect } from 'react';
import Message from './Message';
import firebase from 'firebase/app';
import './App.css';
import '../src/bootstrap.css';
import  ReactScrollableFeed from 'react-scrollable-feed';


const Channel = ({ user = null, db = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(' ');

    const {uid, displayName, photoURL} = user;

    useEffect(() => {
        if (db) {
            //query documents in collection
            const unsubscribe = db.collection('messages').orderBy('createdAt').limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,

                }));

                setMessages(data);
            })

            return unsubscribe;
        }

    },[db]);
//bind state to form input
    const handleOnChange= e => {
        setNewMessage(e.target.value);
       
    };

    const handleOnSubmit = e => {
        e.preventDefault();

        if(db) {
            db.collection('messages').add({
                //create new document in firestore
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    }
    
    return (
        <>
        
        <ul id="scroll" style={{overflowY:'scroll', height: '650px'}}>
            <ReactScrollableFeed>
            {messages.map(message =>(
                <li key={message.id}>
                <Message {...message}/>
                </li>
            ))}
           </ReactScrollableFeed>
        </ul>
        
        <form onSubmit = {handleOnSubmit}>

            <div >
                <input  type = "text" class="textbox"  value ={newMessage} onChange={handleOnChange}   placeholder="Type your message here..." />
                <button type="submit" class="btn btn-success sendbtn" disabled={!newMessage}>Send</button>
            </div>
                
        </form>
        </>
    );
};

export default Channel;