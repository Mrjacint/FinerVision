import React from 'react';

import './FormCard.scss';

const FormCard = (props) => {
    //console.log(props)

    let attachedClasses = ["FormCardBody", "Close"];

    if(props.cards.show) {
        attachedClasses = ["FormCardBody", "Open"];
    }

    return (
        <div className="FormCard">
            <div className="FormCardHeader" onClick={() => props.clicked(props.cards.id)} >
                <p>{props.title}</p>
            </div>
            <div className={attachedClasses.join(' ')}>
                {props.children}
            </div>
        </div>
    )
}

export default FormCard;