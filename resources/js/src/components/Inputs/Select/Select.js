import React from 'react';

import './Select.scss';

const Select = (props) => {
    return (
        <div className="inputBlock">
            <label>{props.label}</label>
            <select 
                // defaultValue={'Select Gender'} 
                value={props.value} 
                onChange={props.changed} >
                <option value={'Select Gender'} disabled >Select Gender</option>
                <option value='Male' >Male</option>
                <option value='Female' >Female</option>
            </select>
            <p>{props.errMess}</p>
        </div>
    )
}

export default Select;