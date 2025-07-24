function InventoryChecklist() {
  return (
    <div className="inventory-container"> 
      <h2>Inventory Checklist</h2> 
      <form>
        <textarea
          className="auth-input"
          placeholder="List your items here..."
          required
          rows={6}
        ></textarea>
        <button type="submit" className="auth-button">Save Checklist</button>
      </form>
    </div>
  );
}

export default InventoryChecklist;
