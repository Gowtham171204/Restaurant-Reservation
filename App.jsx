import React, { useState } from 'react';
import './App.css';

const RestaurantReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [guestCount, setGuestCount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [seatsLeft, setSeatsLeft] = useState(100); // Adjust total capacity as needed

  const handleReserve = () => {
    if (guestCount > seatsLeft) {
      alert('Not enough seats available.');
      return;
    }
    const newReservation = { name, phone, guestCount, checkInTime: new Date().toLocaleTimeString(), checkOutTime: null };
    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
  };

  const handleCheckout = (index) => {
    const updatedReservations = reservations.map((res, i) => i === index ? { ...res, checkOutTime: new Date().toLocaleTimeString() } : res);
    setReservations(updatedReservations);
  };

  const handleDelete = (index) => {
    const { guestCount, checkOutTime } = reservations[index];
    setSeatsLeft(seatsLeft + (checkOutTime ? 0 : guestCount));
    setReservations(reservations.filter((_, i) => i !== index));
  };

  return (
    <div className="reservation-system">
      <h1>Restaurant Reservation System</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleReserve(); }}>
        <input type="number" value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value, 10))} placeholder="Guest Count" required />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
        <button type="submit" className="btn">Reserve</button>
      </form>
      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guest Count</th>
            <th>Check-In Time</th>
            <th>Checkout Time</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guestCount}</td>
              <td>{res.checkInTime}</td>
              <td>
                {res.checkOutTime ? res.checkOutTime : <button onClick={() => handleCheckout(index)} className="btn">Click to Checkout</button>}
              </td>
              <td><button onClick={() => handleDelete(index)} className="btn">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Seats Left: {seatsLeft}</p>
    </div>
  );
};

export default RestaurantReservation;
