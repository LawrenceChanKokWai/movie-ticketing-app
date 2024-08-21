import React from 'react';
import './button.styles.scss'

const Button = ({ text, type, style, disabled, variant }) => {
    const buttonClass = variant ? `button button--${variant}` : 'button';

    return (
        <button type={type} className={buttonClass} style={style} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
