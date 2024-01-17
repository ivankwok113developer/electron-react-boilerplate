import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../app/store'; // Make sure the path is correct
import './App.css';
import 'tailwindcss/tailwind.css';
import CanvasPage from '../pages/CanvasPage'; // Adjust the import path as necessary
import { TitleBar } from '../components/general/TitleBar';

export default function App() {
  return (
    //redux store
    <Provider store={store}>
      <div className="flex flex-col w-screen h-screen bg-bg">
        <TitleBar />
        <CanvasPage />
      </div>
    </Provider>
  );
}
