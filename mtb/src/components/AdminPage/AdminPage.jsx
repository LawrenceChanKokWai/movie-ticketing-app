import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/action/authActions';
import { useState } from 'react';
import CreateMovie from '../CreateMovie/CreateMovie';
import MovieList from '../MovieList/MovieList';
import UpdateMovieModal from '../UpdateMovie/UpdateMovieModal.jsx'

import './AdminPage.css'

const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role, isAuthenticated } = useSelector((state) => state.auth);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleUpdateClick = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleToList = () => {
        navigate('/admin/bookinglist');
    }

    if (!isAuthenticated || role !== 'ADMIN') {
        navigate('/');
        return null;
    }

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <button onClick={handleToList} className="logout-button">Booking List</button>
            </header>

            <section className="admin-content">
                <CreateMovie /><br /><br />
                <MovieList onUpdateClick={handleUpdateClick} />
            </section>

            {modalOpen && (
                <UpdateMovieModal movie={selectedMovie} closeModal={closeModal} />
            )}
        </div>
    );
};

export default AdminPage;
