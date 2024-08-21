import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMovie } from '../../redux/action/movieActions';

import './CreateMovie.css'

function CreateMovie() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [screeningDateTime, setScreeningDateTime] = useState('');
    const [hall, setHall] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMovie({
            title,
            category,
            releaseDate,
            description,
            imageUrl,
            screeningDateTime,
            hall
        })).then(() => {
            // Clear the form fields
            setTitle('');
            setCategory('');
            setReleaseDate('');
            setDescription('');
            setImageUrl('');
            setScreeningDateTime('');
            setHall('');

            // Set the success message
            setSuccessMessage('Movie created successfully!');
        }).catch(() => {
            // Handle error if needed
            setSuccessMessage(''); // Clear success message on error
        });
    };

    return (
        <div>
            <h2>Create New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <select className="dropdown-input" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Horror">Horror</option>
                </select>
                <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    placeholder="Release Date"
                    required
                />
                <textarea className="textarea-input"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description"
                          required
                />
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="datetime-local"
                    value={screeningDateTime}
                    onChange={(e) => setScreeningDateTime(e.target.value)}
                    placeholder="Screening Date and Time"
                    required
                />
                <select className="dropdown-input" value={hall} onChange={(e) => setHall(e.target.value)} required>
                    <option value="">Select Hall</option>
                    <option value="HALL_1">Hall 1</option>
                    <option value="HALL_2">Hall 2</option>
                    <option value="HALL_3">Hall 3</option>
                    <option value="HALL_4">Hall 4</option>
                </select>
                <button className="submit-button" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Creating...' : 'Create Movie'}
                </button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateMovie;
