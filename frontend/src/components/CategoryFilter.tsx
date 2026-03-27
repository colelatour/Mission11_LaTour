import { useEffect, useState } from "react";

// Sidebar filter that fetches categories from the API and lets the user toggle them
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5078/Book/GetBookCategories",
        );
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Categories</h5>
        {categories.map((c) => (
          <div key={c} className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
