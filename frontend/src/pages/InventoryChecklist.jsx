function InventoryChecklist() {
    return (
    <div className="form-container"> 
     <h2>Inventory Checklist</h2> 
      <form>
        <textarea placeholder="List your items here..." required></textarea>
        <button type="submit" className="button-primary">Save Checklist</button>
      </form>
    </div>

  );
}

export default InventoryChecklist;
