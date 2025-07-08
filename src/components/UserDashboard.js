import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

function UserDashboard() {
  const { currentUser } = useAuth();
  const [prescriptionImages, setPrescriptionImages] = useState([]);
  const [note, setNote] = useState('');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate time slots (every 2 hours from 8am to 8pm)
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour += 2) {
    const startHour = hour.toString().padStart(2, '0');
    const endHour = (hour + 2).toString().padStart(2, '0');
    timeSlots.push(`${startHour}:00 - ${endHour}:00`);
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setPrescriptionImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prescriptionImages.length || !address || !timeSlot) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would upload images to Firebase Storage first
      // and get their download URLs, then save to Firestore
      
      await addDoc(collection(db, 'prescriptions'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        images: [], // Would be image URLs in real implementation
        note,
        address,
        timeSlot,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      // Reset form
      setPrescriptionImages([]);
      setNote('');
      setAddress('');
      setTimeSlot('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting prescription:', error);
      alert('Error submitting prescription');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Upload Prescription</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Prescription Images (Max 5):
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageUpload}
              required
              style={{ display: 'block', marginTop: '5px' }}
            />
          </label>
          {prescriptionImages.length > 0 && (
            <p>{prescriptionImages.length} image(s) selected</p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Delivery Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Delivery Time Slot:
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Additional Note:
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Prescription'}
        </button>

        {success && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            Prescription submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}

export default UserDashboard;