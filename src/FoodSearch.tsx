import { useState, useRef } from "react";

interface FoodItem {
  product_name: string;
  nutriments?: {
    "energy-kcal"?: number;
    proteins?: number;
    carbohydrates?: number;
    fat?: number;
  };
}

const FoodSearch: React.FC = () => {
  const [foodName, setFoodName] = useState("");
  const [foodResults, setFoodResults] = useState<FoodItem[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const topRef = useRef<HTMLDivElement>(null); // Reference for scrolling

  const searchFood = async () => {
    if (!foodName.trim()) return;

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&json=true`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.products.length > 0) {
        setFoodResults(data.products);
        setError(null);
        setVisibleCount(10);
      } else {
        setFoodResults([]);
        setError("No food found!");
      }
    } catch {
      setError("Error fetching data!");
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    // const isAlreadySelected = selectedFoods.find(
    //   (item) => item.product_name === food.product_name
    // );
    // if (isAlreadySelected) return;
    setSelectedFoods((prev) => [...prev, food]);
  };

  const aggregatedData = selectedFoods.reduce(
    (acc, food) => {
      acc.names.push(food.product_name);
      acc.calories += food.nutriments?.["energy-kcal"] ?? 0;
      acc.proteins += food.nutriments?.proteins ?? 0;
      acc.carbs += food.nutriments?.carbohydrates ?? 0;
      acc.fats += food.nutriments?.fat ?? 0;
      return acc;
    },
    {
      names: [] as string[],
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    }
  );

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div ref={topRef}></div>
      <h2 className="text-2xl font-bold mb-4">Food Nutrition Search</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Enter food name"
          className="border p-2 rounded shadow-md"
        />
        <button
          onClick={searchFood}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mt-4">
        {foodResults.slice(0, visibleCount).map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow bg-white transform transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={() => handleSelectFood(product)}
          >
            <strong>{product.product_name || "Unknown Name"}</strong>
            <p>🔥 Calories: {product.nutriments?.["energy-kcal"] ?? "N/A"} kcal</p>
            <p>💪 Proteins: {product.nutriments?.proteins ?? "N/A"} g</p>
            <p>🍞 Carbs: {product.nutriments?.carbohydrates ?? "N/A"} g</p>
            <p>🛢️ Fats: {product.nutriments?.fat ?? "N/A"} g</p>
          </div>
        ))}
      </div>

      {visibleCount < foodResults.length && (
        <button
          onClick={handleViewMore}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md mt-6 hover:bg-green-600"
        >
          View More
        </button>
      )}

      {selectedFoods.length > 0 && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-100 w-full max-w-md">
          <h3 className="text-xl font-semibold">Selected Foods</h3>
          <p><strong>Names:</strong> {aggregatedData.names.join(", ")}</p>
          <p><strong>Total Calories:</strong> {aggregatedData.calories} kcal</p>
          <p><strong>Total Proteins:</strong> {aggregatedData.proteins} g</p>
          <p><strong>Total Carbs:</strong> {aggregatedData.carbs} g</p>
          <p><strong>Total Fats:</strong> {aggregatedData.fats} g</p>
        </div>
      )}

    </div>
  );
};

export default FoodSearch;
