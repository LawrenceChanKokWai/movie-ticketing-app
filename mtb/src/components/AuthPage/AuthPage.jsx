import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../redux/action/authActions.jsx";
import TextInput from "../Text-Input/text-input.jsx";

import './AuthPage.css';

const AuthPage = () => {
    const [isRightPanelActive, setRightPanelActive] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignInClick = () => {
        setRightPanelActive(false);
    };

    const handleSignUpClick = () => {
        setRightPanelActive(true);
    };

    const toggleForm = () => {
        setRightPanelActive(!isRightPanelActive);
    };

    const signInEmailRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const signUpEmailRef = useRef();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPwd, setRegPwd] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated, role } = useSelector((state) => state.auth);

    useEffect(() => {
        signInEmailRef.current.focus();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'USER') {
                navigate('/');
            } else if (role === 'ADMIN') {
                navigate('/admin');
            }
        }
    }, [isAuthenticated, role, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(email, pwd));
    };

    const handleRegSubmit = (event) => {
        event.preventDefault();
        dispatch(
            register(firstName, lastName, regEmail, regPwd, () => {
                setSuccessMessage('Registration successful! Please log in.');
                clearFields();
                setRightPanelActive(false);
            })
        );
    };

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setRegEmail('');
        setRegPwd('');
    };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
            {isSmallScreen && (
                <button className="toggle-button" onClick={toggleForm}>
                    {isRightPanelActive ? 'Sign In' : 'Sign Up'}
                </button>
            )}
            <div className="form-container sign-up-container">
                <form onSubmit={handleRegSubmit}>
                    <h1>Create Account</h1>
                    <TextInput
                        type="text"
                        name="First Name"
                        id="firstName"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        value={firstName}
                        setValue={setFirstName}
                    /><br />
                    <TextInput
                        type="text"
                        name="Last Name"
                        id="lastName"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        value={lastName}
                        setValue={setLastName}
                    /><br />
                    <TextInput
                        type="text"
                        name="Email"
                        id="regEmail"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        ref={signUpEmailRef}
                        value={regEmail}
                        setValue={setRegEmail}
                    /><br />
                    <TextInput
                        type="password"
                        name="Password"
                        id="regPassword"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        value={regPwd}
                        setValue={setRegPwd}
                    /><br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <TextInput
                        type="text"
                        name="Email"
                        id="signInEmail"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        ref={signInEmailRef}
                        value={email}
                        setValue={setEmail}
                    /><br />
                    <TextInput
                        type="password"
                        name="Password"
                        id="pwd"
                        width="100%"
                        fontSize="1rem"
                        padding="1rem"
                        value={pwd}
                        setValue={setPwd}
                    />
                    {/*<button type="submit">Sign In</button>*/}
                    {/*{error.length > 0 && (*/}
                    {/*    <ul style={{ color: 'red' }}>*/}
                    {/*        {error.map((err, index) => (*/}
                    {/*            <li key={index}>{err}</li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*)}*/}
                    {/*{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}*/}
                    <button type="submit">Sign In</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <p>Sign in to start booking the latest movie.</p>
                </form>
            </div>
            {!isSmallScreen && (
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>We’ve missed you! Dive back into the world of movies, where your favorites await. Book your next movie ticket in just a few clicks.</p>
                            <p>As a returning user, enjoy seamless booking, exclusive deals, and access to your watchlist. Log in now to experience the magic of movies like never before.</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Movie Enthusiast!</h1>
                            <p>We’re thrilled to have you join our community! Sign up to unlock a world of cinematic experiences tailored just for you.</p>
                            <p>Create your account to receive personalized movie recommendations, be the first to know about exclusive pre-sales, and earn rewards with every ticket you book. Your next adventure on the big screen is just a sign-up away!</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Circular Navigation Buttons with FontAwesome Icons */}
            <div className="circle-nav">
                <button className="nav-button" onClick={() => navigate('/')}>
                    <i className="fas fa-home"></i>
                </button>
                <button className="nav-button" onClick={() => navigate('/about')}>
                    <i className="fas fa-info-circle"></i>
                </button>
                <button className="nav-button" onClick={() => navigate('/contact')}>
                    <i className="fas fa-envelope"></i>
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
