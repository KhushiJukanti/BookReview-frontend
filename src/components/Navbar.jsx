import React from 'react'
import { useState } from 'react'

function Navbar() {
    const [searchKey, setSearchKey] = useState('')
    const [books, setBooks] = useState([])
    const [filterdBooks, setFilteredBooks] = useState([])

    const searchBooks = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchKey(searchValue)
        if (searchValue) {
            let filteredBooksData = books.filter((item) => {
                return item.BookTitle.toLowerCase().includes(searchValue);

            })
            setFilteredBooks(filteredBooksData)
        } else {
            setFilteredBooks(books)
        }
    };


    return (
        <div className='container'>
            <nav className="navbar navbar-light mt-5 bg-light justify-content-between">
                <h2 className="navbar-brand"
                    style={{
                        color: 'darkcyan',
                        marginLeft: '100px'

                    }}>Novel Books</h2>
                <div className='col-md-4'>

                    <input type="text" className='form-control mr-sm-2' style={{ width: '100%' }} placeholder='Search books here...' value={searchKey} onChange={(e) => searchBooks(e)} />
                </div>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>



                <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="light">
                    <div class="bg-light p-4">
                        <h3 class="text-body-emphasis h4">users</h3>
                        <h4 class="text-body-secondary">Reviews</h4>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar
