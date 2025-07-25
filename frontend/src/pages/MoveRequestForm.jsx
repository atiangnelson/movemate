function MoveRequestForm() {
    return (
        <div className="form-container">
             <h2>Move Request</h2>
             <form>
                <input type="text" placeholder="From Address" required />
                <input type="text" placeholder="To Address" required />
                <input type="date" required />
                <button type="submit" className="button-primary">Submit Request</button>

             </form>
        </div>
    )

}
