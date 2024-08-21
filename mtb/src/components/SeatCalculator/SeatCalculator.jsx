import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SeatCalculator.css';

const SeatCalculator = ({ selectedSeats = [], seatCost = 0, onConfirmBooking }) => {
    const totalCost = selectedSeats.length * seatCost;
    const [isExpanded, setIsExpanded] = useState(false);
    const navigator = useNavigate();

    const handleArrowClick = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };

    const handleConfirmPayment = () => {
        if (typeof onConfirmBooking === 'function') {
            onConfirmBooking(); // Call the function passed from BookingPage
            alert('Payment Confirmed. Thank You for the purchase!');
            navigator("/");
        }
    };

    return (
        <div className="seat-cost-calculator">
            <h2>Selected Seats</h2>
            <div className="selected-seats">
                {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat, index) => (
                        <span key={index} className="seat">
                            {seat}
                        </span>
                    ))
                ) : (
                    <p>No seats selected</p>
                )}
            </div>
            <div className="total-cost">
                <p><strong>Total Cost:</strong> SGD {totalCost}</p>
            </div>
            {selectedSeats.length > 0 && (
                <div className="arrow-container" onClick={handleArrowClick}>
                    <span className="arrow">▼</span>
                    <span className="payment-text">Payment</span>
                </div>
            )}
            {isExpanded && (
                <div className="extra-content">
                    <div className="payment-form">
                        <label htmlFor="cardType">Card Type:</label>
                        <select
                            id="cardType"
                            value=""
                            onChange={(e) => { /* Add your logic */ }}
                        >
                            <option value="">Select Card Type</option>
                            <option value="visa">Visa</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>

                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value=""
                            onChange={(e) => { /* Add your logic */ }}
                            placeholder="Enter your card number"
                        />

                        <label htmlFor="expirationDate">Expiration Date:</label>
                        <input
                            type="text"
                            id="expirationDate"
                            value=""
                            onChange={(e) => { /* Add your logic */ }}
                            placeholder="MM/YY"
                        />

                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            value=""
                            onChange={(e) => { /* Add your logic */ }}
                            placeholder="Enter CVV"
                        />
                    </div>

                    <div className="confirm-payment-container">
                        <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
                            <i className="fas fa-check"></i> Confirm Payment?
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatCalculator;
