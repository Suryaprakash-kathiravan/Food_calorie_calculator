// import { useLocation } from "react-router-dom";
// import { useState } from "react";

// const FoodDetails: React.FC = () => {
//   const location = useLocation();
//   const product = location.state?.product;

//   const [quantity, setQuantity] = useState<number>(1);

//   if (!product) return <p className="text-center text-red-500">No product selected!</p>;

//   const calculateNutrients = (value?: number) => (value ? (value * quantity).toFixed(2) : "N/A");

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">{product.product_name || "Unknown Food"}</h2>

//       <div className="border p-6 rounded-lg shadow bg-white w-full max-w-md">
//         <p>🔥 Calories: {calculateNutrients(product.nutriments?.["energy-kcal"])} kcal</p>
//         <p>💪 Proteins: {calculateNutrients(product.nutriments?.proteins)} g</p>
//         <p>🍞 Carbs: {calculateNutrients(product.nutriments?.carbohydrates)} g</p>
//         <p>🛢️ Fats: {calculateNutrients(product.nutriments?.fat)} g</p>

//         <label className="block mt-4">
//           <span className="font-semibold">Enter Quantity:</span>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
//             min="1"
//             className="border p-2 w-full mt-2 rounded shadow-md"
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default FoodDetails;
