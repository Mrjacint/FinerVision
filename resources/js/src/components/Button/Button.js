import React from 'react';
import './Button.scss';

const Button = (props) => {
    //console.log(props)
    const buttonText = 'Next >';
    return (
        <div className="FormCardButton" onClick={() => props.clicked()} >
            {buttonText}
        </div>
    )
}

export default Button;