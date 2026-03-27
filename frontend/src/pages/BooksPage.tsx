import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Welcome from "../components/Welcome";
import CartSummary from "../components/CartSummary";

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Floating cart summary in top-right corner */}
      <CartSummary />
      <div className="row">
        <Welcome />
      </div>
      {/* Bootstrap grid: sidebar filter (3 cols) + book list (9 cols) */}
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookPage;
