// ParentComponent.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function ParentComponent() {
    const [books, setBooks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        // Fetch books from API or set initial books state
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        // Fetch books from API
        fetch("https://book-review-backend-gx5r.onrender.com/book/all")
            .then((res) => res.json())
            .then((result) => {
                // Set books state with fetched data
                setBooks(result);

            })
            .catch((error) => console.error('Error fetching books:', error));
    };


    useEffect(() => {
        // Update filteredBooks whenever books state changes
        filterBooks(searchKey);
    }, [books, searchKey]);


    const handleSearch = (searchValue) => {
        setSearchKey(searchValue);



    };

    const filterBooks = (searchValue) => {
        if (searchValue) {
            const filteredBooksData = books.filter((book) => {
                const titleMatch = book.BookTitle.toLowerCase().includes(searchValue.toLowerCase());
                const authorMatch = book.BookAuthor.toLowerCase().includes(searchValue.toLowerCase());
                return titleMatch || authorMatch;
            });
            setFilteredBooks(filteredBooksData);
        } else {
            setFilteredBooks([]);
        }
    };


    return (
        <div>
            <Navbar handleSearch={handleSearch} />
            {/* Other components */}
        </div>
    );
}

export default ParentComponent;
