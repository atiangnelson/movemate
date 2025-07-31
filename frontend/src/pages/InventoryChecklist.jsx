import React, { useEffect, useState } from "react";
import { getInventory, saveInventory } from "../api";
import { getToken } from "../utils/auth";

function InventoryChecklist() {
  const [itemsText, setItemsText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      const token = getToken();
      if (!token) {
        setError("Please log in to view your inventory.");
        return;
      }

      const res = await getInventory(token);
      if (res.error) {
        setError(res.error);
      } else {
        // Convert inventory items to text format
        const lines = (res.items || []).map(
          (item) => `${item.name} - Qty: ${item.quantity}`
        );
        setItemsText(lines.join("\n"));
      }
    };

    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    const res = await saveInventory(itemsText, token);
    if (res.success) {
      setMessage("Checklist saved successfully.");
    } else {
      setError(res.message || "Error saving checklist.");
    }
  };

  return (
    <div className="inventory-container"> 
      <h2>Inventory Checklist</h2> 

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          className="auth-input"
          placeholder="List your items here..."
          required
          rows={6}
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
        ></textarea>
        <button type="submit" className="auth-button">Save Checklist</button>
      </form>
    </div>
  );
}

export default InventoryChecklist;
