import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteBooking, fetchBookings} from "../../redux/action/bookingActions.jsx";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

import './BookingDisplay.css'

const BookingsPage = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.bookings);
    const error = useSelector((state) => state.bookings.error);
    const totalSeats = 60;
    let totalEarnings = 0;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    // Testing display received data
    useEffect(() => {
        if (bookings.length > 0) {
            console.log('Bookings:', bookings);
        }
    }, [bookings]);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    const downloadPDF = () => {
        const input = document.getElementById('bookingsTable');

        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save("bookings.pdf");
            }).catch((error) => {
                console.error('Error capturing the table:', error);
            });
        } else {
            console.error('Table element not found');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            dispatch(deleteBooking(id));
        }
    };

    const handleBack = () => {
        navigate('/admin');
    }
    return (
        <div>
            <h1>Bookings Information</h1>
            <button onClick={downloadPDF} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
                Download PDF
            </button>
            <button onClick={handleBack} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
                Back to Dashboard
            </button>
            <button onClick={handleLogout} style={{ padding: '10px', fontSize: '16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
                Logout
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookings && bookings.length > 0 ? (
                <table id="bookingsTable" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>BID</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>UID</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Movie Title</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Hall</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Booked Seats</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Seats Left</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Earnings</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => {
                        const bookedSeatsCount = booking.seatNumbers.length;
                        const seatsLeft = totalSeats - bookedSeatsCount;
                        const earnings = bookedSeatsCount * booking.movie.price;
                        totalEarnings += earnings;
                        const { formattedDate, formattedTime } = formatDateTime(booking.createdAt);

                        return (
                            <tr key={booking.id}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{booking.id}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{booking.user.id}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{booking.movie.title}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{booking.movie.hall}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{booking.seatNumbers.join(', ')}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{seatsLeft}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>${earnings.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    {booking.createdAt ? `SGD ${formattedDate} | ${formattedTime}` : 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button onClick={() => handleDelete(booking.id)} style={{ padding: '5px 10px', fontSize: '14px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="6" style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'right' }}>
                            <strong>Total Earnings:</strong>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                            <strong>SGD {totalEarnings.toFixed(2)}</strong>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}></td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingsPage;
