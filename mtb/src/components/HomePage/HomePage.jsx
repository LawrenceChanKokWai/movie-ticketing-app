import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout, parseJwt} from '../../redux/action/authActions.jsx';

import './HomePage.css';
import { fetchMovies } from "../../redux/action/movieActions.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const listRef = useRef(null);
    const [timeRunning] = useState(3000);
    const [timeAutoNext] = useState(7000);
    const runningTimeRef = useRef(null);
    let runNextAuto;

    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const resetTimeAnimation = () => {
        if (runningTimeRef.current) {
            runningTimeRef.current.style.animation = 'none';
            runningTimeRef.current.offsetHeight; /* trigger reflow */
            runningTimeRef.current.style.animation = 'runningTime 7s linear 1 forwards';
        }
    };

    const showSlider = (type) => {
        if (!listRef.current || !carouselRef.current) return;

        const sliderItemsDom = listRef.current.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            listRef.current.appendChild(sliderItemsDom[0]);
            carouselRef.current.classList.add('next');
        } else {
            listRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carouselRef.current.classList.add('prev');
        }

        setTimeout(() => {
            if (carouselRef.current) {
                carouselRef.current.classList.remove('next');
                carouselRef.current.classList.remove('prev');
            }
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtnClick();
        }, timeAutoNext);

        resetTimeAnimation();
    };

    const nextBtnClick = () => {
        showSlider('next');
    };

    const prevBtnClick = () => {
        showSlider('prev');
    };

    useEffect(() => {
        resetTimeAnimation();

        if (carouselRef.current && listRef.current) {
            runNextAuto = setTimeout(() => {
                nextBtnClick();
            }, timeAutoNext);
        }

        return () => {
            clearTimeout(runNextAuto);
        };
    }, [carouselRef, listRef]);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return { formattedDate, formattedTime };
    };

    const handleBookNowClick = (id) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decodedToken = parseJwt(token);
                const userRole = decodedToken.authorities[0];

                // Navigate based on user role
                if (userRole === 'ADMIN') {
                    navigate('/admin');
                } else if (userRole === 'USER') {
                    navigate(`/booking/${id}`); // Pass the movie id
                } else {
                    navigate('/auth'); // Default fallback for unknown roles
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/auth'); // Redirect to auth page if there's an error
            }
        } else {
            navigate('/auth');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleHome = () => {
        navigate('/');
    };

    const handlePurchases = () => {
        navigate('/purchase');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    // Check if JWT token exists
    const isLoggedIn = !!localStorage.getItem('jwt');

    return (
        <div>
            <header>
                <nav>
                    {/*<button onClick={handlePurchases}>Purchases</button>*/}
                    {/*<button onClick={handleHome}>Home</button>*/}
                    {isLoggedIn && <button onClick={handlePurchases}>Purchases</button>}
                    {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                </nav>
            </header>

            <div className="carousel" ref={carouselRef}>
                <div className="list" ref={listRef}>
                    {movies.map((item, index) => {
                        const { formattedDate, formattedTime } = formatDateTime(item.screeningDateTime);

                        const availabilityStatus = item.availableSeats <= 0
                            ? (
                                <span className="sold-out">
                                    <span className="red-light"></span> SOLD OUT
                                </span>
                            ) : item.availableSeats <= 10
                                ? (
                                    <span className="selling-fast">
                                    <span className="blinking-light"></span> SELLING FAST
                                </span>
                                ) : (
                                    <span className="available">
                                    <span className="white-blinking-light"></span> Available
                                </span>
                                );

                        return (
                            <div className="item" style={{ backgroundImage: `url(${item.imageUrl})` }} key={index}>
                                <div className="content">
                                    <div className="title">{item.title}</div>
                                    <div className="name">{item.hall ? item.hall.replace('_', ' ') : ''}</div>
                                    <div className="des">{item.description}</div>
                                    <div>Date: {formattedDate}</div>
                                    <div>Time: {formattedTime}</div>
                                    <br />
                                    <div className="availability">
                                        {availabilityStatus}
                                    </div>
                                    <div className="btn">
                                        <button onClick={() => handleBookNowClick(item.id)}>Book Now</button>
                                        <button className="category">{item.category}</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="arrows">
                    <button className="prev" onClick={prevBtnClick}>{'<'}</button>
                    <button className="next" onClick={nextBtnClick}>{'>'}</button>
                </div>

                <div className="timeRunning" ref={runningTimeRef}></div>
            </div>
        </div>
    );
};

export default HomePage;
