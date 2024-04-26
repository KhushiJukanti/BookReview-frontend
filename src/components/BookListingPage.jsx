import React, { useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa6";

function BookListingPage() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null)

    const getAllBooks = () => {
        fetch("http://localhost:7000/book/all")
            .then((res) => res.json())
            .then((result) => {
                // Add isFavorite property to each book
                const booksWithFavorites = result.map(book => ({ ...book, isFavorite: false }));
                setBooks(booksWithFavorites);
            })
            .catch((error) => console.error('Error fetching books:', error));
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleToggleFavorite = (id) => {
        setBooks(prevBooks => {
            return prevBooks.map(book =>
                book._id === id ? { ...book, isFavorite: !book.isFavorite } : book
            );
        });
    };

    const handleCardClick = (book) => {
        setSelectedBook(book);
    };

    const handleBackButtonClick = () => {
        setSelectedBook(null);
    };






    return (
        <div className='container mt-5'>



            {selectedBook ? (
                <DetailedPage book={selectedBook} onBack={handleBackButtonClick} />
            ) : (
                <div className='row'>


                    {books.map((book) => (
                        <div className='col-md-3 mt-5' key={book._id}>
                            <div className="card task-card" type="button" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }} onClick={() => handleCardClick(book)}>
                                <img style={{ maxHeight: '250px', width: '100%', objectFit: 'cover', padding: '5px', borderRadius: '10px' }} className="card-img-top" src={book.BookCover} alt="logo" />
                                <div className="card-body">
                                    <h5 className="card-title">Title: {book.BookTitle}</h5>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h6 className='card-text'>Book Author: {book.BookAuthor}</h6>
                                        <button
                                            className="btn btn-outline-danger"
                                            style={{ color: book.isFavorite ? 'red' : 'black', border: 'none', }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click event from firing
                                                handleToggleFavorite(book._id);
                                            }}
                                        >
                                            <FaRegHeart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
}


function DetailedPage({ book, onBack }) {

    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            _id: book._id, // Assuming you have access to the book ID
            user: username,
            rating: rating,
            comment: comment
        };

        try {
            const response = await fetch("http://localhost:7000/book/reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add review');
            }

            fetchReviews();

            const data = await response.json();
            console.log(data); // Log the response from the backend
            // You can perform further actions after successful submission, like displaying a success message or updating the UI
        } catch (error) {
            console.error('Error adding review:', error);
            // Handle the error, such as displaying an error message to the user
        }
        // Here you can handle the submission of the review (e.g., send it to the backend)
        // console.log('Submitted Review:', { rating, comment });
        // Reset form fields after submission
        setUsername('');
        setRating(0);
        setComment('');
    };


    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:7000/book/reviews/${book._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [book._id]);


    const reviewsArray = reviews;




    return (
        <div>
            <button onClick={onBack}>Back</button>
            <div className='container' style={{ marginLeft: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <img style={{ maxHeight: '80%', width: '300px', objectFit: 'cover', padding: '5px', borderRadius: '10px' }} src={book.BookCover} alt="Book Cover" />
                    <div style={{ marginRight: "200px" }}>
                        <h2>Title: {book.BookTitle}</h2><br />
                        <h4>Author: {book.BookAuthor}</h4><br />
                        <p><b>Description:</b> {book.BookDesc}</p><br />
                    </div>


                </div>
                <div className="container" style={{ marginTop: '-150px', width: '30%', backgroundColor: 'rgb(239 244 249)' }} >
                    <h3>Add Your Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Your Name:</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                        </div>

                        <div className="form-group">

                            <label htmlFor="rating">Rating:</label>
                            <select className="form-control" id="rating" value={rating} onChange={handleRatingChange}>
                                <option value="0" >Rate Here</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea className="form-control" id="comment" value={comment} onChange={handleCommentChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
                    </form>
                </div>
                <div>
                    <h3>User Reviews</h3>
                    <ul>
                        {reviewsArray.map((review, index) => (
                            <li key={index}>
                                <p><b>User:</b> {review.user}</p>
                                <p><b>Rating:</b> {review.rating}</p>
                                <p><b>Comment:</b> {review.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div >
    );
}

export default BookListingPage;

