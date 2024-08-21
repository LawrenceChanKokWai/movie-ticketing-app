// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import ProtectedRoute from "./service/ProtectionRoute.jsx";
import AuthPage from "./components/AuthPage/AuthPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import BookingPage from "./components/BookingPage/BookingPage.jsx";
import BookingDisplay from "./components/BookingDisplay/BookingDisplay.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import PurchasePage from "./components/PurchasePage/PurchasePage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route
                    path="/booking/:id"
                    element={
                        <ProtectedRoute role="USER">
                            <BookingPage />
                        </ProtectedRoute>
                    }
                />
                {/*<Route*/}
                {/*    path="/purchase"*/}
                {/*    element={*/}
                {/*        <ProtectedRoute role="USER">*/}
                {/*            <PurchasePage />*/}
                {/*        </ProtectedRoute>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/bookinglist"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <BookingDisplay />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
