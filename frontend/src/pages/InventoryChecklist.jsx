import React, { useState, useEffect } from "react";
import { getInventory, addInventoryItem, toggleInventoryItem } from "../api";
import { useNavigate } from "react-router-dom";

const InventoryChecklist = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getInventory(token)
      .then(data => setItems(data))
      .catch(err => console.error("Failed to fetch inventory", err));
  }, [navigate]);

  const handleAdd = () => {
    const token = localStorage.getItem("token");
    if (!newItem.trim()) return;

    addInventoryItem({ name: newItem }, token)
      .then(item => {
        setItems(prev => [...prev, item]);
        setNewItem("");
      })
      .catch(err => console.error("Failed to add item", err));
  };

  const handleToggle = (itemId) => {
    const token = localStorage.getItem("token");

    toggleInventoryItem(itemId, token)
      .then(updatedItem => {
        setItems(prev =>
          prev.map(item => (item.id === itemId ? updatedItem : item))
        );
      })
      .catch(err => console.error("Failed to toggle item", err));
  };

  return (
    <div className="container">
      <h2>Inventory Checklist</h2>

      <div className="add-item">
        <input
          type="text"
          placeholder="Add item..."
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              textDecoration: item.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => handleToggle(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryChecklist;
