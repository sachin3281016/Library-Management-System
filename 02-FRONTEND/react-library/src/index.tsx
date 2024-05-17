import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise=loadStripe('pk_test_51NENVCSDUSWUOPmAK1JPHUCpg4zgmRKG2lzJCmxKqxAPZDHEvyyzQJv3OC2RtwYUxGf8MZv4IH3dO8Hfk1DqFfIP00rzgMYpVw');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
    <App />
    </Elements>
  </BrowserRouter>
);

 