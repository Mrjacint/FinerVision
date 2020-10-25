import React, { useState } from 'react';
import './InputDOB.scss';

const Input = (props) => {

    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
   
    const handleYearValue = (event) => {
        props.changed(event.target.value + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2) )
        setYear(event.target.value)
    }

    const handleMonthValue = (event) => {
        props.changed( year + '-' + ('0' + event.target.value).slice(-2) + '-' + ('0' + day).slice(-2) )
        setMonth(event.target.value)
    }
    
    const handleDayValue = (event) => {
        props.changed(year + '-' + ('0' + month).slice(-2) + '-' + ('0' + event.target.value).slice(-2))
        setDay(event.target.value)
    }
   
    // const handleYearValue = (event) => {
    //     setYear(event.target.value)
    //     props.changed(event.target.value + '-' + month + '-' + day)
    // }

    // const handleMonthValue = (event) => {
    //     props.changed(year + '-' + ('0' + event.target.value).slice(-2) + '-' + (day < 10? '0' : '') + day )
    //     setMonth(event.target.value)
    // }
    
    // const handleDayValue = (event) => {
    //     props.changed(year + '-' + ('0' + month).slice(-2) + '-' + ('0' + event.target.value).slice(-2))
    //     setDay(event.target.value)
    // }

    return (
        <div className="inputDOBBlock">
            <label>{props.label}</label>
            <div>
                <input type="text" maxLength='4' name='year' value={year} onChange={event => handleYearValue(event)} />
                <input type="text" maxLength='2' name='mounth' value={month} onChange={event => handleMonthValue(event)} />
                <input type="text" maxLength='2' name='day' value={day} onChange={event => handleDayValue(event)} />
            </div>
            <p>{props.errMess}</p>
        </div>
    )
}

export default Input;