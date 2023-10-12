import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetch(`https://api.frontendeval.com/fake/food/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setRecommendations(data))
        .catch((error) => console.error("Error:", error));
    } else {
      setRecommendations([]);
    }
  }, [searchTerm]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      handleAdd(searchTerm);
    }
  };

  const handleAdd = (item) => {
    setItems((prevItems) => [...prevItems, { name: item, checked: false }]);
    setSearchTerm("");
    setRecommendations([]);
  };

  const handleCheck = (index) => {
    setItems((prevItems) => prevItems.map((item, idx) => idx === index ? { ...item, checked: !item.checked } : item));
  };

  const handleDelete = (index) => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  return (
    <div className="App">
      <h1 className="app-title">Shopping List</h1>

      <input
        id="searchBar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        onKeyDown={(e) => handleEnterKey(e)}
      />

      <ul>
        {recommendations.map((suggestion) => (
          <li key={suggestion} onClick={() => handleAdd(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={() => handleCheck(index)}
            />
            <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
              {item.name}
            </span>
            <button onClick={() => handleDelete(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
