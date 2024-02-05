import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./DisplayBook.css";
import formatData from '../utils/FormatDataTime';
import { ContextApi } from './ContextApi';
const DisplayBooks = () => {
  const BASE_URL = "http://localhost:8000";
  const [books, setBooks] = useState([]);
  const { isRole } = useContext(ContextApi);
  const token = localStorage.getItem("token");
  const handleEdit = async (id) => {
    const bookDetails = books.find(bid => bid._id === id);
    bookDetails.title = "Eat that frog";
    bookDetails.author = "Brian Tracy";
    return await axios.patch(`${BASE_URL}/books/update/${bookDetails._id}`, 
      {
        ...bookDetails
      },
      {
        headers:{
        "Content-type":"application/json",
        token
      },
    }
    ).then(res => {
      alert(res.data?.message);
      console.log(res.data);
      setBooks(res.data?.updatedBooksData)
    }).catch(err => {
      console.log(err?.message)
    })

  }
  const handleDelete = async (id) => {

    const bookDetails = books.find(bid => bid._id === id);

    console.log(bookDetails);

    //  return await axios.delete(`${BASE_URL}/delete/${bookDetails._id}`).then(res=>{
    //     console.log(res.data?.message)
    //     alert(res?.data?.message)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    
    return await fetch(`${BASE_URL}/books/delete/${bookDetails._id}`, {
      method: "DELETE",
      headers:{
        "Content-type":"application/json",
        token
      }
    }).then(res => res.json())
      .then(data => {
        alert(data?.message)
        console.log(data)
        setBooks(data?.remainingData)
      })
      .catch(err => {
        console.log(err?.message);
      })

  }

  useEffect(() => {
    console.log(isRole)
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`, {
          headers: {
            token
          }
        });
        setBooks(response.data.bookData);
      } catch (err) {
        console.log(err?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Display Books</h2>
      <table className="book-table">
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th style={{ textAlign: "center" }}>Sr. No</th>
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Author</th>
            <th style={{ textAlign: "center" }}>Created at</th>
            {
              isRole === "CREATORS" ? (
                <>
                  <th style={{ textAlign: "center" }}>Edit</th>
                  <th style={{ textAlign: "center" }}>Delete</th>
                </>
              ) : null
            }
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book._id} style={{ textAlign: "center" }}>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td style={{ textAlign: "center" }}>{book.title}</td>
              <td style={{ textAlign: "center" }}>{book.author}</td>
              <td style={{ textAlign: "center" }}>{formatData(book.createdAt)}</td>
              {
                isRole === "CREATORS" ? (
                  <>
                    <td style={{ textAlign: "center" }}><button style={{ background: "dodgerblue", padding: "8px 1.5rem", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1rem" }}
                      onClick={() => handleEdit(book._id)}
                    >Edit</button></td>
                    <td style={{ textAlign: "center" }}><button style={{ background: "red", padding: "8px 1.5rem", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1rem" }}
                      onClick={() => handleDelete(book._id)}

                    >Delete</button></td>
                  </>
                ) : null
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBooks;
