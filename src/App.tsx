import React from 'react';
import './App.scss';
import CommentsPage from './pages/CommentsPage';

function App() {
  return (
    <div className="app">
      <CommentsPage currentUserId="1"/>
    </div>
  );
}

export default App;
