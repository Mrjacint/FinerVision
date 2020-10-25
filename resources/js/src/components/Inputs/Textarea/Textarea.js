import React from 'react';

import './Textarea.scss';

const Textarea = (props) => {

    return (
        <div className="textareaBlock">
            <label>{props.label}</label>
            <textarea value={props.value} onChange={props.changed} />
            <p></p>
        </div>
    )
}

export default Textarea;