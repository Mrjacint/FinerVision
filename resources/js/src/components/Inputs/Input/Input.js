import React from 'react';
import './Input.scss';

const Input = (props) => {
    return (
        <div className="inputBlock">
            <label>{props.label}</label>
            <input 
                type="text" 
                value={props.value}
                onChange={props.changed} />
            <p>{props.errMess}</p>
        </div>
    )
}

export default Input;