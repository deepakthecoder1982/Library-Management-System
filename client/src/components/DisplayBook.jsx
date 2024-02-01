import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from your backend API
    axios.get('/books').then((response) => {
      setBooks(response.data.bookData);
    });
  }, []);

  return (
    <div className="container">
      <h2>Display Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBooks;
