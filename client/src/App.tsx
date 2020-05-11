import React from 'react';
import { Counter } from './features/counter/Counter';
import { Sidebar } from './features/sidebar/Sidebar';
import { Navbar } from './features/navbar/Navbar';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Counter /> 
    </div>
  );
}

export default App;
