/* @refresh reload */
//import { render } from 'solid-js/web'
//import './index.css'
//import App from './App.jsx'
//import { Routes } from '@generouted/solid-router'
//
//const root = document.getElementById('root')
//
//// render(() => <App />, root)
//render((Routes) => <App />, root)
// render(Routes, document.getElementById('root'))
//
import { render } from 'solid-js/web';
import './index.css';
import App from './App.jsx';
import { Routes } from '@generouted/solid-router';

const root = document.getElementById('root');

render(() => (
  <Routes>
    <App />
  </Routes>
), root);
