import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import statement
import BookListingPage from './components/BookListingPage';

import Navbar from './components/Navbar';
import ParentComponent from './components/ParentComponent';

function App() {
  return (


    <div className="App">
      <Navbar />
      <BookListingPage />
      {/* <Routes> Wrap your Route components inside a Routes component */}
      {/* <Route exact path="/" element={<BookListingPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
        </Routes> */}
    </div>

  );
}

export default App;
