import React from 'react';
import { Sidebar } from './features/sidebar/Sidebar';
import { Navbar } from './features/navbar/Navbar';
import './App.scss';
import { VideoGrid } from './features/video-grid/VideoGrid';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <VideoGrid /> 
    </div>
  );
}

export default App;
