import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch e-book content from an API
    fetch(`/api/ebook?page=${page}`)
      .then(response => response.text())
      .then(data => setContent(data));
  }, [page]);

  const nextPage = () => setPage(prevPage => prevPage + 1);
  const prevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <div className="app">
      <h1>E-book Reader</h1>
      <div className="ebook-content">
        {content}
      </div>
      <div className="navigation">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;

