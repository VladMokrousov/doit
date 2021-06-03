import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { AppProvider, TooltipProvider } from './context';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: 'AIzaSyD4KDh3FaOBTHDF_oleVT06eUTvbDCStNY',
  authDomain: 'todo-1c323.firebaseapp.com',
  databaseURL: 'https://todo-1c323-default-rtdb.firebaseio.com',
  projectId: 'todo-1c323',
  storageBucket: 'todo-1c323.appspot.com',
  messagingSenderId: '372839437605',
  appId: '1:372839437605:web:31ef34b6e882e585f576cc',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <AppProvider>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </AppProvider>,
  document.querySelector('#root')
);
