import { useEffect, useState } from "react";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
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

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Product"
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
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
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>

          <div>
            {keywords.map((keyword, index) => (
              <button key={index} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 cursor-pointer">
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-4 cursor-pointer">Reset Filters</button>

      </section>
    </div>
  );
};

export default Sidebar;
