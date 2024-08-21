import React, {useEffect, useState} from 'react';
import './PurchasePage.css';
import Ticket from "../Ticket/Ticket.jsx";
import { fetchTickets } from "../../redux/action/bookingActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { parseJwt } from "../../redux/action/authActions.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import {useNavigate} from "react-router-dom";

const PurchasePage = () => {
    const dispatch = useDispatch();
    const bookingState = useSelector((state) => state.bookings);
    const { loading, bookings, error } = bookingState;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = parseJwt(token);
            // console.log("Decoded Token:", decodedToken); // Debug log

            // Extract email from the "sub" field
            const email = decodedToken.sub;
            // console.log("Email extracted from token:", email); // Debug log

            if (email) {
                dispatch(fetchTickets(email));
            } else {
                console.error("Email not found in token payload");
            }
        } else {
            console.error("JWT token not found in localStorage");
        }
    }, [dispatch]);

    // TESTING
    // useEffect(() => {
    //     if (!loading && !error) {
    //         console.log("Bookings Data:", bookings);
    //     }
    // }, [bookings, loading]);

    // Get current tickets
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="purchase-page-container">
            <button className="back-home-button" onClick={handleBackToHome}>
                <i className="fas fa-home"></i> Back to Home
            </button>
            <h1>Your Purchased Tickets</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="tickets-list">
                {currentItems.length > 0 ? (
                    currentItems.map(booking => (
                        <Ticket key={booking.id} ticket={booking} />
                    ))
                ) : (
                    <p>No tickets found.</p>
                )}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={bookings.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default PurchasePage;
