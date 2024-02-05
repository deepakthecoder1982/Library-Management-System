import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isOld, setIsOld] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/books?new=${isNew ? 1 : 0}&old=${isOld ? 1 : 0}`);
        setBooks(response.data.bookData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, [isNew, isOld]);

  return (
    <div>
      <label>
        View Books Created Within the Last 10 Minutes:
        <input type="checkbox" checked={isNew} onChange={() => setIsNew(!isNew)} />
      </label>
      <label>
        View Books Created Beyond the Last 10 Minutes:
        <input type="checkbox" checked={isOld} onChange={() => setIsOld(!isOld)} />
      </label>

      <table>
        {/* Render your book list here */}
      </table>
    </div>
  );
};

export default BookList;
