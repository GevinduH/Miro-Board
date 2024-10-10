import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil'; 
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Rules from './components/pages/Rules';
import EstimationPage from './components/pages/EstimationPage';
import ErrorPage from './components/pages/ErrorPage';



const router =  createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children: [
    { path: 'rules', element: <Rules /> },
    { path: 'estimations', element: <EstimationPage /> },
    { path: 'estimations/:year/:quarter', element: <EstimationPage /> },
    { path: 'estimations/error', element: <ErrorPage/> }
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
