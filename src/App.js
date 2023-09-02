import React, { useState, useEffect } from "react";
import "./styles.css";

const RoomBookingSystem = () => {
  // Simulated user IDs (replace with actual user authentication)
  const userIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedUserID, setSelectedUserID] = useState(userIDs[0]);

  const [rooms, setRooms] = useState(() => {
    // Retrieve bookings from localStorage on component initialization
    const savedRooms = localStorage.getItem("rooms");
    return savedRooms ? JSON.parse(savedRooms) : createInitialRooms();
  });

  useEffect(() => {
    // Save bookings to localStorage whenever the state changes
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  function createInitialRooms() {
    const slots = [];
    const startTime = 9; // Start at 9 AM
    const endTime = 17; // End at 5 PM

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeSlot = `${hour
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        slots.push({ time: timeSlot, isBooked: false, bookedBy: null });
      }
    }

    return [
      { id: 1, name: "Room 1", bookings: [...slots] },
      { id: 2, name: "Room 2", bookings: [...slots] },
      { id: 3, name: "Room 3", bookings: [...slots] }
    ];
  }

  const bookRoom = (roomId, timeSlot) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          bookings: room.bookings.map((slot) =>
            slot.time === timeSlot
              ? { ...slot, isBooked: true, bookedBy: selectedUserID }
              : slot
          )
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const unbookRoom = (roomId, timeSlot) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          bookings: room.bookings.map((slot) =>
            slot.time === timeSlot && slot.bookedBy === selectedUserID
              ? { ...slot, isBooked: false, bookedBy: null }
              : slot
          )
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  return (
    <div>
      <h1>Room Booking System</h1>
      <h2>Available Rooms:</h2>
      <div>
        <label>Select User : </label>
        <select
          value={selectedUserID}
          onChange={(e) => setSelectedUserID(Number(e.target.value))}
        >
          {userIDs.map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>
      {rooms.map((room) => (
        <div key={room.id}>
          <h3>{room.name}</h3>
          <div className="time-slots">
            {room.bookings.map((slot) => (
              <div
                key={slot.time}
                className={`time-slot ${slot.isBooked ? "booked" : ""}`}
              >
                <span> {slot.time} </span>
                {slot.isBooked ? (
                  <div>
                    {slot.bookedBy === selectedUserID ? (
                      <>
                        <span>Booked by You </span>
                        <button onClick={() => unbookRoom(room.id, slot.time)}>
                          Unbook
                        </button>
                      </>
                    ) : (
                      <span>Booked by User {slot.bookedBy} </span>
                    )}
                  </div>
                ) : (
                  <button onClick={() => bookRoom(room.id, slot.time)}>
                    Book
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomBookingSystem;
