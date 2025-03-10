import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = (await response.json()) as FetchResponse;

        const uniqueCategories = Array.from(
          new Set(
            (data.products ?? [])
              .map((product) => product.category)
              .filter(
                (category): category is string => typeof category === "string"
              )
          )
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-128 p-5 h-screen mr-5">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg w-full max-w-[300px] py-3 px-4 mb-4 text-gray-700 focus:outline-none shadow-sm"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex mb-3 justify-center items-center w-full gap-2">
          <input
            type="number"
            className="border-2 border-gray-300 rounded-lg py-3 px-4 w-full max-w-[140px] text-gray-700 focus:outline-none shadow-sm"
            placeholder="Min Price"
            value={minPrice ?? ""}
            step="5"
            onChange={handleMinPriceChange}
          />

          <input
            type="number"
            className="border-2 border-gray-300 rounded-lg py-3 px-4 w-full max-w-[140px] text-gray-700 focus:outline-none shadow-sm"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            step="5"
            onChange={handleMaxPriceChange}
          />
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">Categories</h2>

          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
                onChange={() => handleRadioChange(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>

          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 cursor-pointer"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-4 cursor-pointer"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
