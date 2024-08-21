import { useState, useEffect, forwardRef } from 'react';
import './text-input.styles.scss';

const TextInput = forwardRef(
    ({ type, name, id, value = '', padding, onChange, setValue, width = '100%', fontSize = '1rem' }, ref) => {
        const [inputValue, setInputValue] = useState(value);
        const [hasValue, setHasValue] = useState(value !== '');

        useEffect(() => {
            setHasValue(value !== '');
            setInputValue(value);
        }, [value]);

        const handleInputChange = (event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
            setHasValue(newValue !== '');
            if (onChange) {
                onChange(event);
            }
            if (setValue) {
                setValue(newValue);
            }
        };

        return (
            <div className="input-group" style={{ width }}>
                <input
                    type={type}
                    id={id}
                    ref={ref}
                    value={inputValue}
                    className={`input ${hasValue ? 'has-value' : ''}`}
                    onChange={handleInputChange}
                    style={{ padding, fontSize }} // Pass padding and fontSize dynamically
                />
                <label className="placeholder" style={{ fontSize }}>{name}:</label>
            </div>
        );
    }
);

export default TextInput;
