import React from 'react';
import { formatRelative } from 'date-fns';
import './App.css';
import '../src/bootstrap.css';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return <div class="container bg-secondary" id="container">
        <div class="row mb-3">
            
        <div class="col-6 ">  
        <p>
        {displayName ?  <p ><span class="col-1" >{displayName}</span></p> : null}
        </p>
        {photoURL ? (
            <img class="mb-4 ml-4" src ={photoURL} alt="Avatar" width={45} height={45}/>
            
        ) : null }
        </div>
        
        <div class="col-6">
        <div>
        {createdAt?.seconds ? (
            <p class="timetxt">
                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </p>
        ): null }
        </div>

        <p id="message">{text}</p>
        </div>
        
        
        
        </div>
    </div>
};

export default Message;