function MoveRequestForm() {
  return (
    <div className="form-container">
      <h2>Move Request</h2>
      <form>
        <input type="text" placeholder="Pickup Location" required />
        <input type="text" placeholder="Destination" required />
        <input type="date" required />
        <textarea placeholder="Additional Notes"></textarea>
        <button type="submit" className="button-primary">Submit Request</button>
      </form>
    </div>
  );
}

export default MoveRequestForm;