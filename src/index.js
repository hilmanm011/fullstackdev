import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import AppRouter from './AppRouter';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import userReducer from './features/user';
import jobReducer from './features/job';


const store = configureStore({
  reducer: {
    user: userReducer,
    jobSearch: jobReducer
  }
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

