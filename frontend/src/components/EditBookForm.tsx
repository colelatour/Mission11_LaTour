import { useState } from 'react';
import { updateBook } from '../api/BooksAPI';
import type { Book } from '../types/Book';

function EditBookForm({
  book,
  onSuccess,
  onCancel,
}: {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    isbn: book.iSBN,
    classification: book.classification,
    category: book.category,
    pageCount: book.pageCount,
    price: book.price,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook(book.bookID, {
        title: formData.title,
        author: formData.author,
        publisher: formData.publisher,
        iSBN: formData.isbn,
        classification: formData.classification,
        category: formData.category,
        pageCount: Number(formData.pageCount),
        price: Number(formData.price),
      });
      onSuccess();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h3>Edit Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input type="text" className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Classification</label>
          <input type="text" className="form-control" name="classification" value={formData.classification} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Page Count</label>
          <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditBookForm;
