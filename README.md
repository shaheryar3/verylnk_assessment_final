# Room Booking System

This is a web application for booking available meeting rooms for specific time slots within a workday.

## Features

- Display Available Rooms: List all available meeting rooms with unique names or identifiers.
- Booking a Room: Users can select a room and choose a 30-minute time slot to book it.
- Viewing Bookings: Users can view all of their current bookings, displaying the room name and booked time slot.
- Editing and Canceling Bookings: Users have the option to modify the time or cancel their booking.
- Conflict Handling: Prevents double-booking of rooms and alerts users if a room is already reserved for a specific time slot.

## Technical Details

- Built with React.
- Uses local storage for data persistence.
- Supports up to 10 hardcoded user IDs.

## Setup Instructions

Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd room-booking-system

Install dependencies:
npm install

Start the development server:
npm start

Open your web browser and access the application at http://localhost:3000.

Usage
Select a user from the dropdown list.
View available rooms and book a time slot by clicking the "Book" button.
View your bookings and make changes or cancel them.
Additional Information
This application is for demonstration purposes and uses simulated user authentication.
You can customize the number of user IDs or add real authentication as needed.
