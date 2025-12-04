// src/components/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="category-filter">
      <button
        className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onCategorySelect(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
