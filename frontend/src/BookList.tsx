import { useState } from "react";
import { useEffect } from "react";
import { type Book } from "./types/Book";

function BookList() {
  // State variables for books and pagination
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(""); // Track whether sorting is active

  // Fetch books from the API whenever page size, page number, or sort changes
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://localhost:5078/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${sortBy ? `&sortBy=${sortBy}` : ""}`,
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks); // Store the total number of books
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate how many pages we need
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortBy]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-dark">Book List</h1>

      {/* Button to sort books by title */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn ${sortBy === "title" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSortBy(sortBy === "title" ? "" : "title")}
        >
          {sortBy === "title" ? "Sorting by Title" : "Sort by Title"}
        </button>
      </div>

      {/* Display books in a responsive grid of cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        {books.map((b) => (
          <div className="col" key={b.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{b.title}</h5>
              </div>
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted">
                  By: {b.author}
                </h6>
                {/* List out each book's details */}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li className="list-group-item">
                    <strong>ISBN:</strong> {b.iSBN}
                  </li>
                  <li className="list-group-item">
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li className="list-group-item">
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li className="list-group-item">
                    <strong>Page Count:</strong> {b.pageCount}
                  </li>
                  <li className="list-group-item">
                    <strong>Price:</strong> ${b.price.toFixed(2)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <nav>
          <ul className="pagination mb-0">
            {/* Previous button - disabled on first page */}
            <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
                disabled={pageNum === 1}
              >
                Previous
              </button>
            </li>

            {/* Generate a button for each page number */}
            {[...Array(totalPages)].map((_, index) => (
              <li
                className={`page-item ${pageNum === index + 1 ? "active" : ""}`}
                key={index + 1}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNum(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next button - disabled on last page */}
            <li
              className={`page-item ${pageNum >= totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
                disabled={pageNum >= totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Dropdown to change how many results are shown per page */}
      <div className="d-flex justify-content-center mb-4">
        <label className="form-label me-2 mb-0 align-self-center">
          Results per page:
        </label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(b) => setPageSize(Number(b.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
