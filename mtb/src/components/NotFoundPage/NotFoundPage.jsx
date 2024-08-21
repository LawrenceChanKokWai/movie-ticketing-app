
import './NotFoundPage.css'
import {useNavigate} from "react-router-dom";

function NotFoundPage() {

    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/');
    }

    return (
        <div className='not-found-container'>
            <div className='not-found-header'>404</div>
            <div className='not-found-message'>Oops! Page not found.</div>
                <button className='button' onClick={handleBackToHome}>Go Back to HOME</button>
        </div>
    );
}

export default NotFoundPage