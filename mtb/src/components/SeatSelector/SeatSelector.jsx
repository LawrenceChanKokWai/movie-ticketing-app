
import React from 'react';
import './SeatSelector.css'

const SeatSelector = ({ selectedSeats, setSelectedSeats, bookedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F']; // 6 rows
    const seatsPerRow = 10; // 10 seats per row

    // Function to handle seat click
    const handleSeatClick = (seatId) => {
        if (bookedSeats.includes(seatId)) return; // Prevent clicking on booked seats

        if (selectedSeats.includes(seatId)) {
            // Deselect the seat
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            // Select the seat
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="seat-selector">
            <div className="screen-container">
                <div className="screen">Screen</div>
            </div>
            <div className="seats">
                {rows.map((row, rowIndex) => (
                    <div className="seat-row" key={rowIndex}>
                        {Array(seatsPerRow).fill().map((_, seatIndex) => {
                            const seatId = `${row}${seatIndex + 1}`;
                            const isBooked = bookedSeats.includes(seatId); // Check if the seat is booked
                            const isSelected = selectedSeats.includes(seatId);

                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                                    onClick={() => handleSeatClick(seatId)}
                                    style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }} // Disable pointer cursor for booked seats
                                >
                                    {seatId}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="legend">
                <div className="legend-item available">Available</div>
                <div className="legend-item booked">Booked</div>
                <div className="legend-item selected">Selected</div>
            </div>
        </div>
    );
};

export default SeatSelector;


