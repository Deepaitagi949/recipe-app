import React, { useState } from "react";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🍲 Recipe Finder</h1>

      <input
        type="text"
        placeholder="Enter ingredient"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={fetchRecipes} style={{ padding: "8px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {recipes.map((meal) => (
          <div
            key={meal.idMeal}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              {meal.strMeal}
            </p>
          </div>
        ))}
      </div>

      {!loading && !error && recipes.length === 0 && ingredient && (
        <p>No recipe found</p>
      )}
    </div>
  );
}

export default App;
