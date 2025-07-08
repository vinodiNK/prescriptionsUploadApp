import { useAuth } from '../context/AuthContext';

function PharmacyDashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Pharmacy Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
      <h2>Prescription Requests</h2>
      <div>List of prescriptions will appear here</div>
    </div>
  );
}

export default PharmacyDashboard;