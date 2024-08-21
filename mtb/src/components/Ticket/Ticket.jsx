import React from 'react';
import Barcode from 'react-barcode';
import './Ticket.css';

const Ticket = ({ ticket }) => {
    const movieTitle = ticket.movie.title;
    const row = ticket.seatNumbers[0].charAt(0);  // Assuming the first character of seat is the row
    const seat = ticket.seatNumbers.join(', ');
    const date = new Date(ticket.movie.screeningDateTime).toLocaleDateString();
    const time = new Date(ticket.movie.screeningDateTime).toLocaleTimeString();
    const cinema = ticket.movie.hall;

    // Create a shortened barcode value
    const barcodeValue = `${movieTitle.slice(0, 2).toUpperCase()}-${row}-${seat}-${date.replace(/\//g, '')}-${time.replace(/:/g, '').replace(' ', '')}-${cinema}`;

    return (
        <div className="ticket-container">
            <div className="barcode-section">
                <div className="ticket-info">
                    <p>ROW {row}</p>
                    <p>Seat {seat}</p>
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
                <div className="barcode">
                    <Barcode value={barcodeValue} />
                    <p>{barcodeValue}</p>
                </div>
                <p className="cinema-name">{cinema}</p>
            </div>
            <div className="movie-section">
                <div className="movie-details">
                    <div className="movie-title">
                        <h1>{movieTitle}</h1>
                    </div>
                    <div className="movie-info">
                        <h3>{cinema}</h3>
                        <p>ROW</p>
                        <h3>{row}</h3>
                        <p>SEAT</p>
                        <h3>{seat}</h3>
                        <p>DATE</p>
                        <h3>{date}</h3>
                        <p>TIME</p>
                        <h3>{time}</h3>
                    </div>
                </div>
                <div className="movie-image">
                    <img src={ticket.movie.imageUrl} alt={movieTitle} />
                </div>
            </div>
        </div>
    );
};

export default Ticket;
