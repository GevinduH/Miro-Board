import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil'; 
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Rules from './components/rules/Rules';


const router =  createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children: [
    { path: 'rules', element: <Rules /> },
    { path: 'estimations', element: <Rules /> }
  ],
}
])

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
