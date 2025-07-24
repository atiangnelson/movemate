function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to MoveMate</h1>

      <div className="section-title">Quick Links</div>

      <div className="card">
        <div className="card-title">Inventory Checklist</div>
        <div className="card-content">Keep track of household items to move.</div>
      </div>

      <div className="card">
        <div className="card-title">Book a Move</div>
        <div className="card-content">Schedule your move with a professional mover.</div>
      </div>

      <div className="card">
        <div className="card-title">Get a Quote</div>
        <div className="card-content">Calculate your estimated moving cost.</div>
      </div>
    </div>
  );
}

export default Dashboard;
